import { GoogleGenAI } from '@google/genai';
import wav from 'wav';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
globalThis.fetch = fetch;
dotenv.config();

async function saveWaveFile(filename, pcmData, channels = 1, rate = 24000, sampleWidth = 2) {
    return new Promise((resolve, reject) => {
      const writer = new wav.FileWriter(filename, {
        channels,
        sampleRate: rate,
        bitDepth: sampleWidth * 8,
      });
      writer.on('finish', resolve);
      writer.on('error', reject);
      writer.write(pcmData);
      writer.end();
    });
  }


async function main(){
    const text = process.argv[2] || "En acento andaluz: Una vez encendido el cigarro, escogí el mejor de los que me quedaban y le pregunté si fumaba.";
    const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{parts: [{text: text}]}],
        config:{
            responseModalities: ['audio'],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: {voiceName: "Kore"}
                }
            }
        }
    })

    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!data){
        console.error('No data found in response');
        process.exit(1);
    }

    const audioBuffer = Buffer.from(data, 'base64');
    await saveWaveFile('output-asustado.wav', audioBuffer);
    console.log('Audio saved to output-asustado.wav');
}

main();
