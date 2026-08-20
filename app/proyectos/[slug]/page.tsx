import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProyectoDetalle } from "../../components/proyecto-detalle";
import { getProyectoPublicado } from "../../lib/proyectos-api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await getProyectoPublicado(slug);
  if (!proyecto) return { title: "Proyecto no encontrado | ONUDI Costa Rica" };
  const title = `${proyecto.nombre} | ONUDI Costa Rica`;
  const imageSource = proyecto.banner ?? proyecto.imagen;
  const image = imageSource
    ? new URL(imageSource, "https://onudi-cr.vercel.app").toString()
    : undefined;
  return {
    title,
    description: proyecto.resumen,
    openGraph: {
      title,
      description: proyecto.resumen,
      type: "article",
      images: image
        ? [{ url: image, alt: proyecto.bannerAlt ?? proyecto.imagenAlt ?? proyecto.nombre }]
        : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: proyecto.resumen,
      images: image ? [image] : [],
    },
  };
}

export default async function ProyectoPage({ params }: PageProps) {
  const { slug } = await params;
  const proyecto = await getProyectoPublicado(slug);
  if (!proyecto) notFound();
  return <ProyectoDetalle proyecto={proyecto} />;
}
