"use client";

import { useEffect, useRef } from "react";
import { IconoCerrar, Marca } from "./ui";

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

  useEffect(() => {
    if (!abierta) return;

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onCerrar();
    };

    const scrollPrevio = window.scrollY;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionar);
    panel.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alPresionar);
      window.scrollTo({ top: scrollPrevio });
    };
  }, [abierta, onCerrar]);

  if (!abierta) return null;

  return (
    <div className="ventana" role="dialog" aria-modal="true" aria-label={titulo}>
      <div className="ventana__barra">
        <Marca alto={30} />
        <button type="button" className="ventana__cerrar" onClick={onCerrar}>
          Cerrar
          <IconoCerrar />
        </button>
      </div>
      <div className="ventana__cuerpo" ref={panel} tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}
