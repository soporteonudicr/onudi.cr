import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centro de recursos | ONUDI Costa Rica",
  description:
    "Biblioteca digital de proyectos, plataformas, redes y oportunidades vinculadas al desarrollo industrial sostenible en Costa Rica.",
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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
