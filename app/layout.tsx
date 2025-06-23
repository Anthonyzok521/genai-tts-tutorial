import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gemini TTS - Texto a Voz con IA",
  description: "Convierte texto en voz natural con la tecnología de Google Gemini",
  keywords: ["texto a voz", "TTS", "Google Gemini", "IA", "voz natural"],
  authors: [{ name: "Tu Nombre" }],
  openGraph: {
    title: "Gemini TTS - Texto a Voz con IA",
    description: "Convierte texto en voz natural con la tecnología de Google Gemini",
    type: "website",
    locale: "es_MX",
    url: "https://tudominio.com",
    siteName: "Gemini TTS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-indigo-950 text-indigo-50`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-indigo-900 border-t border-indigo-800 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-indigo-300 text-sm">
              © {new Date().getFullYear()} Gemini TTS Demo. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
