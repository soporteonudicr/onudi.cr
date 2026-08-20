import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlInicio } from "../../components/al-inicio";
import { PieDePagina } from "../../components/pie";
import { Etiqueta, Foto, IconoExterno, IconoFlechaAtras, Marca } from "../../components/ui";
import { bloques, lineas, red, sumarse } from "../../data/mujeres-industria";

export const metadata: Metadata = {
  title: "Red de Mujeres en la Industria | ONUDI Costa Rica",
  description:
    "Un espacio para conectar y visibilizar la participación de mujeres en los sectores productivos y en las conversaciones sobre el futuro de la industria.",
};

export default function RedMujeres() {
  const [primero, ...resto] = bloques;

  return (
    <>
      <AlInicio />

      <header className="encabezado">
        <Link href="/" className="encabezado__marca" aria-label="ONUDI Costa Rica · Inicio">
          <Marca alto={34} />
          <span className="encabezado__pais">Costa Rica</span>
        </Link>
        <Link href="/#redes" className="encabezado__volver">
          <IconoFlechaAtras />
          Todas las redes
        </Link>
      </header>

      <main className="red-mujeres">
        {/* La cabecera comparte fila con la imagen del primer bloque; el
            texto de ese bloque baja completo, a todo el ancho. */}
        <header className="red-mujeres__intro">
          <div className="red-mujeres__intro-texto">
            <Etiqueta>Red</Etiqueta>
            <h1>{red.nombre}</h1>
            <p>
              Un espacio para conectar y visibilizar la participación de mujeres en los sectores
              productivos y en las conversaciones sobre el futuro de la industria.
            </p>
          </div>
          <Image
            src={primero.imagen}
            alt=""
            width={1200}
            height={929}
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </header>

        <section className="red-mujeres__declaracion">
          <h2>{primero.titulo}</h2>
          {primero.texto && <p>{primero.texto}</p>}
        </section>

        {resto.map((bloque) => {
          const texto = (
            <div className="red-mujeres__texto">
              {bloque.etiqueta && <Etiqueta>{bloque.etiqueta}</Etiqueta>}
              <h2>{bloque.titulo}</h2>
              {bloque.texto && <p>{bloque.texto}</p>}
            </div>
          );

          const imagen = (
            <Image
              src={bloque.imagen}
              alt=""
              width={1200}
              height={960}
              sizes={bloque.disposicion === "apilado" ? "100vw" : "(max-width: 900px) 100vw, 55vw"}
            />
          );

          if (bloque.disposicion === "apilado") {
            return (
              <section className="red-mujeres__bloque red-mujeres__bloque--apilado" key={bloque.id}>
                {texto}
                {imagen}
              </section>
            );
          }

          return (
            <section
              className={`red-mujeres__bloque red-mujeres__bloque--${bloque.disposicion}`}
              key={bloque.id}
            >
              {texto}
              {imagen}
            </section>
          );
        })}

        <section className="red-mujeres__lineas">
          <Etiqueta>Qué hace la red</Etiqueta>
          <h2>Cuatro formas de participar</h2>
          <div className="rejilla rejilla--dos">
            {lineas.map((linea) => (
              <article className="tarjeta" key={linea.titulo}>
                <Foto
                  src={linea.imagen ?? ""}
                  alt=""
                  proporcion="5 / 4"
                  tamanos="(max-width: 900px) 100vw, 46vw"
                />
                <div className="tarjeta__cuerpo">
                  <h3>{linea.titulo}</h3>
                  <p className="tarjeta__resumen">{linea.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sumarse">
          <div className="sumarse__texto">
            <Etiqueta tono="blanco">{sumarse.titulo}</Etiqueta>
            <h2>{sumarse.texto}</h2>
            <p>{sumarse.detalle}</p>
            <a className="boton boton--blanco" href={red.canal} target="_blank" rel="noreferrer">
              {sumarse.boton}
              <IconoExterno />
            </a>
          </div>
          <Image
            src={sumarse.imagen}
            alt=""
            width={1000}
            height={961}
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </section>
      </main>

      <PieDePagina />
    </>
  );
}
