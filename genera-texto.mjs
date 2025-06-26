import fs from 'fs/promises';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function main() {
    // node genera-texto.mjs audio-ejemplo.mp3
    if (process.argv.length !== 3) {
        console.error('Uso: node genera-texto.mjs <file>');
        process.exit(1);
    }

    const audioPath = process.argv[2];
    const extension = audioPath.split('.').pop().toLowerCase();
    const mimeTypeMap = {
        wav: 'audio/wav',
        mp3: 'audio/mp3',
        webm: 'audio/webm'
    };

    const mimeType = mimeTypeMap[extension];
    if (!mimeType) {
        console.error('Extensión no soportada:', extension);
        process.exit(1);
    }

    const form = new FormData();
    const audioBuffer = await fs.readFile(audioPath);
    form.append('file', audioBuffer, {
        filename: audioPath,
        contentType: mimeType
    });

    const res = await fetch('http://localhost:3000/api/audio-to-text', {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
    });

    if (!res.ok) {
        console.error('Error en la transcripción:', await res.text());
        process.exit(1);
    }

    const data = await res.json();
    console.log('Transcripción:');
    console.log(data.text);


}

main();