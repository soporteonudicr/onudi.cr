"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Primera pantalla: el video de portada.
 * El titular va incrustado en el video, así que también se escribe como texto
 * real: los lectores de pantalla y los buscadores necesitan leerlo, y en móvil
 * la versión del video queda demasiado pequeña.
 *
 * Se reproduce solo, en silencio y en bucle, pero siempre se puede pausar. Si
 * la persona pidió movimiento reducido en su sistema, arranca detenido.
 */
export function PortadaVideo({ titulo }: { titulo: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(true);

  useEffect(() => {
    const elemento = video.current;
    if (!elemento) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elemento.pause();
      setReproduciendo(false);
    }
  }, []);

  const alternar = () => {
    const elemento = video.current;
    if (!elemento) return;
    if (elemento.paused) {
      void elemento.play();
      setReproduciendo(true);
    } else {
      elemento.pause();
      setReproduciendo(false);
    }
  };

  return (
    <section className="portada">
      <div className="portada__marco">
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/portada-poster.jpg"
        >
          <source src="/video/portada.mp4" type="video/mp4" />
        </video>

        <button
          type="button"
          className="portada__control"
          onClick={alternar}
          aria-label={reproduciendo ? "Pausar el video" : "Reproducir el video"}
        >
          {reproduciendo ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4l13 8-13 8z" />
            </svg>
          )}
        </button>
      </div>

      <h1 className="portada__titulo">{titulo}</h1>
    </section>
  );
}
