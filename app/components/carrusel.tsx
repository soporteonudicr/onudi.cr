"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Carrusel de fotografías del inicio.
 * Avanza solo cada seis segundos y se detiene si la persona pasa el cursor,
 * usa el teclado o pidió movimiento reducido en su sistema.
 */
export function Carrusel({
  imagenes,
  intervalo = 6000,
}: {
  imagenes: { src: string; alt: string }[];
  intervalo?: number;
}) {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pausado || imagenes.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reloj = window.setInterval(() => {
      setActual((previo) => (previo + 1) % imagenes.length);
    }, intervalo);

    return () => window.clearInterval(reloj);
  }, [pausado, intervalo, imagenes.length]);

  return (
    <div
      className="carrusel"
      ref={contenedor}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      aria-roledescription="carrusel"
      aria-label="Fotografías de ONUDI Costa Rica"
    >
      <div className="carrusel__marco">
        {imagenes.map((imagen, indice) => (
          <div
            key={imagen.src}
            className={`carrusel__lamina${indice === actual ? " carrusel__lamina--activa" : ""}`}
            aria-hidden={indice !== actual}
          >
            <Image
              src={imagen.src}
              alt={indice === actual ? imagen.alt : ""}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority={indice === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div className="carrusel__puntos" role="tablist" aria-label="Elegir fotografía">
        {imagenes.map((imagen, indice) => (
          <button
            type="button"
            key={imagen.src}
            role="tab"
            aria-selected={indice === actual}
            aria-label={`Fotografía ${indice + 1} de ${imagenes.length}`}
            className={indice === actual ? "carrusel__punto--activo" : undefined}
            onClick={() => setActual(indice)}
          />
        ))}
      </div>
    </div>
  );
}
