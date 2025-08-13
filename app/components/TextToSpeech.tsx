'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaStop, FaDownload, FaVolumeUp, FaExclamationTriangle } from 'react-icons/fa';

type VoiceOption = {
  id: string;
  name: string;
  description: string;
};

type ResponseContextAI = { status: number, message: string }

const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'Puck', name: 'Puck', description: 'Voz alegre y juvenil' },
  /* { id: 'Kore', name: 'Kore', description: 'Voz clara y profesional' },
  { id: 'Zephyr', name: 'Zephyr', description: 'Voz suave y cálida' },
  { id: 'Charon', name: 'Charon', description: 'Voz profunda y seria' }, */
];

export default function TextToSpeech() {
  const [text, setText] = useState('Hola, este es un ejemplo de texto a voz con Gemini');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [showVoiceOptions, setShowVoiceOptions] = useState(false);

  // Limpiar recursos cuando el componente se desmonte
  useEffect(() => {
    const currentAudio = audioRef.current;

    return () => {
      if (currentAudio) {
        currentAudio.pause();
        if (currentAudio.src && currentAudio.src.startsWith('blob:')) {
          URL.revokeObjectURL(currentAudio.src);
        }
        // Limpiar manejadores de eventos
        currentAudio.onerror = null;
        currentAudio.onplay = null;
        currentAudio.onloadeddata = null;
        currentAudio.onsuspend = null;
        currentAudio.onstalled = null;
      }
    };
  }, []);

  // Limpiar la URL del audio cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Actualizar el tiempo actual de reproducción
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  // Manejar el final de la reproducción
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.error('Error al reproducir el audio:', err);
        setError('No se pudo reproducir el audio. Intenta de nuevo.');
      });
      setIsPlaying(true);
    }
  };

  const handleSpeak = async () => {
    /* if (!text.trim()) {
      setError('Por favor ingresa un texto para convertir a voz');
      return;
    } */

    setIsLoading(true);
    setError(null);

    // Limpiar el elemento de audio y estado anterior
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      } catch (e) {
        console.warn('Error al limpiar el reproductor de audio:', e);
      }
    }

    // Limpiar URL de audio anterior si existe
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    setCurrentTime(0);
    setAudioDuration(0);
    setIsPlaying(false);

    console.log('Iniciando solicitud de generación de voz...');

    try {
      console.log('Solicitando generación de audio...');

      //Obtener mensaje
      const msg = await fetch('/api/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: "Crea frases o haz chistes, tambien puedes dar conteos de despegue espacial" }),
      });

      if (!msg.ok) {
        console.log("No se pudo obtener el mensaje");
        return;
      }

      const text = await msg.json() as ResponseContextAI;

      // 1. Obtener el audio del servidor
      const response = await fetch('/api/generate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.message }),
      });

      if (!response.ok) {
        let errorMessage = 'Error al generar el audio';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          console.error('Error en la respuesta del servidor:', errorData);
        } catch (jsonError) {
          const textError = await response.text();
          console.error('Error al analizar la respuesta de error:', textError);
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // 2. Obtener el tipo de contenido de la respuesta
      const responseContentType = response.headers.get('content-type') || 'audio/wav';
      console.log('Tipo de contenido de la respuesta:', responseContentType);

      if (!responseContentType.includes('audio/')) {
        const errorData = await response.text();
        console.error('Respuesta inesperada del servidor:', errorData);
        throw new Error('El servidor devolvió un tipo de contenido inesperado');
      }

      // 3. Obtener los datos binarios
      const audioData = await response.arrayBuffer();

      if (!audioData || audioData.byteLength === 0) {
        throw new Error('El audio generado está vacío');
      }

      console.log(`Tamaño del audio: ${audioData.byteLength} bytes`);

      // 4. Crear un blob con el tipo de contenido WAV
      const audioBlob = new Blob([audioData], { type: 'audio/wav' });

      // 5. Crear una URL para el blob
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('URL del audio creada:', audioUrl.substring(0, 50) + '...');
      console.log('Tipo MIME del blob:', audioBlob.type);

      // 6. Verificar que el blob no esté vacío
      if (audioBlob.size === 0) {
        throw new Error('El blob de audio está vacío');
      }

      // 5. Configurar el elemento de audio
      if (audioRef.current) {
        // Configurar manejadores de eventos
        const audioElement = audioRef.current;

        const handleError = (e: Event | string) => {
          const errorEvent = typeof e === 'string' ? new Event(e) : e;
          console.error('Error en el elemento de audio:', errorEvent);
          console.error('Detalles del error:', {
            error: audioElement.error,
            readyState: audioElement.readyState,
            networkState: audioElement.networkState,
            src: audioElement.src?.substring(0, 100)
          });
          setError('Error al cargar o reproducir el audio. Intenta de nuevo.');
          setIsLoading(false);
        };

        const handleLoadedData = () => {
          console.log('Audio cargado correctamente');
          console.log('Duración del audio:', audioElement.duration);
          console.log('Formato del audio:', audioElement.src?.split('.').pop() || 'desconocido');
        };

        const handlePlay = () => {
          console.log('Reproduciendo audio...');
          setError(null);
          setIsLoading(false);
        };

        // Limpiar manejadores anteriores
        audioElement.onerror = null;
        audioElement.onloadeddata = null;
        audioElement.onplay = null;

        // Asignar nuevos manejadores
        audioElement.onerror = handleError;
        audioElement.onloadeddata = handleLoadedData;
        audioElement.onplay = handlePlay;

        // Configurar la fuente del audio
        audioElement.src = audioUrl;
        console.log('Fuente de audio establecida, cargando...');

        // Configurar manejador para cuando el audio se pueda reproducir
        const handleCanPlay = () => {
          console.log('El audio está listo para reproducirse');
          audioElement.play()
            .then(() => {
              console.log('Reproducción iniciada con éxito');
              setIsLoading(false);
            })
            .catch(playError => {
              console.error('Error al reproducir audio:', playError);
              setError('No se pudo reproducir el audio. Asegúrate de que el sonido esté activado.');
              setIsLoading(false);
            });
        };

        // Configurar manejador de error de carga
        const handleLoadError = (e: Event | string) => {
          const errorEvent = typeof e === 'string' ? new Event(e) : e;
          console.error('Error al cargar el audio:', errorEvent);
          console.error('Detalles del error:', {
            error: audioElement.error,
            readyState: audioElement.readyState,
            networkState: audioElement.networkState
          });
          setError('Error al cargar el archivo de audio. Intenta de nuevo.');
          setIsLoading(false);
        };

        // Limpiar manejadores anteriores
        audioElement.oncanplay = null;
        audioElement.onerror = null;

        // Asignar nuevos manejadores
        audioElement.oncanplay = handleCanPlay;
        audioElement.onerror = handleLoadError;

        // Forzar la carga del audio
        audioElement.load();
      }

    } catch (error) {
      console.error('Error en handleSpeak:', error);
      let errorMessage = 'Ocurrió un error al generar el audio';

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
        } else if (error.message.includes('404')) {
          errorMessage = 'No se encontró el recurso solicitado. Por favor, verifica la configuración.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Error interno del servidor. Por favor, inténtalo más tarde.';
        } else if (error.message) {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const base64ToBlob = (base64: string, type: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const handleDownload = async () => {
    if (!text.trim()) {
      setError('Por favor ingresa un texto para descargar');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/download-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: selectedVoice // Incluir la voz seleccionada
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al descargar el audio');
      }

      // Crear un enlace temporal para la descarga
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voz-${selectedVoice}-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();

      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar el audio:', error);
      setError(error instanceof Error ? error.message : 'Error al descargar el audio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * audioDuration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 text-indigo-100 bg-slate-800 p-6 rounded-lg">
      {/*  <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-indigo-100 mb-2">
          Escribe tu texto:
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 border border-indigo-600 bg-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[150px] text-white placeholder-indigo-400"
          placeholder="Escribe o pega tu texto aquí..."
          disabled={isLoading}
        />
      </div> */}

      {/* Selector de voz */}
      {/* <div className="relative">
        <label className="block text-sm font-medium text-indigo-100 mb-2">
          Selecciona una voz:
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full bg-slate-700 border border-indigo-600 rounded-lg px-4 py-2 text-left flex items-center justify-between text-indigo-100"
            onClick={() => setShowVoiceOptions(!showVoiceOptions)}
          >
            <span>{VOICE_OPTIONS.find(v => v.id === selectedVoice)?.name || 'Seleccionar voz'}</span>
            <svg
              className={`h-5 w-5 text-indigo-400 transform transition-transform ${showVoiceOptions ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
  
          {showVoiceOptions && (
            <div className="absolute z-10 mt-1 w-full bg-slate-700 shadow-lg rounded-md py-1 border border-indigo-700">
              {VOICE_OPTIONS.map((voice) => (
                <button
                  key={voice.id}
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm ${
                    selectedVoice === voice.id
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                  onClick={() => {
                    setSelectedVoice(voice.id);
                    setShowVoiceOptions(false);
                  }}
                >
                  <div className="font-medium">{voice.name}</div>
                  <div className="text-xs text-indigo-300">{voice.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div> */}

      {/* Controles de audio */}
      <div className="space-y-4">
        {audioUrl && (
          <div className="bg-slate-700 rounded-lg p-4 border border-indigo-700">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <button
                onClick={handlePlayPause}
                disabled={!audioUrl || isLoading}
                className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50"
              >
                {isPlaying ? <FaStop className="h-5 w-5" /> : <FaPlay className="h-5 w-5 ml-1" />}
              </button>

              <div className="flex-1">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="h-2 bg-indigo-900 rounded-full cursor-pointer overflow-hidden"
                >
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: audioDuration > 0 ? `${(currentTime / audioDuration) * 100}%` : '0%',
                      transition: 'width 0.1s linear'
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-indigo-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(audioDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botón de descarga */}
        {/* <div className="flex justify-center">
          <button
            onClick={handleDownload}
            disabled={isLoading || !text.trim()}
            className="w-full max-w-md inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <FaDownload className="mr-2 h-5 w-5" />
            Descargar Audio WAV
          </button>
        </div> */}
      </div>

      {/* Acción principal */}
      <div className="pt-2">
        <button
          onClick={handleSpeak}
          disabled={isLoading || !text.trim()}
          className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${isLoading || !text.trim()
            ? 'bg-indigo-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02]'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando audio...
            </>
          ) : (
            <>
              <FaVolumeUp className="mr-2" />
              Convertir a voz
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900 border-l-4 border-red-500 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-100">{error}</p>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        className="hidden"
        controls
        preload="none"
        onError={(e) => {
          console.error('Error en el elemento de audio:', e);
          setError('No se pudo cargar el audio. El formato podría no ser compatible.');
          setIsLoading(false);
          setIsPlaying(false);
        }}
        onCanPlayThrough={(e) => console.log('Audio listo para reproducir:', e)}
        onLoadedMetadata={(e) => {
          const audio = e.target as HTMLAudioElement;
          setAudioDuration(audio.duration);
        }}
        onLoadStart={() => console.log('Comenzando a cargar el audio...')}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );

}
