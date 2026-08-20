"use client";

import { useEffect, useRef } from "react";
import { IconoFlechaAtras, Marca } from "./ui";

export function Ventana({
  abierta,
  onCerrar,
  titulo,
  children,
}: {
  abierta: boolean;
  onCerrar: () => void;
  titulo: string;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  // Se guarda en una referencia para que el efecto no vuelva a correr cada vez
  // que el componente padre crea una función nueva.
  const cerrar = useRef(onCerrar);
  cerrar.current = onCerrar;

  useEffect(() => {
    if (!abierta) return;

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") cerrar.current();
    };

    const scrollPrevio = window.scrollY;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionar);

    // La ventana siempre abre por el principio.
    if (panel.current) {
      panel.current.scrollTop = 0;
      panel.current.focus({ preventScroll: true });
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alPresionar);
      window.scrollTo({ top: scrollPrevio, behavior: "instant" as ScrollBehavior });
    };
  }, [abierta]);

  if (!abierta) return null;

  return (
    <div className="ventana" role="dialog" aria-modal="true" aria-label={titulo}>
      <div className="ventana__barra">
        <button type="button" className="ventana__volver" onClick={onCerrar}>
          <Marca alto={30} />
          <span className="ventana__volver-texto">
            <IconoFlechaAtras tamano={15} />
            Volver al inicio
          </span>
        </button>
      </div>
      <div className="ventana__cuerpo" ref={panel} tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}
