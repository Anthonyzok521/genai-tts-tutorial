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
    const text = `Genera la conversacion entre dos personas:
    Maria: Hola, como estas?
    Jose: Estoy bien, gracias. Y tu?`;
    const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{parts: [{text: text}]}],
        config:{
            responseModalities: ['audio'],
            speechConfig: {
                multiSpeakerVoiceConfig: {
                    speakerVoiceConfigs: [
                        {
                            speaker: 'Maria',
                            voiceConfig: {
                                prebuiltVoiceConfig: {voiceName: "Zephyr"}
                            }
                        },
                        {
                            speaker: 'Jose',
                            voiceConfig: {
                                prebuiltVoiceConfig: {voiceName: "Puck"}
                            }
                        }
                    ]
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
    await saveWaveFile('output-multiple.wav', audioBuffer);
    console.log('Audio saved to output-multiple.wav');
}

main();
