/**
 * Rutas del Programa País · la matriz interactiva.
 *
 * La matriz cruza cuatro componentes técnicos (columnas) con cuatro ejes
 * transversales (filas). Cada cruce es una escena de la historia, numerada
 * del 01 al 16 en orden de lectura.
 *
 * Las historias son ilustrativas: muestran cómo la formación, las empresas,
 * la innovación, la sostenibilidad y la cooperación pueden encontrarse a lo
 * largo de una misma cadena productiva.
 */

export type Componente = {
  id: string;
  nombre: string;
  frase: string;
  parrafos: string[];
  enLaHistoria: string;
  imagen: string;
};

export type Eje = {
  id: string;
  nombre: string;
  frase: string;
  parrafos: string[];
  imagen: string;
};

export type Personaje = {
  id: string;
  nombre: string;
  texto: string;
  imagen: string;
};

export type Historia = {
  numero: string;
  titulo: string;
  frase: string;
  parrafos: string[];
  imagen: string;
  componente: string;
  eje: string;
};

/* ── Entrada ─────────────────────────────────────────────────── */

export const entrada = {
  etiqueta: "Programa País 2024-2028 · Rutas",
  titulo: "Distintos caminos pueden encontrarse en una misma transformación.",
  parrafos: [
    "El Programa País conecta cuatro componentes técnicos con temas que atraviesan toda la industria: juventud y equidad de género, cadenas de valor sostenibles, PYMES e investigación, desarrollo e innovación.",
    "Para entender cómo funciona, seguí a Vero, Matías, Nicol, Julián y Alberto.",
    "Sus historias son ilustrativas: muestran cómo la formación, las empresas, la innovación, la sostenibilidad y la cooperación pueden encontrarse a lo largo de una misma cadena productiva.",
  ],
  instruccion: "Elegí un componente, un eje o una escena para descubrir la historia.",
};

/** Carrusel que acompaña la entrada. Una foto por componente. */
export const fotosComponentes = [
  { src: "/imagenes/programa-carrusel/01.jpg", alt: "Habilidades técnicas para el empleo" },
  { src: "/imagenes/programa-carrusel/02.jpg", alt: "Energías renovables y descarbonización" },
  { src: "/imagenes/programa-carrusel/03.jpg", alt: "Economía circular y eficiencia de recursos" },
  {
    src: "/imagenes/programa-carrusel/04.jpg",
    alt: "Infraestructura de calidad, competitividad e innovación",
  },
];

/* ── Componentes · las columnas ──────────────────────────────── */

export const componentes: Componente[] = [
  {
    id: "habilidades",
    nombre: "Habilidades técnicas para el empleo",
    frase: "El conocimiento abre rutas.",
    parrafos: [
      "La transformación industrial necesita personas preparadas para aprender, adaptarse y aplicar nuevas capacidades.",
      "Este componente impulsa la formación y actualización técnica para responder a las necesidades de los sectores productivos, las nuevas tecnologías y los empleos que están evolucionando.",
    ],
    enLaHistoria: "Aquí comienza el camino de Vero, Matías, Nicol y Julián.",
    imagen: "/imagenes/matriz/componentes/01.png",
  },
  {
    id: "energias",
    nombre: "Energías renovables y descarbonización",
    frase: "Transformar también significa producir utilizando mejor la energía.",
    parrafos: [
      "Este componente promueve capacidades y soluciones que permitan incorporar energías renovables, mejorar el desempeño energético y avanzar hacia actividades productivas con menores emisiones.",
    ],
    enLaHistoria:
      "Nuestros personajes empiezan a identificar dónde la energía puede convertirse en una oportunidad de innovación.",
    imagen: "/imagenes/matriz/componentes/02.png",
  },
  {
    id: "circular",
    nombre: "Economía circular y eficiencia de recursos",
    frase: "Lo que antes terminaba como residuo puede volver a generar valor.",
    parrafos: [
      "Este componente impulsa modelos que aprovechan mejor materiales y recursos, reducen desperdicios y buscan mantener su valor dentro de los ciclos productivos.",
    ],
    enLaHistoria:
      "Las empresas comienzan a mirar sus materiales, proveedores y procesos de una manera diferente.",
    imagen: "/imagenes/matriz/componentes/03.png",
  },
  {
    id: "calidad",
    nombre: "Infraestructura de calidad, competitividad e innovación",
    frase: "Para competir también hay que poder demostrar.",
    parrafos: [
      "Normas, estándares, trazabilidad, medición, calidad y capacidades técnicas ayudan a que empresas y sectores puedan demostrar que sus productos y procesos responden a determinados requisitos.",
    ],
    enLaHistoria:
      "Las ideas se convierten en procesos más confiables, trazables y preparados para crecer.",
    imagen: "/imagenes/matriz/componentes/04.png",
  },
];

/* ── Ejes transversales · las filas ──────────────────────────── */

export const ejes: Eje[] = [
  {
    id: "juventud",
    nombre: "Juventud y equidad de género",
    frase: "Más personas participando, más capacidades para transformar.",
    parrafos: [
      "Busca ampliar oportunidades para que mujeres y personas jóvenes puedan formarse, participar y aportar en los distintos espacios de la industria.",
      "No es un tema separado de la productividad: forma parte de cómo construimos talento y oportunidades.",
    ],
    imagen: "/imagenes/matriz/ejes/01.png",
  },
  {
    id: "cadenas",
    nombre: "Cadenas de valor sostenibles",
    frase: "Una empresa nunca transforma sola.",
    parrafos: [
      "Una cadena de valor conecta producción, proveedores, empresas, conocimiento, servicios y mercados.",
      "Fortalecer esas conexiones permite incorporar sostenibilidad desde distintos puntos y compartir capacidades a lo largo de la cadena.",
    ],
    imagen: "/imagenes/matriz/ejes/02.png",
  },
  {
    id: "pymes",
    nombre: "PYMES",
    frase: "La transformación también tiene que llegar a las pequeñas y medianas empresas.",
    parrafos: [
      "Las PYMES forman parte esencial del tejido productivo.",
      "Fortalecer sus capacidades para innovar, adoptar tecnologías, cumplir estándares, colaborar y utilizar mejor sus recursos permite que participen con mayor fuerza en nuevas oportunidades productivas.",
    ],
    imagen: "/imagenes/matriz/ejes/03.png",
  },
  {
    id: "innovacion",
    nombre: "Investigación, desarrollo e innovación",
    frase: "Convertir conocimiento en nuevas soluciones.",
    parrafos: [
      "Investigar permite comprender un desafío. Innovar permite convertir ese conocimiento en una respuesta.",
      "Este eje conecta academia, tecnología, empresas y capacidades técnicas para probar ideas, aprender y desarrollar soluciones aplicables a la industria.",
    ],
    imagen: "/imagenes/matriz/ejes/04.png",
  },
];

/* ── Personajes ──────────────────────────────────────────────── */

export const personajes: Personaje[] = [
  {
    id: "vero",
    nombre: "Vero",
    texto:
      "Está iniciando su camino profesional. Se interesa por los procesos, la calidad y cómo mejorar la forma en que funcionan las empresas.",
    imagen: "/imagenes/matriz/personajes/vero.png",
  },
  {
    id: "matias",
    nombre: "Matías",
    texto:
      "Con el tiempo convierte sus conocimientos en emprendimiento. Se interesa por innovación y economía circular y empieza a compartir esas capacidades con otras empresas.",
    imagen: "/imagenes/matriz/personajes/matias.png",
  },
  {
    id: "nicol",
    nombre: "Nicol",
    texto:
      "Su camino se orienta hacia sostenibilidad, energía y transformación productiva. Conecta conocimiento técnico con necesidades empresariales.",
    imagen: "/imagenes/matriz/personajes/nicol.png",
  },
  {
    id: "julian",
    nombre: "Julián",
    texto:
      "También comienza desde la formación técnica. Tiene curiosidad por tecnología, producción y nuevas soluciones aplicadas a la industria.",
    imagen: "/imagenes/matriz/personajes/julian.png",
  },
  {
    id: "alberto",
    nombre: "Alberto",
    texto:
      "Representa a quien ya está dentro de la industria. Dirige una empresa y descubre que transformarse requiere abrirse al talento joven, nuevas alianzas, conocimiento y mejores herramientas.",
    imagen: "/imagenes/matriz/personajes/alberto.png",
  },
];

/* ── Las 16 historias ────────────────────────────────────────── */

export const historias: Historia[] = [
  {
    numero: "01",
    titulo: "Formación técnica STEM",
    frase: "Todo comienza aprendiendo.",
    parrafos: [
      "Vero, Matías, Nicol y Julián se forman en áreas STEM. Comparten una misma base técnica, pero durante el proceso descubren intereses diferentes.",
      "Vero se acerca a los procesos y la calidad. Julián a la tecnología aplicada. Nicol a la sostenibilidad y la energía. Matías comienza a preguntarse cómo convertir nuevas ideas en soluciones.",
      "Estudiaron juntos. Sus caminos apenas empiezan a separarse.",
    ],
    imagen: "/imagenes/matriz/historias/01.jpg",
    componente: "habilidades",
    eje: "juventud",
  },
  {
    numero: "02",
    titulo: "Identificación de brechas",
    frase: "La primera oportunidad aparece dentro de una empresa.",
    parrafos: [
      "Vero y Julián realizan una pasantía en la empresa de Alberto.",
      "Al observar los procesos con ojos nuevos, empiezan a identificar oportunidades: cómo se utiliza la energía, qué capacidades hacen falta y dónde nuevas herramientas podrían mejorar la producción.",
      "Alberto comienza a descubrir que incorporar talento joven también puede ayudarle a mirar su empresa desde otra perspectiva.",
    ],
    imagen: "/imagenes/matriz/historias/02.jpg",
    componente: "energias",
    eje: "juventud",
  },
  {
    numero: "03",
    titulo: "Promoción de la contratación",
    frase: "Una oportunidad puede convertirse en una nueva capacidad para la empresa.",
    parrafos: [
      "La experiencia de Vero y Julián demuestra a Alberto el valor de incorporar perfiles técnicos jóvenes.",
      "Juntos empiezan a pensar cómo abrir oportunidades de trabajo con criterios claros, competencias definidas y condiciones que permitan atraer nuevo talento.",
      "La formación empieza a convertirse en empleo y el empleo en capacidad productiva.",
    ],
    imagen: "/imagenes/matriz/historias/03.jpg",
    componente: "circular",
    eje: "juventud",
  },
  {
    numero: "04",
    titulo: "Integración de estrategias de género",
    frase: "Transformar una empresa también significa revisar quién participa.",
    parrafos: [
      "Nicol comparte con Alberto y Matías herramientas para analizar oportunidades y barreras dentro de los espacios productivos.",
      "Juntos revisan cómo se comunican las oportunidades, quiénes acceden a formación y qué ajustes pueden ampliar la participación de mujeres y personas jóvenes.",
      "La equidad deja de verse como un tema aparte y empieza a incorporarse en la forma de tomar decisiones.",
    ],
    imagen: "/imagenes/matriz/historias/04.jpg",
    componente: "calidad",
    eje: "juventud",
  },
  {
    numero: "05",
    titulo: "Identificar demanda de empleos verdes",
    frase: "Las nuevas necesidades productivas también crean nuevas oportunidades profesionales.",
    parrafos: [
      "Después de su formación, Nicol descubre que las empresas empiezan a necesitar perfiles capaces de conectar producción, sostenibilidad y energía.",
      "Identificar esas nuevas demandas permite que la formación responda mejor a lo que está ocurriendo en la industria.",
      "Nicol encuentra una oportunidad donde sus conocimientos pueden aplicarse a un desafío real.",
    ],
    imagen: "/imagenes/matriz/historias/05.jpg",
    componente: "habilidades",
    eje: "cadenas",
  },
  {
    numero: "06",
    titulo: "Incorporación de energías renovables",
    frase: "Los caminos vuelven a encontrarse.",
    parrafos: [
      "Desde su nuevo trabajo, Nicol visita la empresa de Alberto, donde Vero y Julián habían comenzado su experiencia profesional.",
      "Juntos identifican una oportunidad para analizar cómo incorporar soluciones de energía renovable dentro de los procesos productivos.",
      "Lo que empezó como formación ahora conecta talento, empresa, energía y cooperación.",
    ],
    imagen: "/imagenes/matriz/historias/06.jpg",
    componente: "energias",
    eje: "cadenas",
  },
  {
    numero: "07",
    titulo: "Certificación de empresas circulares",
    frase: "La sostenibilidad también viaja a través de los proveedores.",
    parrafos: [
      "Alberto empieza a mirar más allá de los límites de su propia empresa.",
      "Con el apoyo de las nuevas capacidades incorporadas, analiza cómo seleccionar proveedores, reconocer prácticas circulares y utilizar criterios que le permitan fortalecer la sostenibilidad de toda su cadena.",
      "Ya no se trata solamente de cómo produce Alberto. También importa con quién produce.",
    ],
    imagen: "/imagenes/matriz/historias/07.jpg",
    componente: "circular",
    eje: "cadenas",
  },
  {
    numero: "08",
    titulo: "Herramientas de trazabilidad y sostenibilidad",
    frase: "Lo que sucede en una cadena también necesita poder conocerse.",
    parrafos: [
      "Alberto, Nicol y Matías empiezan a conectar información sobre proveedores, materiales y procesos.",
      "Las herramientas de trazabilidad les permiten comprender mejor de dónde vienen los insumos, qué ocurre durante la producción y qué información puede respaldar las decisiones de la empresa.",
      "La sostenibilidad empieza a ser también información que puede seguirse y demostrarse.",
    ],
    imagen: "/imagenes/matriz/historias/08.jpg",
    componente: "calidad",
    eje: "cadenas",
  },
  {
    numero: "09",
    titulo: "Encadenamiento productivo y clústeres",
    frase: "Una empresa encuentra oportunidades cuando deja de verse aislada.",
    parrafos: [
      "La empresa donde trabaja Nicol y la empresa de Alberto descubren que comparten desafíos, proveedores y necesidades técnicas.",
      "En lugar de resolverlos por separado, empiezan a colaborar. Surgen conexiones con otras empresas y actores del sector, creando oportunidades para compartir conocimiento, desarrollar proveedores y construir soluciones conjuntas.",
      "La competencia también puede convivir con la colaboración.",
    ],
    imagen: "/imagenes/matriz/historias/09.jpg",
    componente: "habilidades",
    eje: "pymes",
  },
  {
    numero: "10",
    titulo: "Identificar brechas de género y juventud",
    frase: "Vero y Julián también hicieron visible algo que antes pasaba desapercibido.",
    parrafos: [
      "Durante su experiencia en la empresa observan que algunas áreas técnicas tienen poca participación de personas jóvenes y mujeres.",
      "Al analizar esas brechas, Alberto puede tomar mejores decisiones sobre formación, pasantías, contratación y desarrollo de talento.",
      "Identificar una brecha es el primer paso para poder cerrarla.",
    ],
    imagen: "/imagenes/matriz/historias/10.jpg",
    componente: "energias",
    eje: "pymes",
  },
  {
    numero: "11",
    titulo: "Herramientas para adoptar un modelo de economía circular",
    frase: "Matías encuentra su propia ruta.",
    parrafos: [
      "Después de su formación, Matías decide emprender.",
      "Desarrolla servicios para ayudar a empresas a identificar residuos, revisar el uso de materiales y encontrar oportunidades para aplicar principios de economía circular.",
      "Nicol y Alberto participan en una de sus capacitaciones. Ahora quien alguna vez fue estudiante se convierte también en proveedor de conocimiento para la industria.",
    ],
    imagen: "/imagenes/matriz/historias/11.jpg",
    componente: "circular",
    eje: "pymes",
  },
  {
    numero: "12",
    titulo: "Asistencia a PYMES para cumplimiento de estándares",
    frase: "Crecer también requiere ordenar y demostrar.",
    parrafos: [
      "La empresa de Alberto recibe acompañamiento para revisar procesos, documentación y requisitos técnicos.",
      "Vero y Julián participan en el proceso y ayudan a incorporar lo aprendido dentro de la operación cotidiana.",
      "El cumplimiento de estándares deja de sentirse como un requisito externo y empieza a convertirse en una herramienta para mejorar la empresa.",
    ],
    imagen: "/imagenes/matriz/historias/12.jpg",
    componente: "calidad",
    eje: "pymes",
  },
  {
    numero: "13",
    titulo: "Identificar áreas de innovación",
    frase: "Innovar empieza por hacer buenas preguntas.",
    parrafos: [
      "Matías y Nicol se reúnen para revisar los desafíos que han encontrado en las empresas con las que trabajan.",
      "En lugar de comenzar buscando una tecnología, empiezan identificando problemas: qué recurso se está desperdiciando, qué proceso podría mejorar, qué información hace falta y qué solución todavía no existe.",
      "Así encuentran nuevas áreas donde investigar e innovar.",
    ],
    imagen: "/imagenes/matriz/historias/13.jpg",
    componente: "habilidades",
    eje: "innovacion",
  },
  {
    numero: "14",
    titulo: "Investigación aplicada en energías limpias",
    frase: "Una idea se convierte en algo que puede probarse.",
    parrafos: [
      "Matías y Nicol conectan una necesidad identificada en la industria con conocimiento técnico sobre energías limpias.",
      "Analizan datos, prueban alternativas y buscan determinar qué solución tiene sentido para la realidad productiva que están enfrentando.",
      "La investigación deja de quedarse únicamente en el conocimiento. Empieza a responder a un problema real.",
    ],
    imagen: "/imagenes/matriz/historias/14.jpg",
    componente: "energias",
    eje: "innovacion",
  },
  {
    numero: "15",
    titulo: "Recirculación de materiales",
    frase: "Y aquí finalmente todos vuelven a encontrarse.",
    parrafos: [
      "Vero aporta su experiencia en procesos. Julián analiza soluciones técnicas. Nicol conecta sostenibilidad y producción. Matías aporta herramientas de economía circular. Alberto conoce las necesidades reales de la empresa.",
      "Juntos identifican materiales que antes salían del proceso como residuos y estudian cómo pueden reutilizarse, recuperarse o convertirse en insumos para otra actividad.",
      "Aquí el cuadro deja de ser teoría: las capacidades de cada persona empiezan a funcionar como un sistema.",
    ],
    imagen: "/imagenes/matriz/historias/15.jpg",
    componente: "circular",
    eje: "innovacion",
  },
  {
    numero: "16",
    titulo: "Fortalecimiento de la infraestructura",
    frase: "La transformación deja capacidades instaladas.",
    parrafos: [
      "Después de recorrer este proceso, Nicol y Alberto inauguran una nueva capacidad dentro del ecosistema productivo.",
      "Puede ser nuevo equipamiento, mejores sistemas de control, herramientas digitales o capacidades técnicas que permiten producir, medir, verificar e innovar mejor.",
      "Pero lo importante no es solamente la infraestructura física. Detrás de ella están todas las conexiones construidas anteriormente: personas formadas, empresas fortalecidas, conocimiento, innovación y cooperación.",
    ],
    imagen: "/imagenes/matriz/historias/16.jpg",
    componente: "calidad",
    eje: "innovacion",
  },
];

/* ── Cierre de la experiencia ────────────────────────────────── */

export const cierre = {
  titulo: "Todos tomaron caminos diferentes.",
  parrafos: [
    "Vero y Julián llegaron a la industria desde una pasantía.",
    "Nicol encontró una oportunidad en sostenibilidad y energía.",
    "Matías convirtió sus capacidades en un emprendimiento.",
    "Alberto abrió su empresa al talento, la innovación y nuevas formas de producir.",
    "Con el tiempo, sus caminos volvieron a encontrarse. No porque todos hicieran lo mismo, sino porque compartían capacidades y una visión compatible sobre la industria que querían construir.",
    "Y esa es la lógica del Programa País. La transformación industrial ocurre cuando formación, empresas, sostenibilidad, innovación, calidad y cooperación dejan de trabajar por separado y empiezan a conectarse.",
  ],
  remate:
    "Una industria en armonía no significa que todos sigan el mismo camino. Significa que caminos diferentes pueden avanzar hacia una misma dirección.",
};

/* ── Utilidades ──────────────────────────────────────────────── */

export function historiaDe(componenteId: string, ejeId: string) {
  return historias.find((h) => h.componente === componenteId && h.eje === ejeId);
}
