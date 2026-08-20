/**
 * Contenido del Programa País ONUDI Costa Rica 2024-2028.
 * Todo el texto de esta plataforma se edita desde los archivos de esta carpeta.
 */

export type PasoRuta = {
  etiqueta: string;
  pregunta: string;
  icono: string;
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
      icono: "/imagenes/refleja/01.png",
    },
    {
      titulo: "Energías renovables y descarbonización",
      texto: "Impulsar nuevas soluciones para una producción más sostenible.",
      icono: "/imagenes/refleja/02.png",
    },
    {
      titulo: "Economía circular y eficiencia de recursos",
      texto: "Aprovechar mejor materiales y recursos dentro de los procesos productivos.",
      icono: "/imagenes/refleja/03.png",
    },
    {
      titulo: "Infraestructura de calidad, competitividad e innovación",
      texto: "Fortalecer las capacidades que permiten demostrar calidad, innovar y competir.",
      icono: "/imagenes/refleja/04.png",
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
