# Gemini TTS Tutorial

Convierte texto en voz natural con la API de Google GenAI

Este proyecto es un tutorial interactivo y moderno que te enseña a utilizar la API de Google GenAI para generar audio a partir de texto (Text-to-Speech, TTS) usando una interfaz web creada con Next.js y React.

## 🚀 Características principales

- **Interfaz moderna en dark mode** con diseño responsive y componentes visuales atractivos.
- **Probador interactivo**: ingresa texto y obtén audio generado por la API de Google Gemini.
- **Explicaciones didácticas** sobre el funcionamiento de TTS y casos de uso.
- **Código fácil de personalizar** y extender para tus propios proyectos.

## 🛠️ Requisitos
- Node.js 18+
- Una clave de API de Google GenAI (consulta la documentación oficial para obtenerla)

## ⚡ Instalación y ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/gemini-tts-demo.git
   cd gemini-tts-demo
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
- El usuario ingresa texto en la interfaz.
- El frontend envía la solicitud a la API de Google GenAI.
- Se recibe el audio generado y se reproduce directamente en el navegador.

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
