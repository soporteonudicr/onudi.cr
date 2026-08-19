import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectTemplate } from "../../components/project-template";
import { getProject, projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: `${project.shortTitle} | ONUDI Costa Rica`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <ProjectTemplate project={project} />;
}
