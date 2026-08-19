/**
 * Plataformas, redes y oportunidades.
 *
 * Las oportunidades funcionan como curaduría: la plataforma nunca reproduce una
 * convocatoria completa, siempre dirige a la fuente oficial.
 */

export type Plataforma = {
  nombre: string;
  texto: string;
  enlace: string;
  boton: string;
};

export type Red = {
  nombre: string;
  texto: string;
  enlaces: { etiqueta: string; url?: string }[];
};

export type PublicoOportunidad =
  | "Empresas"
  | "Profesionales"
  | "Estudiantes y jóvenes"
  | "Instituciones"
  | "Academia"
  | "Organizaciones";

export type Oportunidad = {
  nombre: string;
  publicos: PublicoOportunidad[];
  ofrece: string;
  fechaLimite: string;
  convoca: string;
  sitio: string;
};

export const publicosOportunidad: PublicoOportunidad[] = [
  "Empresas",
  "Profesionales",
  "Estudiantes y jóvenes",
  "Instituciones",
  "Academia",
  "Organizaciones",
];

export const plataformas: Plataforma[] = [
  {
    nombre: "IA Consciente ONUDI",
    texto:
      "Una ruta práctica para utilizar inteligencia artificial con criterio humano, propósito y conciencia sobre los recursos que hacen posible esta tecnología.",
    enlace: "https://ia-consciente-onudi.vercel.app/",
    boton: "Explorar plataforma",
  },
];

export const redes: Red[] = [
  {
    nombre: "Mujeres en la Industria",
    texto:
      "Un espacio para conectar y visibilizar la participación de mujeres en los sectores productivos y en las conversaciones sobre el futuro de la industria.",
    enlaces: [{ etiqueta: "Conocer la red" }, { etiqueta: "Ir a Instagram" }],
  },
];

/** Todavía sin convocatorias publicadas. La sección ya está lista para recibirlas. */
export const oportunidades: Oportunidad[] = [];
