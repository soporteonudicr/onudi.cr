export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  country: string;
  region: string;
  duration: string;
  budget: string;
  objective: string;
  context: string[];
  strategy: Array<{ title: string; description: string }>;
  impact: string[];
  partners: {
    implementation: string[];
    government: string[];
    financing: string[];
  };
  sdgs: number[];
};

export const projects: Project[] = [
  {
    slug: "construccion-circular",
    title:
      "Ecologización de las cadenas de suministro de la construcción",
    shortTitle: "Construcción circular",
    summary:
      "Eliminación de contaminantes peligrosos y desarrollo de prácticas de construcción circular en Costa Rica.",
    country: "Costa Rica",
    region: "América Latina y el Caribe",
    duration: "2023 - 2031",
    budget: "USD 4,339,450",
    objective:
      "Promover materiales más seguros, procesos productivos sostenibles y modelos de economía circular que reduzcan los impactos ambientales de la cadena de suministro de la construcción.",
    context: [
      "El sector construcción es fundamental para el desarrollo del país y, al mismo tiempo, representa una oportunidad clave para avanzar hacia prácticas más sostenibles.",
      "El proyecto impulsa en Costa Rica el uso de materiales más seguros, procesos productivos sostenibles y modelos de economía circular que fortalecen la innovación y reducen impactos ambientales.",
    ],
    strategy: [
      {
        title: "Innovación en materiales",
        description:
          "Sustituir insumos de alto impacto ambiental por alternativas más seguras y sostenibles.",
      },
      {
        title: "Capacidades y estándares",
        description:
          "Fortalecer el desarrollo técnico y la adopción de marcos regulatorios para prácticas sostenibles.",
      },
      {
        title: "Economía circular y residuos",
        description:
          "Optimizar el uso de recursos mediante reducción, reutilización y valorización de materiales.",
      },
    ],
    impact: [
      "Fortalecimiento de la competitividad del sector construcción.",
      "Promoción de la innovación y alineación con estándares internacionales.",
      "Reducción de riesgos para la salud y el ambiente.",
      "Uso más eficiente de los recursos.",
    ],
    partners: {
      implementation: ["ONUDI"],
      government: ["Ministerio de Ambiente y Energía", "DIGECA"],
      financing: ["Fondo para el Medio Ambiente Mundial (GEF)"],
    },
    sdgs: [9, 12, 13, 15],
  },
  {
    slug: "estrategia-biometano",
    title: "Estrategia Nacional de Biometano de Costa Rica 2025-2040",
    shortTitle: "Estrategia de biometano",
    summary:
      "Transición energética justa a partir del aprovechamiento de residuos orgánicos.",
    country: "Costa Rica",
    region: "América Latina y el Caribe",
    duration: "2025 - 2040",
    budget: "USD 173,000",
    objective:
      "Establecer una hoja de ruta para desarrollar el mercado del biometano en Costa Rica y aprovechar residuos como una fuente de energía renovable.",
    context: [
      "Costa Rica avanza hacia la descarbonización de su economía, particularmente en sectores con altas emisiones como el transporte y la industria.",
      "El biometano permite valorizar residuos orgánicos agropecuarios, agroindustriales y municipales, reducir emisiones y fortalecer la seguridad energética nacional.",
    ],
    strategy: [
      {
        title: "Marco regulatorio",
        description:
          "Fortalecer las condiciones normativas necesarias para desarrollar el mercado del biometano.",
      },
      {
        title: "Infraestructura",
        description:
          "Identificar y promover la infraestructura requerida para producir y utilizar biometano.",
      },
      {
        title: "Modelos de negocio",
        description:
          "Promover soluciones basadas en economía circular y valorización de residuos.",
      },
      {
        title: "Capacidades técnicas",
        description:
          "Impulsar una transición justa con empleo verde, inclusión social y participación territorial.",
      },
    ],
    impact: [
      "Reducción de emisiones de gases de efecto invernadero.",
      "Sustitución progresiva de combustibles fósiles en transporte pesado e industria.",
      "Valorización energética de residuos orgánicos.",
      "Generación de empleo verde y fortalecimiento de capacidades técnicas.",
      "Impulso a la economía circular y al desarrollo territorial.",
    ],
    partners: {
      implementation: ["ONUDI", "PNUD"],
      government: ["Ministerio de Ambiente y Energía"],
      financing: ["Joint SDG Fund"],
    },
    sdgs: [5, 7, 8, 9, 10, 12, 13],
  },
  {
    slug: "programa-pais-2024-2028",
    title: "Programa País ONUDI Costa Rica 2024-2028",
    shortTitle: "Programa País 2024-2028",
    summary: "Marco para un desarrollo industrial inclusivo y sostenible.",
    country: "Costa Rica",
    region: "América Latina y el Caribe",
    duration: "2024 - 2028",
    budget: "USD 121,268",
    objective:
      "Fortalecer la cooperación con el Gobierno de Costa Rica para avanzar hacia una industria más resiliente, inclusiva, innovadora y baja en carbono.",
    context: [
      "Costa Rica impulsa una transformación productiva basada en innovación, sostenibilidad y competitividad.",
      "El Programa País apoya la implementación de políticas nacionales como el Plan Nacional de Desarrollo e Inversión Pública y el Plan Nacional de Descarbonización.",
    ],
    strategy: [
      {
        title: "Competencias técnicas",
        description: "Desarrollar habilidades y formación para el empleo.",
      },
      {
        title: "Energías renovables",
        description: "Promover la descarbonización y la transición energética industrial.",
      },
      {
        title: "Economía circular",
        description: "Impulsar la eficiencia de recursos y los modelos productivos circulares.",
      },
      {
        title: "Infraestructura de calidad",
        description: "Fortalecer competitividad, estándares e innovación industrial.",
      },
    ],
    impact: [
      "Fortalecimiento de la competitividad industrial del país.",
      "Empleo de calidad y formación técnica.",
      "Aceleración de la transición hacia una economía baja en carbono.",
      "Cadenas de valor sostenibles e innovación industrial.",
    ],
    partners: {
      implementation: ["ONUDI"],
      government: ["Gobierno de Costa Rica"],
      financing: ["Regular Programme of Technical Cooperation"],
    },
    sdgs: [8, 9, 12, 13],
  },
  {
    slug: "cafe-sostenible-trazable",
    title:
      "Sostenibilidad y trazabilidad en la cadena de valor del café de Costa Rica",
    shortTitle: "Café sostenible y trazable",
    summary:
      "Fortalecimiento de la cadena de valor para mejorar el acceso al mercado europeo.",
    country: "Costa Rica",
    region: "América Latina y el Caribe",
    duration: "2024 - 2026",
    budget: "USD 2.8 millones",
    objective:
      "Mejorar la sostenibilidad, trazabilidad y transparencia de la cadena de valor del café para fortalecer su competitividad y acceso a mercados internacionales.",
    context: [
      "El café es uno de los principales productos de exportación de Costa Rica.",
      "Nuevas regulaciones europeas exigen que los productos agrícolas demuestren su origen, cumplimiento ambiental y transparencia a lo largo de la cadena de valor.",
    ],
    strategy: [
      {
        title: "Plataforma nacional",
        description:
          "Evaluar y mejorar la plataforma de trazabilidad del café desarrollada por ICAFE.",
      },
      {
        title: "Herramienta digital",
        description:
          "Registrar información de sostenibilidad y trazabilidad de forma confiable.",
      },
      {
        title: "Capacitación",
        description:
          "Fortalecer capacidades de productores, procesadores y actores clave.",
      },
      {
        title: "Cultura de calidad",
        description:
          "Promover prácticas de calidad, sostenibilidad y cumplimiento.",
      },
    ],
    impact: [
      "Mayor trazabilidad y transparencia de la cadena de valor.",
      "Capacidad del sector para cumplir con regulaciones internacionales.",
      "Fortalecimiento de la competitividad y sostenibilidad.",
      "Mayor acceso a mercados internacionales.",
      "Integración de tecnologías digitales.",
    ],
    partners: {
      implementation: ["ONUDI"],
      government: ["Instituto del Café de Costa Rica (ICAFE)"],
      financing: ["Secretaría de Estado para Asuntos Económicos de Suiza (SECO)"],
    },
    sdgs: [8, 9, 12, 13, 17],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
