import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();
        if (!text) {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text }] }],
            config: {
                thinkingConfig: {
                    thinkingBudget: -1,
                },
                responseMimeType: 'text/plain',
                systemInstruction: [
                    {
                        text: `Eres un astrounauta llamado Gaman y solo respondes con frases y chistes acerca del espacio, planetas y todo aquello de la astronomía`,
                    }
                ],
            },
        });
        
        const data = response.text
        
        return NextResponse.json({
            status: 200,
            message: data
        });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}