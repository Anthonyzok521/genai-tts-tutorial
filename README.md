<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Google%20GenAI-4285F4?style=for-the-badge" alt="Google GenAI" />
</div>

# Gemini TTS Tutorial

> 📺 **¡Ya está disponible el video de este tutorial en YouTube!**
> [![Ver en YouTube](https://img.shields.io/badge/Ver_en_YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=7IAZYRKqtl0)

Convierte texto en voz natural y transcribe voz a texto con la API de Google GenAI

Este proyecto es un tutorial interactivo y moderno que te enseña a utilizar la API de Google GenAI para:
- Generar audio a partir de texto (Text-to-Speech, TTS)
- Transcribir voz a texto (Speech-to-Text, STT) usando tu micrófono
Todo desde una interfaz web creada con Next.js y React.

## 🚀 Características principales

- **Interfaz moderna en dark mode** con diseño responsive y componentes visuales atractivos.
- **Probador interactivo de texto a voz**: ingresa texto y obtén audio generado por la API de Google Gemini.
- **Probador interactivo de voz a texto**: graba tu voz con el micrófono y obtén la transcripción generada por Gemini.
- **Explicaciones didácticas** sobre el funcionamiento de TTS y STT y casos de uso.
- **Código fácil de personalizar** y extender para tus propios proyectos.

## 🛠️ Requisitos
- Node.js 18+
- Una clave de API de Google GenAI (consulta la documentación oficial para obtenerla)

## 📝 Ejemplo de uso rápido: transcribir un archivo de audio

Puedes transcribir un archivo de audio local (mp3, wav, webm, etc.) usando el script incluido:

```bash
node genera-texto.mjs 'Amor eterno - Juan Gabriel.mp3'
```

Esto enviará el archivo al backend y mostrará la transcripción directamente en la terminal.
- Un navegador moderno con soporte para grabación de audio (para usar la función de voz a texto)

## ⚡ Instalación y ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/imzodev/genai-tts-tutorial.git
   cd genai-tts-tutorial
   ```
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```
3. Crea un archivo `.env.local` con tu clave de API:
   ```env
   GOOGLE_GENAI_API_KEY=tu_clave_aqui
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ✨ ¿Cómo funciona?

### Text-to-Speech (Texto a Voz)
- El usuario ingresa texto en la interfaz.
- El frontend envía la solicitud a la API de Google GenAI.
- Se recibe el audio generado y se reproduce directamente en el navegador.

### Speech-to-Text (Voz a Texto)
- El usuario graba su voz usando el micrófono desde la web.
- El audio grabado se envía al backend, que lo procesa con la API de Gemini.
- Se recibe y muestra la transcripción generada por IA en la web.

## 🎨 Personalización
- Puedes modificar los estilos en `app/globals.css` y los componentes en `app/components/`.
- El archivo principal de la lógica TTS está en `app/components/TextToSpeech.tsx`.
- Para agregar más funcionalidades, consulta la documentación de la API de Google GenAI.

## 📚 Recursos y créditos
- [Google GenAI API Docs](https://cloud.google.com/ai/docs/genai)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

¡Explora, aprende y lleva la generación de voz con IA a tus propios proyectos!
