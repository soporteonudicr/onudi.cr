import {
  getProyecto as getProyectoLocal,
  proyectos as proyectosLocales,
  type Proyecto,
} from "../data/proyectos";

type ProyectoCrm = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  coverUrl: string;
  coverAlt: string;
  tags: string[];
  country: string;
  period: string;
  sdgs: number[];
  challengeTitle: string;
  challengeBody: string;
  actionsIntro: string;
  actions: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  actionGallery: Array<{
    id: string;
    url: string;
    alt: string;
    caption: string;
  }>;
  processTitle: string;
  processDescription: string;
  processDiagramUrl: string;
  processDiagramAlt: string;
  processSteps: Array<{ id: string; title: string; description: string }>;
  importanceItems: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  resources: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    url: string;
  }>;
  governance: Array<{
    id: string;
    role: string;
    name: string;
    acronym: string;
    description: string;
    logoUrl: string;
    logoAlt: string;
    websiteUrl: string;
    socialUrl: string;
  }>;
};

const CRM_URL = (
  process.env.ONUDI_CRM_URL ?? "https://onudi-eventos-crm.vercel.app"
).replace(/\/+$/, "");

class RespuestaCrmError extends Error {
  constructor(readonly status: number) {
    super(`El CRM respondió ${status}.`);
  }
}

function parrafos(texto: string) {
  return texto
    .split(/\n\s*\n/g)
    .map((parrafo) => parrafo.trim())
    .filter(Boolean);
}

function convertirProyecto(proyecto: ProyectoCrm): Proyecto {
  const tieneContenido = Boolean(
    proyecto.challengeTitle ||
      proyecto.challengeBody ||
      proyecto.actionsIntro ||
      proyecto.actions.length ||
      proyecto.processSteps.length ||
      proyecto.processDiagramUrl ||
      proyecto.importanceItems.length,
  );

  return {
    slug: proyecto.slug,
    nombre: proyecto.name,
    proposito: proyecto.subtitle || undefined,
    resumen: proyecto.subtitle,
    imagen: proyecto.coverUrl || undefined,
    imagenAlt: proyecto.coverAlt || proyecto.name,
    banner: proyecto.coverUrl || undefined,
    bannerAlt: proyecto.coverAlt || proyecto.name,
    tags: proyecto.tags,
    estado: tieneContenido ? "publicado" : "en-preparacion",
    referencia: {
      pais: proyecto.country || undefined,
      periodo: proyecto.period || undefined,
      ods: proyecto.sdgs,
    },
    desafio:
      proyecto.challengeTitle || proyecto.challengeBody
        ? {
            titulo: proyecto.challengeTitle || "El desafío",
            parrafos: parrafos(proyecto.challengeBody),
          }
        : undefined,
    respuesta:
      proyecto.actionsIntro || proyecto.actions.length || proyecto.actionGallery.length
        ? {
            intro: proyecto.actionsIntro || undefined,
            acciones: proyecto.actions.map((accion) => ({
              verbo: accion.title,
              texto: accion.description,
              imagen: accion.imageUrl || undefined,
              imagenAlt: accion.imageAlt || undefined,
            })),
            galeria: proyecto.actionGallery.map((foto) => ({
              id: foto.id,
              url: foto.url,
              alt: foto.alt,
              pie: foto.caption || undefined,
            })),
          }
        : undefined,
    funcionamiento:
      proyecto.processTitle ||
      proyecto.processDescription ||
      proyecto.processDiagramUrl ||
      proyecto.processSteps.length
        ? {
            titulo: proyecto.processTitle || undefined,
            intro: proyecto.processDescription || undefined,
            forma: proyecto.slug === "construccion-circular" ? "circular" : "lineal",
            pasos: proyecto.processSteps.map((paso) => ({
              titulo: paso.title,
              texto: paso.description || undefined,
            })),
            diagrama: proyecto.processDiagramUrl || undefined,
            diagramaAlt: proyecto.processDiagramAlt || undefined,
          }
        : undefined,
    importa: proyecto.importanceItems.map((motivo) => ({
      titulo: motivo.title,
      texto: motivo.description || undefined,
      imagen: motivo.imageUrl || undefined,
      imagenAlt: motivo.imageAlt || undefined,
    })),
    recursos: proyecto.resources.map((recurso) => ({
      id: recurso.id,
      tipo: recurso.type,
      titulo: recurso.title,
      texto: recurso.description || undefined,
      imagen: recurso.imageUrl || undefined,
      imagenAlt: recurso.imageAlt || undefined,
      url: recurso.url,
    })),
    gobernanza:
      proyecto.governance.length > 0
        ? {
            actores: proyecto.governance.map((actor) => ({
              nombre: actor.name,
              sigla: actor.acronym || undefined,
              rol: actor.description || actor.role,
              logo: actor.logoUrl || undefined,
              logoAlt: actor.logoAlt || undefined,
              sitio: actor.websiteUrl || undefined,
              redes: actor.socialUrl || undefined,
            })),
          }
        : undefined,
  };
}

async function solicitar<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${CRM_URL}${ruta}`, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });
  if (!respuesta.ok) {
    throw new RespuestaCrmError(respuesta.status);
  }
  return (await respuesta.json()) as T;
}

export async function getProyectosPublicados() {
  try {
    const datos = await solicitar<{ projects: ProyectoCrm[] }>("/api/website/projects");
    const publicados = Array.isArray(datos.projects)
      ? datos.projects.map(convertirProyecto)
      : [];
    const porSlug = new Map(publicados.map((proyecto) => [proyecto.slug, proyecto]));
    const migrados = proyectosLocales.map(
      (proyecto) => porSlug.get(proyecto.slug) ?? proyecto,
    );
    const nuevos = publicados.filter(
      (proyecto) => !proyectosLocales.some((local) => local.slug === proyecto.slug),
    );
    return [...migrados, ...nuevos];
  } catch (error) {
    console.error("No fue posible cargar los proyectos publicados del CRM", error);
    return proyectosLocales;
  }
}

export async function getProyectoPublicado(slug: string) {
  try {
    const datos = await solicitar<{ project: ProyectoCrm }>(
      `/api/website/projects/${encodeURIComponent(slug)}`,
    );
    return datos.project ? convertirProyecto(datos.project) : undefined;
  } catch (error) {
    if (error instanceof RespuestaCrmError && error.status === 404) {
      return getProyectoLocal(slug);
    }
    console.error(`No fue posible cargar el proyecto ${slug} desde el CRM`, error);
    return getProyectoLocal(slug);
  }
}
