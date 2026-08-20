/**
 * Red de Mujeres en la Industria.
 * El contenido sigue la presentación institucional de la red.
 */

export const red = {
  nombre: "Red de Mujeres en la Industria",
  bajada: "Costa Rica, 2026",
  portada: "/imagenes/mujeres-industria.jpg",
  canal: "https://whatsapp.com/channel/0029VbD1CN984Om5sQlfN00c",
};

export type Bloque = {
  id: string;
  etiqueta?: string;
  titulo: string;
  texto?: string;
  imagen: string;
  /**
   * Cómo se acomodan texto e imagen:
   * "derecha" e "izquierda" son a dos columnas; "apilado" pone la imagen
   * arriba y el texto debajo, a todo el ancho.
   */
  disposicion: "derecha" | "izquierda" | "apilado";
};

export const bloques: Bloque[] = [
  {
    id: "motor",
    titulo: "La industria es uno de los motores más importantes del desarrollo económico.",
    texto: "Es un espacio donde se generan innovación, empleo y nuevas oportunidades para los países.",
    imagen: "/imagenes/mujeres/industria-motor.jpg",
    disposicion: "derecha",
  },
  {
    id: "barreras",
    etiqueta: "Pero las mujeres aún enfrentan barreras",
    titulo: "En el mundo de la investigación científica, solo el 28 % son mujeres.",
    imagen: "/imagenes/mujeres/barreras-ciencia.jpg",
    disposicion: "apilado",
  },
  {
    id: "manufactura",
    titulo:
      "A nivel mundial, las mujeres representan solo el 27 % del empleo en el sector manufacturero.",
    imagen: "/imagenes/mujeres/empleo-manufactura.jpg",
    disposicion: "apilado",
  },
  {
    id: "participacion",
    titulo:
      "Promover la participación de las mujeres en la industria no es solo una cuestión de equidad.",
    texto:
      "También es una estrategia clave para fortalecer la innovación y la competitividad.",
    imagen: "/imagenes/mujeres/participacion.jpg",
    disposicion: "izquierda",
  },
  {
    id: "costa-rica",
    titulo: "En Costa Rica queremos que esta conmemoración se traduzca en acciones concretas.",
    texto: "Por eso hoy presentamos la Red de Mujeres en la Industria.",
    imagen: "/imagenes/mujeres/publicacion.jpg",
    disposicion: "derecha",
  },
];

export type Linea = {
  titulo: string;
  texto: string;
  imagen?: string;
};

export const lineas: Linea[] = [
  {
    titulo: "Espacios de networking",
    texto: "Eventos y encuentros que faciliten la conexión entre mujeres del sector industrial.",
    imagen: "/imagenes/mujeres/networking.jpg",
  },
  {
    titulo: "Intercambio de conocimiento",
    texto:
      "Conversatorios, paneles y espacios de aprendizaje para compartir experiencias y buenas prácticas.",
    imagen: "/imagenes/mujeres/intercambio.jpg",
  },
  {
    titulo: "Mentoría y desarrollo profesional",
    texto:
      "Espacios para fortalecer capacidades y acompañar el crecimiento de nuevas líderes industriales.",
    imagen: "/imagenes/mujeres/mentoria.jpg",
  },
  {
    titulo: "Visibilidad del liderazgo femenino",
    texto:
      "Iniciativas de comunicación que destaquen el trabajo y los logros de mujeres en la industria.",
    imagen: "/imagenes/mujeres/visibilidad.jpg",
  },
];

export const sumarse = {
  titulo: "Cómo formar parte",
  texto: "Esta red crecerá a través de la participación de todas ustedes.",
  detalle: "Todo a través de nuestro canal de WhatsApp.",
  boton: "Unirme al canal",
  imagen: "/imagenes/mujeres/whatsapp.png",
};
