import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import wav from 'wav';
import { Writable } from 'stream';

// Deshabilitar la caché para esta ruta
export const dynamic = 'force-dynamic';


export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return new NextResponse(JSON.stringify({ error: 'No se proporcionó texto' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY || ''
    });

    // Validar que la API key esté configurada
    if (!process.env.GEMINI_API_KEY) {
      console.error('Error: GEMINI_API_KEY no está configurada en las variables de entorno');
      return new NextResponse(
        JSON.stringify({ error: 'Error de configuración del servidor' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ 
        parts: [{ 
          text: `${text}`
        }] 
      }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' }
          }
        }
      }
    });
    
    console.log('Respuesta de la API de Gemini recibida');
    
    // Extraer los datos de audio de la respuesta
    const audioPart = response.candidates?.[0]?.content?.parts?.[0];
    
    if (!audioPart?.inlineData?.data) {
      console.error('No se pudo extraer audioData de la respuesta:', JSON.stringify(response, null, 2));
      return new NextResponse(
        JSON.stringify({ error: 'No se pudo generar el audio: respuesta inesperada de la API' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const audioData = audioPart.inlineData.data;
    
    // Convertir base64 a Buffer (PCM data)
    const pcmBuffer = Buffer.from(audioData, 'base64');

    if (pcmBuffer.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'El audio generado está vacío' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convertir PCM a WAV usando el paquete 'wav' y un stream en memoria
    const wavChunks: Buffer[] = [];
    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });
    const writable = new Writable({
      write(chunk, encoding, callback) {
        wavChunks.push(Buffer.from(chunk));
        callback();
      }
    });
    writer.pipe(writable);
    writer.write(pcmBuffer);
    writer.end();

    // Esperar a que termine de escribir
    await new Promise((resolve, reject) => {
      writable.on('finish', resolve);
      writable.on('error', reject);
    });

    const wavBuffer = Buffer.concat(wavChunks);

    // Crear un nombre de archivo seguro
    const safeText = text.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `speech_${safeText}.wav`;

    // Devolver el archivo para descarga
    return new NextResponse(wavBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': wavBuffer.byteLength.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
    
  } catch (error) {
    console.error('Error al generar el audio para descarga:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Error al generar el audio',
        details: error instanceof Error ? error.message : 'Error desconocido'
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
