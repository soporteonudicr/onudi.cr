"use client";

import { useEffect } from "react";

/**
 * Fuerza que la página abra desde arriba.
 *
 * El CSS tiene desplazamiento suave para los enlaces internos del inicio, pero
 * eso convierte el salto que hace el router al cambiar de página en una
 * animación que a veces queda a medias. Aquí se desactiva un instante, se salta
 * al principio y se vuelve a dejar como estaba.
 */
export function AlInicio() {
  useEffect(() => {
    const html = document.documentElement;
    const previo = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previo;
  }, []);

  return null;
}
