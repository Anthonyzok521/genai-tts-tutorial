import fs from 'fs/promises';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function main() {
    const audioPath = process.argv[2] || 'audio-ejemplo.mp3';
    const mimeType = audioPath.endsWith('.wav') ? 'audio/wav' :
                     audioPath.endsWith('.mp3') ? 'audio/mp3' :
                     audioPath.endsWith('.webm') ? 'audio/webm' :
                     'audio/mpeg';

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
    console.log(data.text || data.transcript || data);
}

main();
