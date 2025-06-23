import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import wav from 'wav';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!data) {
      return NextResponse.json({ error: 'No audio data returned' }, { status: 500 });
    }
    const pcmBuffer = Buffer.from(data, 'base64');
    const wavChunks: Buffer[] = [];
    const wavWriter = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });
    wavWriter.on('data', (chunk: Buffer) => wavChunks.push(chunk));
    const readable = Readable.from(pcmBuffer);
    readable.pipe(wavWriter);
    await new Promise(resolve => wavWriter.on('finish', resolve));
    const wavBuffer = Buffer.concat(wavChunks);
    return new NextResponse(wavBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="speech.wav"',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
