import type { Metadata } from "next";
import Link from "next/link";
import { PieDePagina } from "../../components/pie";
import {
  EnPreparacion,
  Espacio,
  Etiqueta,
  Foto,
  IconoExterno,
  IconoFlechaAtras,
  Marca,
} from "../../components/ui";
import { bloques, cierre, lineas, red, sumarse } from "../../data/mujeres-industria";

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
        <div className="red-mujeres__portada">
          <Foto
            src={red.portada}
            alt={red.nombre}
            proporcion="5 / 4"
            encaje="contain"
            tamanos="100vw"
            prioridad
          />
        </div>

        <header className="red-mujeres__cabecera">
          <Etiqueta>Red</Etiqueta>
          <h1>{red.nombre}</h1>
          <p>
            Un espacio para conectar y visibilizar la participación de mujeres en los sectores
            productivos y en las conversaciones sobre el futuro de la industria.
          </p>
        </header>

        {bloques.map((bloque) => (
          <section
            className={`duo${bloque.lado === "izquierda" ? " duo--invertido" : ""} red-mujeres__bloque`}
            key={bloque.id}
          >
            <div className="duo__texto">
              {bloque.etiqueta && <Etiqueta>{bloque.etiqueta}</Etiqueta>}
              <h2>{bloque.titulo}</h2>
              {bloque.texto && <p>{bloque.texto}</p>}
            </div>
            <Foto
              src={bloque.imagen}
              alt=""
              proporcion="5 / 4"
              encaje="contain"
              tamanos="(max-width: 900px) 100vw, 48vw"
            />
          </section>
        ))}

        <section className="red-mujeres__lineas">
          <Etiqueta>Qué hace la red</Etiqueta>
          <h2>Cuatro formas de participar</h2>
          <div className="rejilla rejilla--dos">
            {lineas.map((linea) => (
              <article className="tarjeta" key={linea.titulo}>
                {linea.imagen ? (
                  <Foto
                    src={linea.imagen}
                    alt=""
                    proporcion="5 / 4"
                    tamanos="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                ) : (
                  <Espacio proporcion="5 / 4" nota={`Fotografía · ${linea.titulo}`} />
                )}
                <div className="tarjeta__cuerpo">
                  <h3>{linea.titulo}</h3>
                  <p className="tarjeta__resumen">{linea.texto}</p>
                  {!linea.imagen && <EnPreparacion>Fotografía pendiente</EnPreparacion>}
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
          <Foto
            src={sumarse.imagen}
            alt=""
            proporcion="5 / 4"
            encaje="contain"
            tamanos="(max-width: 900px) 100vw, 48vw"
          />
        </section>

        <section className="duo red-mujeres__bloque">
          <div className="duo__texto">
            <h2>{cierre.titulo}</h2>
            <p>{cierre.texto}</p>
          </div>
          <Foto
            src={cierre.imagen}
            alt=""
            proporcion="5 / 4"
            encaje="contain"
            tamanos="(max-width: 900px) 100vw, 48vw"
          />
        </section>
      </main>

      <PieDePagina />
    </>
  );
}
