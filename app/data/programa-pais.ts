/**
 * Contenido del Programa País ONUDI Costa Rica 2024-2028.
 * Todo el texto de esta plataforma se edita desde los archivos de esta carpeta.
 */

export type Componente = {
  numero: string;
  titulo: string;
  frase: string;
  texto: string;
};

export type Eje = {
  titulo: string;
  texto: string;
};

export type PasoRuta = {
  etiqueta: string;
  pregunta: string;
  icono: string;
};

export type Personaje = {
  id: string;
  nombre: string;
};

/* ── ¿Quiénes somos? ─────────────────────────────────────────── */

export const quienesSomos = {
  titulo: "¿Qué es ONUDI?",
  texto: [
    "La Organización de las Naciones Unidas para el Desarrollo Industrial (ONUDI) es la agencia especializada de las Naciones Unidas que promueve el desarrollo industrial inclusivo y sostenible.",
    "En Costa Rica, este mandato se traduce en cooperación técnica orientada a fortalecer capacidades productivas, apoyar la innovación, impulsar modelos más sostenibles y contribuir a que los sectores productivos puedan responder a nuevos desafíos y oportunidades.",
  ],
};

export const ods9 = {
  etiqueta: "ODS 9",
  titulo: "Industria · Innovación · Infraestructura",
  texto: [
    "El ODS 9 promueve infraestructuras resilientes, una industrialización inclusiva y sostenible y el desarrollo de la innovación.",
    "Es uno de los principales marcos para comprender el trabajo que ONUDI desarrolla junto con sus contrapartes y socios en Costa Rica.",
  ],
};

export const dondeSeRefleja = {
  titulo: "¿Dónde se refleja este trabajo?",
  entradas: [
    {
      titulo: "Habilidades técnicas para el empleo",
      texto: "Fortalecer capacidades para una industria que evoluciona.",
    },
    {
      titulo: "Energías renovables y descarbonización",
      texto: "Impulsar nuevas soluciones para una producción más sostenible.",
    },
    {
      titulo: "Economía circular y eficiencia de recursos",
      texto: "Aprovechar mejor materiales y recursos dentro de los procesos productivos.",
    },
    {
      titulo: "Infraestructura de calidad, competitividad e innovación",
      texto: "Fortalecer las capacidades que permiten demostrar calidad, innovar y competir.",
    },
  ],
};

/* ── Programa País ───────────────────────────────────────────── */

export const programaPais = {
  imagen: "/imagenes/programa-pais.jpg",
  titulo: "Programa País ONUDI Costa Rica 2024-2028",
  subtitulo: "Una hoja de ruta construida desde las prioridades del país",
  textoHome:
    "Una hoja de ruta para conectar las prioridades de Costa Rica con cooperación técnica, capacidades y proyectos concretos.",
  fraseHome: "La cooperación empieza por entender las prioridades del país.",
  texto: [
    "El Programa País establece un marco de cooperación entre ONUDI y Costa Rica.",
    "Permite conectar prioridades nacionales con las capacidades técnicas de ONUDI y traducirlas en alianzas, conocimiento, fortalecimiento institucional y proyectos concretos.",
    "No funciona como una colección de iniciativas aisladas. Sus componentes se relacionan entre sí para responder de forma integral a los desafíos del desarrollo industrial.",
    "El Programa País vigente trabaja sobre cuatro componentes que buscan fortalecer competitividad, empleo, descarbonización, economía circular, cadenas de valor e innovación.",
  ],
};

export const componentes: Componente[] = [
  {
    numero: "01",
    titulo: "Habilidades técnicas para el empleo",
    frase: "Preparar talento para una industria que cambia.",
    texto:
      "Fortalecimiento de competencias técnicas, formación y actualización de capacidades para responder a nuevas tecnologías, modelos productivos y necesidades del mercado laboral.",
  },
  {
    numero: "02",
    titulo: "Energías renovables y descarbonización",
    frase: "Transformar la forma en que producimos y utilizamos la energía.",
    texto:
      "Promoción de energías renovables, soluciones de descarbonización y capacidades que permitan avanzar hacia actividades productivas más eficientes y bajas en carbono.",
  },
  {
    numero: "03",
    titulo: "Economía circular y eficiencia de recursos",
    frase: "Aprovechar mejor lo que ya tenemos.",
    texto:
      "Promoción de modelos productivos que reduzcan desperdicios, mantengan materiales dentro de los ciclos productivos y utilicen de forma más eficiente los recursos.",
  },
  {
    numero: "04",
    titulo: "Infraestructura de calidad, competitividad e innovación",
    frase: "Tener las capacidades para demostrar calidad, innovar y competir.",
    texto:
      "Fortalecimiento de normas, estándares, trazabilidad, tecnologías, conocimiento e instituciones que permiten a los sectores productivos responder a mercados cada vez más exigentes.",
  },
];

export const notaComponentes =
  "Los cuatro componentes corresponden a la estructura presentada para el Programa País ONUDI Costa Rica 2024-2028.";

export const ejes: Eje[] = [
  {
    titulo: "Juventud y equidad de género",
    texto:
      "Ampliar oportunidades y fortalecer la participación de diferentes grupos en los procesos de transformación productiva.",
  },
  {
    titulo: "Cadenas de valor sostenibles",
    texto:
      "Conectar los distintos eslabones de la producción para aumentar sostenibilidad, resiliencia y generación de valor.",
  },
  {
    titulo: "PYMES",
    texto:
      "Fortalecer las capacidades de pequeñas y medianas empresas para innovar, cumplir estándares y participar en cadenas de valor.",
  },
  {
    titulo: "Investigación, desarrollo e innovación",
    texto:
      "Conectar conocimiento, tecnología y nuevas soluciones con necesidades productivas reales.",
  },
];

export const notaEjes =
  "La matriz del Programa País plantea estos elementos como conexiones que atraviesan los componentes y permiten comprender el programa como un sistema interrelacionado.";

/* ── Ruta de la cooperación (franja celeste del home) ────────── */

export const rutaCooperacion: PasoRuta[] = [
  {
    etiqueta: "Prioridad nacional",
    pregunta: "¿Qué necesita fortalecer Costa Rica?",
    icono: "/imagenes/ruta/01-prioridad.png",
  },
  {
    etiqueta: "Programa País",
    pregunta: "¿Dónde puede aportar ONUDI?",
    icono: "/imagenes/ruta/02-programa.png",
  },
  {
    etiqueta: "Cooperación técnica",
    pregunta: "¿Qué capacidades y conocimiento pueden movilizarse?",
    icono: "/imagenes/ruta/03-cooperacion.png",
  },
  {
    etiqueta: "Proyectos",
    pregunta: "¿Cómo se convierte la cooperación en acciones concretas?",
    icono: "/imagenes/ruta/04-proyectos.png",
  },
];

/* ── Rutas del Programa País (personajes) ────────────────────── */

export const personajes: Personaje[] = [
  { id: "vero", nombre: "Vero" },
  { id: "nicol", nombre: "Nicol" },
  { id: "julian", nombre: "Julián" },
  { id: "matias", nombre: "Matías" },
  { id: "alberto", nombre: "Alberto" },
];

/** Pasos que debe aceptar cada ruta. El contenido narrativo se incorpora luego. */
export const estructuraRuta = [
  "Personaje",
  "Necesidad",
  "Componente",
  "Acción",
  "Eje transversal",
  "Resultado esperado",
];

/** Conexiones de la matriz disponibles para construir las historias. */
export const conexionesDisponibles = [
  "Formación técnica STEM",
  "Identificación de áreas de innovación",
  "Demanda de empleos verdes",
  "Encadenamientos productivos y clústeres",
  "Identificación de brechas de género y juventud",
  "Herramientas para adoptar economía circular",
  "Asistencia a PYMES para cumplimiento de estándares",
  "Investigación aplicada en energías limpias",
  "Incorporación de energías renovables",
  "Promoción de contratación",
  "Recirculación de materiales",
  "Certificación de empresas circulares",
  "Integración de estrategias de género",
  "Fortalecimiento de infraestructura",
  "Herramientas de trazabilidad y sostenibilidad",
];
