/**
 * Proyectos de ONUDI Costa Rica.
 *
 * Todos los proyectos usan la misma estructura de siete secciones para que la
 * plataforma pueda crecer sin rediseñar nada.
 *
 * Regla editorial: no completar campos sin fuente oficial validada. Un proyecto
 * con estado "en-preparacion" muestra la ficha lista pero sin contenido inventado.
 */

export type Actor = {
  nombre: string;
  sigla?: string;
  rol: string;
  logo?: string;
  logoAlt?: string;
  sitio?: string;
  redes?: string;
};

export type Accion = {
  verbo: string;
  texto: string;
  imagen?: string;
  imagenAlt?: string;
};

export type Paso = {
  titulo: string;
  texto?: string;
};

export type Motivo = {
  titulo: string;
  texto?: string;
  imagen?: string;
  imagenAlt?: string;
};

export type FotoProyecto = {
  id: string;
  url: string;
  alt: string;
  pie?: string;
};

export type RecursoProyecto = {
  id: string;
  tipo: string;
  titulo: string;
  texto?: string;
  imagen?: string;
  imagenAlt?: string;
  url: string;
};

export type Proyecto = {
  slug: string;
  /** Nombre corto, el que se ve en las tarjetas y en el menú. */
  nombre: string;
  /** Nombre oficial completo. Si existe, es el que encabeza la página. */
  nombreCompleto?: string;
  /** Frase corta de propósito, va bajo el nombre. Se omite si no aplica. */
  proposito?: string;
  /** Descripción recortada que se muestra en la tarjeta del home. */
  resumen: string;
  /** Imagen de la tarjeta del inicio, en public/imagenes/proyectos/ */
  imagen?: string;
  imagenAlt?: string;
  /** Franja de portada de la página del proyecto, en proyectos/banners/ */
  banner?: string;
  bannerAlt?: string;
  tags: string[];
  estado: "publicado" | "en-preparacion";

  /** Solo se muestran los datos que existan. Dejar vacío lo no validado. */
  referencia?: {
    pais?: string;
    periodo?: string;
    programa?: string;
    presupuesto?: string;
    ods?: number[];
  };

  desafio?: { titulo: string; parrafos: string[] };

  respuesta?: {
    titulo?: string;
    intro?: string;
    acciones: Accion[];
    galeria?: FotoProyecto[];
    nota?: string;
  };

  funcionamiento?: {
    titulo?: string;
    intro?: string;
    forma: "lineal" | "circular";
    pasos: Paso[];
    diagrama?: string;
    diagramaAlt?: string;
    ejemplos?: { titulo: string; items: string[] };
    nota?: string;
  };

  importa?: Motivo[];

  avances?: {
    metas: string[];
    resultados: string[];
    nota?: string;
  };

  recursos?: RecursoProyecto[];

  gobernanza?: {
    nota?: string;
    actores: Actor[];
  };
};

export const proyectos: Proyecto[] = [
  /* ─────────────────────────────────────────────────────────── */
  {
    slug: "cafe",
    imagen: "/imagenes/proyectos/cafe.jpg",
    banner: "/imagenes/proyectos/banners/cafe.jpg",
    nombre: "Café de Costa Rica",
    proposito: "Trazabilidad y sostenibilidad para fortalecer su competitividad.",
    resumen:
      "Fortalecer la capacidad del sector cafetalero para conectar información sobre origen, trazabilidad y sostenibilidad y responder a mercados cada vez más exigentes.",
    tags: ["Trazabilidad", "Calidad", "Digitalización", "Cadenas de valor"],
    estado: "publicado",
    referencia: {
      pais: "Costa Rica",
      periodo: "2024-2026",
      programa: "Global Quality and Standards Programme",
      ods: [8, 9, 12, 13, 17],
    },
    desafio: {
      titulo: "Un café reconocido también necesita demostrar su historia",
      parrafos: [
        "Costa Rica cuenta con una cadena cafetalera organizada y con décadas de experiencia en calidad, investigación y trazabilidad.",
        "Al mismo tiempo, los mercados internacionales han incorporado requisitos cada vez más exigentes relacionados con el origen de los productos, la sostenibilidad y la información disponible a lo largo de las cadenas de valor.",
        "Para el sector cafetalero, esto hace cada vez más importante que la información que nace en la finca pueda conectarse con otros momentos de la cadena y convertirse en información confiable para productores, beneficios, exportadores y compradores.",
        "ICAFE cuenta además con una estructura regulatoria y de información respaldada por la Ley 2762, que ha permitido articular la cadena y adaptar sus sistemas a nuevos requerimientos de mercado.",
      ],
    },
    respuesta: {
      titulo: "Fortalecer lo que Costa Rica ya ha construido",
      intro:
        "El proyecto parte de sistemas y capacidades existentes en el sector cafetalero y busca fortalecerlos a través de tres grandes acciones.",
      acciones: [
        {
          verbo: "Evaluar",
          texto:
            "Revisar el diseño del Traceability and Sustainability Statement de ICAFE e identificar los ajustes necesarios para responder a requisitos de trazabilidad y sostenibilidad.",
        },
        {
          verbo: "Desarrollar",
          texto:
            "Fortalecer y desarrollar la herramienta tecnológica para registrar y comunicar información relevante de la cadena de valor.",
        },
        {
          verbo: "Fortalecer capacidades",
          texto:
            "Facilitar que personas productoras y otros actores del sector comprendan y utilicen las herramientas y la información vinculada con los nuevos requisitos de mercado.",
        },
      ],
      nota: "Estos tres resultados forman parte de la intervención establecida en la formulación del proyecto.",
    },
    funcionamiento: {
      titulo: "La información comienza en el territorio",
      forma: "lineal",
      pasos: [
        { titulo: "Finca", texto: "La información comienza con la producción y el territorio." },
        {
          titulo: "CRCAFÉ",
          texto:
            "Herramienta de ICAFE que facilita el registro y gestión de información y cuenta con capacidades de georreferenciación.",
        },
        {
          titulo: "Información de trazabilidad",
          texto:
            "Los datos pueden conectarse con información sobre origen, producción y otros elementos de la cadena.",
        },
        {
          titulo: "Beneficio y procesamiento",
          texto: "La trazabilidad continúa a través de los procesos del sector cafetalero.",
        },
        {
          titulo: "Comercialización y exportación",
          texto:
            "La información acompaña al café dentro de los sistemas institucionales y comerciales.",
        },
        {
          titulo: "Mercado",
          texto:
            "Compradores y otros actores pueden acceder a información que fortalece transparencia y confianza.",
        },
      ],
      nota:
        "CRCAFÉ es una herramienta desarrollada por ICAFE. El proyecto de cooperación no crea desde cero la institucionalidad ni los sistemas cafetaleros: busca fortalecer las capacidades y herramientas existentes.",
    },
    importa: [
      {
        titulo: "Competitividad",
        texto:
          "Fortalecer la capacidad del sector para responder a mercados internacionales donde trazabilidad, origen y sostenibilidad tienen un peso creciente.",
      },
      {
        titulo: "Transparencia",
        texto: "Conectar información de diferentes momentos de la cadena de valor.",
      },
      {
        titulo: "Capacidades digitales",
        texto:
          "Acercar herramientas tecnológicas y conocimiento a productores y otros actores del sector.",
      },
      {
        titulo: "Sostenibilidad",
        texto:
          "Facilitar el registro y comunicación de información que permita comprender mejor las prácticas y condiciones vinculadas con la producción.",
      },
    ],
    avances: {
      metas: [
        "Evaluar una herramienta de trazabilidad.",
        "Desarrollar una herramienta informática de trazabilidad.",
        "Desarrollar una guía de uso.",
        "Capacitar a 200 personas productoras.",
      ],
      resultados: [],
      nota: "Los resultados alcanzados se incorporarán con un informe actualizado que confirme cada entrega y cifra.",
    },
    gobernanza: {
      nota: "La formulación del proyecto establece una estructura de seguimiento con ONUDI, ICAFE, Suiza y MAG, además de participación prevista de COMEX y MINAE como observadores.",
      actores: [
        {
          nombre: "ONUDI · Global Quality and Standards Programme",
          rol: "Cooperación técnica y ejecución del proyecto.",
          sitio: "https://www.unido.org/",
        },
        {
          nombre: "Instituto del Café de Costa Rica",
          sigla: "ICAFE",
          rol: "Contraparte nacional y articulación con la cadena cafetalera.",
        },
        {
          nombre: "Secretaría de Estado para Asuntos Económicos de Suiza",
          sigla: "SECO",
          rol: "Financiamiento del Global Quality and Standards Programme.",
        },
        {
          nombre: "Ministerio de Agricultura y Ganadería",
          sigla: "MAG",
          rol: "Participación en la supervisión según la estructura prevista de ejecución.",
        },
        {
          nombre: "Ministerio de Comercio Exterior",
          sigla: "COMEX",
          rol: "Participación prevista como observador en el Comité de Seguimiento y articulación vinculada con la Mesa Técnica del Pacto Verde.",
        },
        {
          nombre: "Ministerio de Ambiente y Energía",
          sigla: "MINAE",
          rol: "Participación prevista como observador en el Comité de Seguimiento y articulación temática.",
        },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────── */
  {
    slug: "biometano",
    imagen: "/imagenes/proyectos/biometano.jpg",
    banner: "/imagenes/proyectos/banners/biometano.jpg",
    nombre: "Biometano",
    proposito: "Convertir residuos en una oportunidad para la transición energética.",
    resumen:
      "Aprovechar residuos orgánicos para impulsar nuevas alternativas de energía, economía circular y desarrollo territorial.",
    tags: ["Energía", "Economía circular", "Descarbonización", "Territorio"],
    estado: "publicado",
    referencia: {
      pais: "Costa Rica",
      periodo: "2025-2040",
      programa: "Estrategia Nacional de Biometano de Costa Rica",
      ods: [5, 7, 8, 9, 10, 12, 13],
    },
    desafio: {
      titulo: "Residuos que hoy no se aprovechan",
      parrafos: [
        "Costa Rica avanza en la descarbonización de su economía, mientras sectores productivos y territorios generan residuos orgánicos agropecuarios, agroindustriales y municipales que pueden tener un valor energético.",
        "El biometano ofrece una oportunidad para conectar ambos desafíos: aprovechar residuos y convertirlos en una fuente de energía renovable.",
      ],
    },
    respuesta: {
      intro:
        "La Estrategia Nacional de Biometano de Costa Rica 2025-2040 establece una hoja de ruta para desarrollar este mercado.",
      acciones: [
        {
          verbo: "Marco regulatorio",
          texto: "Fortalecer las condiciones necesarias para su desarrollo.",
        },
        {
          verbo: "Infraestructura",
          texto: "Avanzar en las capacidades necesarias para producir y utilizar biometano.",
        },
        {
          verbo: "Economía circular",
          texto: "Promover modelos de negocio que valoricen residuos.",
        },
        {
          verbo: "Capacidades técnicas",
          texto: "Preparar talento y conocimiento para acompañar esta nueva cadena de valor.",
        },
      ],
      nota: "La estrategia incorpora además una visión de transición energética justa, vinculada con empleo verde, inclusión y participación territorial.",
    },
    funcionamiento: {
      forma: "lineal",
      pasos: [
        { titulo: "Residuo orgánico" },
        { titulo: "Producción de biogás" },
        { titulo: "Purificación" },
        { titulo: "Biometano" },
        { titulo: "Uso energético" },
      ],
      ejemplos: {
        titulo: "Ejemplos de residuos identificados",
        items: [
          "Residuos de café",
          "Piña",
          "Banano",
          "Caña de azúcar",
          "Estiércol ganadero",
          "Residuos agroindustriales",
        ],
      },
    },
    importa: [
      {
        titulo: "Descarbonización",
        texto:
          "Puede apoyar la reducción del uso de combustibles fósiles en sectores estratégicos.",
      },
      { titulo: "Economía circular", texto: "Permite generar nuevo valor a partir de residuos." },
      {
        titulo: "Territorios",
        texto: "Puede abrir oportunidades vinculadas con actividades agrícolas y rurales.",
      },
      {
        titulo: "Capacidades",
        texto: "Requiere conocimiento técnico, infraestructura y nuevos modelos de negocio.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────── */
  {
    slug: "construccion-circular",
    imagen: "/imagenes/proyectos/construccion-circular.jpg",
    banner: "/imagenes/proyectos/banners/construccion-circular.jpg",
    nombre: "Construcción circular",
    proposito: "Construir también es una oportunidad para transformar.",
    resumen:
      "Impulsar materiales más seguros y prácticas circulares para fortalecer la sostenibilidad y competitividad del sector construcción.",
    tags: ["Economía circular", "Materiales", "Eficiencia de recursos", "Innovación"],
    estado: "publicado",
    referencia: {
      pais: "Costa Rica",
      periodo: "2023-2031",
      ods: [9, 12, 13, 15],
    },
    desafio: {
      titulo: "Un sector que mueve materiales a gran escala",
      parrafos: [
        "La construcción es fundamental para el desarrollo del país y, al mismo tiempo, utiliza grandes cantidades de materiales y recursos a lo largo de toda su cadena de valor.",
        "Esto crea una oportunidad para repensar cómo se diseñan los edificios, qué materiales se utilizan, cómo se gestionan los procesos constructivos y qué ocurre con esos materiales al final de su vida útil.",
      ],
    },
    respuesta: {
      intro: "El proyecto trabaja sobre tres grandes áreas.",
      acciones: [
        {
          verbo: "Innovación en materiales",
          texto:
            "Impulsar alternativas más seguras y sostenibles frente a insumos de mayor impacto ambiental.",
        },
        {
          verbo: "Capacidades y estándares",
          texto:
            "Fortalecer conocimiento técnico y marcos que permitan incorporar prácticas más sostenibles.",
        },
        {
          verbo: "Economía circular y residuos",
          texto:
            "Reducir, reutilizar y valorizar materiales para mantenerlos dentro del ciclo productivo.",
        },
      ],
      nota: "Estos elementos forman parte de la estrategia establecida para el proyecto en Costa Rica.",
    },
    funcionamiento: {
      forma: "circular",
      pasos: [
        {
          titulo: "Diseño sostenible",
          texto: "Pensar desde el inicio en eficiencia, durabilidad y reutilización.",
        },
        {
          titulo: "Selección de materiales",
          texto: "Priorizar opciones seguras, reciclables y con menor impacto.",
        },
        {
          titulo: "Construcción eficiente",
          texto: "Reducir desperdicios y gestionar responsablemente los residuos.",
        },
        {
          titulo: "Uso del edificio",
          texto: "Mejorar eficiencia energética, mantenimiento y adaptación.",
        },
        {
          titulo: "Fin de vida",
          texto: "Reutilizar, reciclar o reincorporar materiales en nuevas construcciones.",
        },
      ],
    },
    importa: [
      { titulo: "Competitividad" },
      { titulo: "Innovación" },
      { titulo: "Salud y ambiente" },
      { titulo: "Eficiencia de recursos" },
    ],
  },

  /* ─────────────────────────────────────────────────────────── */
  {
    slug: "costa-rica-por-siempre",
    imagen: "/imagenes/proyectos/costa-rica-por-siempre.jpg",
    banner: "/imagenes/proyectos/banners/costa-rica-por-siempre.jpg",
    nombre: "Costa Rica por Siempre",
    proposito: "Contenido en preparación.",
    resumen: "Contenido en preparación.",
    tags: [],
    estado: "en-preparacion",
  },

  /* ─────────────────────────────────────────────────────────── */
  {
    slug: "conservacion-internacional",
    imagen: "/imagenes/proyectos/conservacion-internacional.jpg",
    banner: "/imagenes/proyectos/banners/conservacion-internacional.jpg",
    nombre: "Conservación Internacional",
    proposito: "Contenido en preparación.",
    resumen: "Contenido en preparación.",
    tags: [],
    estado: "en-preparacion",
  },
];

export function getProyecto(slug: string) {
  return proyectos.find((proyecto) => proyecto.slug === slug);
}
