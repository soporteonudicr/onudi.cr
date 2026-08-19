import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";

/**
 * Tipografía de la plataforma.
 * - Archivo: titulares. Es una grotesca institucional de trazo estrecho, la más
 *   cercana al logotipo "ONUDI" del emblema.
 * - Source Sans 3: texto corrido. Humanista, pensada para leer párrafos largos
 *   en español.
 * Para cambiar la tipografía, se sustituyen estas dos importaciones y nada más.
 */
const display = Archivo({
  subsets: ["latin"],
  variable: "--fuente-titulo",
  display: "swap",
});

const cuerpo = Source_Sans_3({
  subsets: ["latin"],
  variable: "--fuente-cuerpo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONUDI Costa Rica",
  description:
    "Desarrollo industrial inclusivo y sostenible en Costa Rica: el Programa País, sus proyectos, plataformas, redes y oportunidades.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${cuerpo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
