import TextToSpeech from './components/TextToSpeech';
import AudioToText from './components/AudioToText';
import Link from 'next/link';
import { FaGraduationCap, FaGithub, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Convierte Texto a Voz con IA
        </h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
          Experimenta el poder de Google Gemini para generar voces naturales y expresivas a partir de texto.
        </p>
      </div>

      {/* Sección de voz a texto con micrófono */}
      <div className="bg-indigo-900 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Transcribe tu voz a texto</h2>
          <AudioToText />
        </div>
      </div>

      <div className="bg-indigo-900 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Probador de Texto a Voz
            </h2>
            <Link 
              href="/learn" 
              className="inline-flex items-center text-white hover:text-white text-sm font-medium"
            >
              <FaGraduationCap className="mr-1" /> Aprende más
            </Link>
          </div>
          <TextToSpeech />
        </div>
      </div>

      <div className="mt-12 bg-indigo-800 rounded-xl p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          ¿Quieres aprender más sobre esta tecnología?
        </h2>
        <p className="text-white mb-6 max-w-2xl mx-auto">
          Descubre cómo funciona Google Gemini TTS, sus características avanzadas y cómo puedes integrarlo en tus proyectos.
        </p>
        <Link 
          href="/learn" 
          className="inline-flex items-center bg-indigo-700 hover:bg-indigo-600 text-indigo-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <span>Explorar documentación</span>
          <FaArrowRight className="ml-2" />
        </Link>
      </div>

      <div className="mt-12 text-center text-sm text-indigo-400">
        <p className="mb-2">
          Este es un proyecto de demostración que utiliza la API de Google Gemini.
        </p>
        <a 
          href="https://github.com/imzodev/genai-tts-tutorial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-white hover:text-white"
        >
          <FaGithub className="mr-2" /> Ver en GitHub
        </a>
      </div>
    </div>
  );
}
