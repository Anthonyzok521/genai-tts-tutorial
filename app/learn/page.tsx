import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaBook, FaCode, FaMicrophone, FaGlobe, FaVolumeUp, FaRobot } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Aprende sobre Google Gemini TTS',
  description: 'Guía completa sobre la tecnología de texto a voz de Google Gemini',
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-blue-950">
      <header className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-blue-900 text-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Google Gemini TTS</h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto">
            Transforma texto en voz natural con la tecnología de inteligencia artificial de Google
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-indigo-100 mb-8 text-center">¿Qué es Google Gemini TTS?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-indigo-200 mb-6">
                Google Gemini TTS (Text-to-Speech) es una tecnología avanzada que convierte texto en voz natural,
                permitiendo crear experiencias de audio realistas y expresivas para diversas aplicaciones.
              </p>
              <div className="bg-indigo-900/70 backdrop-blur-md p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold text-lg text-indigo-300 mb-2">Características principales</h3>
                <ul className="space-y-2 text-indigo-200">
                  <li className="flex items-start">
                    <FaMicrophone className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Voces naturales y expresivas</span>
                  </li>
                  <li className="flex items-start">
                    <FaGlobe className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Múltiples idiomas y acentos</span>
                  </li>
                  <li className="flex items-start">
                    <FaRobot className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Control preciso sobre el estilo y tono</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-indigo-950/80 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-indigo-900">
              <h3 className="text-xl font-semibold mb-4 text-indigo-100">Prueba el TTS</h3>
              <p className="bg-indigo-900/60 p-4 rounded-lg mb-4 text-indigo-200 italic">
                "La tecnología de voz de Google Gemini puede transformar completamente la forma en que interactuamos con la información digital."
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
              icon={<FaBook className="text-3xl" />}
              title="1. Entrada de Texto"
              description="Proporciona el texto que deseas convertir a voz. Puedes incluir instrucciones sobre el estilo y tono."
            />
            <FeatureCard 
              icon={<FaCode className="text-3xl" />}
              title="2. Procesamiento IA"
              description="Gemini analiza el texto y genera una representación de voz natural utilizando modelos avanzados de IA."
            />
            <FeatureCard 
              icon={<FaVolumeUp className="text-3xl" />}
              title="3. Salida de Audio"
              description="Obtén el audio generado en formato WAV, listo para reproducir o integrar en tu aplicación."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-indigo-100 mb-8 text-center">Casos de Uso</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UseCaseCard 
              title="Asistentes Virtuales"
              description="Crea interacciones más naturales con usuarios finales."
              color="bg-purple-900/70 text-purple-200"
            />
            <UseCaseCard 
              title="Contenido Multimedia"
              description="Genera narraciones para videos y podcasts."
              color="bg-indigo-800/80 text-indigo-200"
            />
            <UseCaseCard 
              title="Educación"
              description="Crea materiales de aprendizaje accesibles."
              color="bg-green-900/70 text-green-200"
            />
            <UseCaseCard 
              title="Atención al Cliente"
              description="Mejora los sistemas IVR con voces más naturales."
              color="bg-amber-900/70 text-amber-200"
            />
          </div>
        </section>

        <section className="bg-indigo-950/90 backdrop-blur-lg rounded-xl shadow-lg p-8 text-center border border-indigo-900">
          <h2 className="text-2xl font-bold text-indigo-100 mb-4">¿Listo para comenzar?</h2>
          <p className="text-indigo-300 mb-6 max-w-2xl mx-auto">
            Explora el poder de la generación de voz con IA y lleva tus proyectos al siguiente nivel.
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
