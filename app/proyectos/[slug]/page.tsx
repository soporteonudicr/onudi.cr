import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProyectoDetalle } from "../../components/proyecto-detalle";
import { getProyecto, proyectos } from "../../data/proyectos";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return proyectos.map((proyecto) => ({ slug: proyecto.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = getProyecto(slug);
  if (!proyecto) return { title: "Proyecto no encontrado | ONUDI Costa Rica" };
  return {
    title: `${proyecto.nombre} | ONUDI Costa Rica`,
    description: proyecto.resumen,
  };
}

export default async function ProyectoPage({ params }: PageProps) {
  const { slug } = await params;
  const proyecto = getProyecto(slug);
  if (!proyecto) notFound();
  return <ProyectoDetalle proyecto={proyecto} />;
}
