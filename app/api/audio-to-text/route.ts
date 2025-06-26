import { NextRequest, NextResponse } from "next/server";
import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";


export async function POST(req: NextRequest) {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "No se proporciono un archivo" }, { status: 400 });
        }

        const myfile = await ai.files.upload({
        file,
        config: { mimeType: file.type},
        });

        // Verifica que uri y mimeType existan
        if (!myfile.uri || !myfile.mimeType) {
            throw new Error("Error al subir el archivo: Falta uri o mimeType");
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createUserContent(
                [
                    createPartFromUri(myfile.uri, myfile.mimeType),
                    "Genera un transrito del audio"
                ]
            )
        })

        return NextResponse.json({ text: response.text });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
    }
}