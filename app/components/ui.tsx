import Image from "next/image";
import Link from "next/link";

/* ── Marca ───────────────────────────────────────────────────── */

export function Marca({
  variante = "azul",
  tipo = "horizontal",
  alto = 40,
}: {
  variante?: "azul" | "blanco";
  tipo?: "horizontal" | "emblema";
  alto?: number;
}) {
  const horizontal = tipo === "horizontal";
  const src = horizontal
    ? `/logos/onudi-horizontal-${variante}.png`
    : `/logos/emblema-${variante === "azul" ? "azul" : "blanco"}.png`;
  const proporcion = horizontal ? 1243 / 239 : 1424 / 1211;

  return (
    <Image
      src={src}
      alt="ONUDI · Organización de las Naciones Unidas para el Desarrollo Industrial"
      width={Math.round(alto * proporcion)}
      height={alto}
      priority={horizontal}
      style={{ height: alto, width: "auto" }}
    />
  );
}

/* ── Fotografía ──────────────────────────────────────────────── */

export function Foto({
  src,
  alt,
  proporcion = "16 / 9",
  encaje = "cover",
  encuadre = "center",
  tamanos = "100vw",
  prioridad = false,
  tono,
}: {
  src: string;
  alt: string;
  proporcion?: string;
  encaje?: "cover" | "contain";
  encuadre?: string;
  tamanos?: string;
  prioridad?: boolean;
  tono?: "celeste";
}) {
  return (
    <div
      className={`foto${tono ? ` foto--${tono}` : ""}`}
      style={{ aspectRatio: proporcion }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={tamanos}
        priority={prioridad}
        style={{ objectFit: encaje, objectPosition: encuadre }}
      />
    </div>
  );
}

/* ── Espacio reservado para imagen ───────────────────────────── */

/**
 * Marca dónde va una fotografía todavía no entregada.
 * Cuando llegue la imagen, se reemplaza este componente por <Image .../>.
 */
export function Espacio({
  proporcion = "16 / 9",
  nota,
  tono = "celeste",
  minAlto,
}: {
  proporcion?: string;
  nota: string;
  tono?: "celeste" | "sobre-azul";
  minAlto?: number;
}) {
  return (
    <div
      className={`espacio espacio--${tono}`}
      style={{ aspectRatio: proporcion, minHeight: minAlto }}
      role="img"
      aria-label={`Espacio reservado para imagen: ${nota}`}
    >
      <span className="espacio__marco" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="espacio__nota">{nota}</span>
    </div>
  );
}

/* ── Etiquetas ───────────────────────────────────────────────── */

export function Etiqueta({
  children,
  tono = "azul",
}: {
  children: React.ReactNode;
  tono?: "azul" | "blanco";
}) {
  return <p className={`etiqueta etiqueta--${tono}`}>{children}</p>;
}

export function EnPreparacion({ children }: { children?: React.ReactNode }) {
  return (
    <p className="en-preparacion">
      <span aria-hidden="true" />
      {children ?? "Contenido en preparación"}
    </p>
  );
}

/* ── Botones ─────────────────────────────────────────────────── */

export function BotonEnlace({
  href,
  children,
  tono = "azul",
  externo = false,
}: {
  href: string;
  children: React.ReactNode;
  tono?: "azul" | "blanco" | "linea";
  externo?: boolean;
}) {
  const clase = `boton boton--${tono}`;
  if (externo) {
    return (
      <a className={clase} href={href} target="_blank" rel="noreferrer">
        {children}
        <IconoExterno />
      </a>
    );
  }
  return (
    <Link className={clase} href={href}>
      {children}
      <IconoFlecha />
    </Link>
  );
}

/* ── Íconos ──────────────────────────────────────────────────── */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconoFlecha({ tamano = 17 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} {...base}>
      <path d="M5 12h13M12 6l6 6-6 6" />
    </svg>
  );
}

export function IconoFlechaAtras({ tamano = 17 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} {...base}>
      <path d="M19 12H6M12 18l-6-6 6-6" />
    </svg>
  );
}

export function IconoExterno({ tamano = 15 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} {...base}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export function IconoCerrar({ tamano = 20 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
