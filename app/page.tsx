import { Inicio } from "./inicio";
import { getProyectosPublicados } from "./lib/proyectos-api";

export default async function Home() {
  const proyectos = await getProyectosPublicados();
  const resumenes = proyectos.map(
    ({ slug, nombre, resumen, imagen, imagenAlt, tags, estado }) => ({
      slug,
      nombre,
      resumen,
      imagen,
      imagenAlt,
      tags,
      estado,
    }),
  );
  return <Inicio proyectos={resumenes} />;
}
