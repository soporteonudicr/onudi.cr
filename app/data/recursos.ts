/**
 * Plataformas, redes y oportunidades.
 *
 * Las oportunidades funcionan como curaduría: la plataforma nunca reproduce una
 * convocatoria completa, siempre dirige a la fuente oficial.
 */

export type Plataforma = {
  nombre: string;
  texto: string;
  imagen?: string;
  enlace: string;
  boton: string;
};

export type Red = {
  nombre: string;
  texto: string;
  imagen?: string;
  enlaces: { etiqueta: string; url?: string; externo?: boolean }[];
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

/** Arte que acompaña a cada cabecera de sección. */
export const artesSeccion = {
  plataformas: "/imagenes/secciones/plataformas.jpg",
  redes: "/imagenes/secciones/redes.jpg",
  oportunidades: "/imagenes/secciones/oportunidades.jpg",
};

export const plataformas: Plataforma[] = [
  {
    nombre: "IA Consciente ONUDI",
    imagen: "/imagenes/ia-consciente.jpg",
    texto:
      "Una ruta práctica para utilizar inteligencia artificial con criterio humano, propósito y conciencia sobre los recursos que hacen posible esta tecnología.",
    enlace: "https://ia-consciente-onudi.vercel.app/",
    boton: "Explorar plataforma",
  },
];

export const redes: Red[] = [
  {
    nombre: "Mujeres en la Industria",
    imagen: "/imagenes/mujeres-industria.jpg",
    texto:
      "Un espacio para conectar y visibilizar la participación de mujeres en los sectores productivos y en las conversaciones sobre el futuro de la industria.",
    enlaces: [
      { etiqueta: "Conocer la red", url: "/redes/mujeres-en-la-industria", externo: false },
      { etiqueta: "Ir a Instagram", url: "https://www.instagram.com/onudi.cr/" },
    ],
  },
];

/** Todavía sin convocatorias publicadas. La sección ya está lista para recibirlas. */
export const oportunidades: Oportunidad[] = [];

/** Formulario permanente de registro de interés. */
export const registroInteres = {
  titulo: "Registro de interés",
  texto:
    "Si querés que te avisemos sobre actividades, formación, pasantías o alianzas, dejanos tus datos y el tipo de vínculo que te interesa.",
  boton: "Completar el formulario",
  enlace: "https://onudi-eventos-crm.vercel.app/interes",
};

/** Enlace al catálogo global de herramientas de ONUDI. */
export const masHerramientas = {
  titulo: "Más herramientas de ONUDI",
  texto:
    "El portal global de la organización reúne guías, publicaciones y plataformas de todos los programas.",
  boton: "Ver más en unido.org",
  enlace: "https://www.unido.org/",
};
