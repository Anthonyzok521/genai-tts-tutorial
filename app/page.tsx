import TextToSpeech from './components/TextToSpeech';
import AudioToText from './components/AudioToText';
import Link from 'next/link';
import { FaGraduationCap, FaGithub, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
{/*      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Probar
        </h1>
         <p className="text-xl text-white max-w-3xl mx-auto">
          Experimenta el poder de Google Gemini para generar voces naturales y expresivas a partir de texto.
        </p> 
      </div>
{/* 

      <div className="bg-indigo-900 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Transcribe tu voz a texto</h2>
          <AudioToText />
        </div>
      </div>
 */}
      <div className="bg-indigo-900 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Probador de Texto a Voz
            </h2>
          </div>
          <TextToSpeech />
        </div>
      </div>      
    </div>
  );
}
