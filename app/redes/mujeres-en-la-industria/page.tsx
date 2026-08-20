import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PieDePagina } from "../../components/pie";
import { Etiqueta, Foto, IconoExterno, IconoFlechaAtras, Marca } from "../../components/ui";
import { bloques, lineas, red, sumarse } from "../../data/mujeres-industria";

export const metadata: Metadata = {
  title: "Red de Mujeres en la Industria | ONUDI Costa Rica",
  description:
    "Un espacio para conectar y visibilizar la participación de mujeres en los sectores productivos y en las conversaciones sobre el futuro de la industria.",
};

export default function RedMujeres() {
  return (
    <>
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
        <header className="red-mujeres__cabecera">
          <Etiqueta>Red</Etiqueta>
          <h1>{red.nombre}</h1>
          <p>
            Un espacio para conectar y visibilizar la participación de mujeres en los sectores
            productivos y en las conversaciones sobre el futuro de la industria.
          </p>
        </header>

        {bloques.map((bloque, indice) => {
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
              priority={indice === 0}
              sizes={bloque.disposicion === "apilado" ? "100vw" : "(max-width: 900px) 100vw, 55vw"}
            />
          );

          if (bloque.disposicion === "apilado") {
            return (
              <section className="red-mujeres__bloque red-mujeres__bloque--apilado" key={bloque.id}>
                {imagen}
                {texto}
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
