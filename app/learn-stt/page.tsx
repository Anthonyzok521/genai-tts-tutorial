import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaBook, FaCode, FaMicrophone, FaRegFileAudio, FaRobot } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Aprende sobre Gemini Speech-to-Text',
  description: 'Guía completa sobre la transcripción de voz a texto con Google Gemini',
};

export default function LearnSTTPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-blue-950">
      <header className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-blue-900 text-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Google Gemini Speech-to-Text</h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto">
            Transcribe tu voz en texto usando inteligencia artificial avanzada.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-indigo-100 mb-8 text-center">¿Qué es Speech-to-Text con Gemini?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-indigo-200 mb-6">
                Google Gemini Speech-to-Text (STT) es una tecnología que convierte grabaciones de voz o audio en texto escrito, permitiendo automatizar tareas, mejorar la accesibilidad y potenciar aplicaciones inteligentes.
              </p>
              <div className="bg-indigo-900/70 backdrop-blur-md p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold text-lg text-indigo-300 mb-2">Características principales</h3>
                <ul className="space-y-2 text-indigo-200">
                  <li className="flex items-start">
                    <FaMicrophone className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Reconocimiento de voz en tiempo real</span>
                  </li>
                  <li className="flex items-start">
                    <FaRegFileAudio className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Soporte para múltiples formatos de audio (mp3, wav, webm, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <FaRobot className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Transcripción precisa impulsada por IA</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-indigo-950/80 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-indigo-900">
              <h3 className="text-xl font-semibold mb-4 text-indigo-100">Prueba el STT</h3>
              <p className="bg-indigo-900/60 p-4 rounded-lg mb-4 text-indigo-200 italic">
                "La transcripción automática de voz abre nuevas posibilidades de accesibilidad, productividad y análisis de datos."
              </p>
              <Link href="/" className="inline-flex items-center text-indigo-300 hover:text-indigo-100 font-medium">
                Probar ahora <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-indigo-100 mb-8 text-center">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<FaMicrophone className="text-3xl" />} 
              title="1. Grabación de Audio" 
              description="El usuario graba su voz usando el micrófono desde la web o sube un archivo de audio."
            />
            <FeatureCard 
              icon={<FaCode className="text-3xl" />} 
              title="2. Procesamiento IA"
              description="El audio es enviado al backend, que lo procesa con la API de Gemini para obtener la transcripción."
            />
            <FeatureCard 
              icon={<FaBook className="text-3xl" />} 
              title="3. Resultado en Texto"
              description="El texto transcrito se muestra en la web, listo para copiar, analizar o integrar en otras aplicaciones."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-indigo-100 mb-8 text-center">Casos de Uso</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UseCaseCard 
              title="Accesibilidad"
              description="Facilita el acceso a la información para personas con discapacidad auditiva."
              color="bg-purple-900/70 text-purple-200"
            />
            <UseCaseCard 
              title="Productividad"
              description="Transcribe reuniones, entrevistas o notas de voz de forma automática."
              color="bg-indigo-800/80 text-indigo-200"
            />
            <UseCaseCard 
              title="Análisis de Datos"
              description="Convierte grandes volúmenes de audio en texto para análisis y minería de datos."
              color="bg-green-900/70 text-green-200"
            />
            <UseCaseCard 
              title="Automatización"
              description="Permite crear bots, asistentes y flujos inteligentes basados en voz."
              color="bg-amber-900/70 text-amber-200"
            />
          </div>
        </section>

        <section className="bg-indigo-950/90 backdrop-blur-lg rounded-xl shadow-lg p-8 text-center border border-indigo-900">
          <h2 className="text-2xl font-bold text-indigo-100 mb-4">¿Listo para probarlo?</h2>
          <p className="text-indigo-300 mb-6 max-w-2xl mx-auto">
            Descubre cómo la transcripción de voz con IA puede transformar tus proyectos y tu productividad.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-indigo-700 via-indigo-500 to-blue-700 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
          >
            Probar ahora
          </Link>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-indigo-900/70 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-indigo-800">
      <div className="w-12 h-12 bg-gradient-to-tr from-indigo-700 to-blue-800 rounded-full flex items-center justify-center text-indigo-200 mb-4 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-100">{title}</h3>
      <p className="text-indigo-300">{description}</p>
    </div>
  );
}

function UseCaseCard({ title, description, color }: { title: string, description: string, color: string }) {
  return (
    <div className={`p-6 rounded-lg hover:shadow-xl transition-shadow border border-indigo-800/50 ${color}`}>
      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 bg-white/10 text-white/90 backdrop-blur">
        {title}
      </span>
      <p className="text-indigo-200">{description}</p>
    </div>
  );
}
