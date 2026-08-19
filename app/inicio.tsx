"use client";

import Link from "next/link";
import { useState } from "react";
import { ProgramaPais, QuienesSomos } from "./components/contenido-ventanas";
import {
  BotonEnlace,
  Espacio,
  Etiqueta,
  EnPreparacion,
  IconoExterno,
  IconoFlecha,
  Marca,
} from "./components/ui";
import { PieDePagina } from "./components/pie";
import { Ventana } from "./components/ventana";
import { actoresRuta, programaPais, rutaCooperacion } from "./data/programa-pais";
import { proyectos } from "./data/proyectos";
import { oportunidades, plataformas, publicosOportunidad, redes } from "./data/recursos";

type VentanaAbierta = "quienes-somos" | "programa-pais" | null;

export function Inicio() {
  const [ventana, setVentana] = useState<VentanaAbierta>(null);

  return (
    <>
      <Encabezado onConocerOnudi={() => setVentana("quienes-somos")} />

      <main id="inicio">
        <Hero onConocerOnudi={() => setVentana("quienes-somos")} />

        <div className="hilo">
          <SeccionProgramaPais onAbrir={() => setVentana("programa-pais")} />
          <FranjaRuta onAbrir={() => setVentana("programa-pais")} />
          <SeccionProyectos />
          <SeccionPlataformas />
          <SeccionRedes />
          <SeccionOportunidades />
        </div>

        <Cierre />
      </main>

      <PieDePagina />

      <Ventana
        abierta={ventana === "quienes-somos"}
        onCerrar={() => setVentana(null)}
        titulo="¿Quiénes somos?"
      >
        <QuienesSomos onVerProgramaPais={() => setVentana("programa-pais")} />
      </Ventana>

      <Ventana
        abierta={ventana === "programa-pais"}
        onCerrar={() => setVentana(null)}
        titulo="Programa País ONUDI Costa Rica 2024-2028"
      >
        <ProgramaPais />
      </Ventana>
    </>
  );
}

/* ── Encabezado ──────────────────────────────────────────────── */

function Encabezado({ onConocerOnudi }: { onConocerOnudi: () => void }) {
  return (
    <header className="encabezado">
      <Link href="/" className="encabezado__marca" aria-label="ONUDI Costa Rica · Inicio">
        <Marca alto={34} />
        <span className="encabezado__pais">Costa Rica</span>
      </Link>
      <nav className="encabezado__nav" aria-label="Navegación principal">
        <button type="button" onClick={onConocerOnudi}>
          Quiénes somos
        </button>
        <a href="#proyectos">Proyectos</a>
        <a href="#plataformas">Plataformas</a>
        <a href="#redes">Redes</a>
        <a href="#oportunidades">Oportunidades</a>
      </nav>
    </header>
  );
}

/* ── 01 · Hero ───────────────────────────────────────────────── */

function Hero({ onConocerOnudi }: { onConocerOnudi: () => void }) {
  return (
    <section className="hero">
      <div className="hero__imagen">
        <Espacio
          proporcion="21 / 9"
          minAlto={340}
          nota="Fotografía de portada · industria, formación, territorio o personas · horizontal, mínimo 2400 px"
        />
      </div>

      <div className="hero__texto">
        <h1>
          Desarrollo industrial para una Costa Rica más competitiva, inclusiva y sostenible.
        </h1>
        <p className="hero__destacado">
          ONUDI es la agencia especializada de Naciones Unidas que promueve el desarrollo
          industrial inclusivo y sostenible, y su mandato contribuye de manera central al ODS 9:
          Industria, Innovación e Infraestructura.
        </p>
        <p className="hero__cuerpo">
          Trabajamos junto a instituciones públicas, sector privado, academia, comunidades y socios
          de cooperación para fortalecer capacidades, impulsar innovación y convertir desafíos
          productivos en soluciones concretas.
        </p>
        <button type="button" className="boton boton--azul" onClick={onConocerOnudi}>
          Conocé ONUDI
          <IconoFlecha />
        </button>
      </div>
    </section>
  );
}

/* ── 02 · Programa País ──────────────────────────────────────── */

function SeccionProgramaPais({ onAbrir }: { onAbrir: () => void }) {
  return (
    <section className="seccion nodo" id="programa-pais">
      <div className="programa">
        <div className="programa__texto">
          <Etiqueta>Marco de cooperación</Etiqueta>
          <h2>{programaPais.titulo}</h2>
          <p className="programa__frase">{programaPais.fraseHome}</p>
          <p>{programaPais.textoHome}</p>
          <button type="button" className="boton boton--azul" onClick={onAbrir}>
            Conocer el Programa País
            <IconoFlecha />
          </button>
        </div>
        <Espacio
          proporcion="5 / 6"
          nota="Fotografía o composición · Costa Rica, personas y sectores productivos · vertical"
        />
      </div>
    </section>
  );
}

/* ── 03 · Franja celeste · Ruta de la cooperación ────────────── */

function FranjaRuta({ onAbrir }: { onAbrir: () => void }) {
  return (
    <section className="franja nodo" aria-labelledby="titulo-ruta">
      <div className="franja__interior">
        <Etiqueta>Ruta de la cooperación</Etiqueta>
        <h2 id="titulo-ruta" className="franja__titulo">
          Cómo una prioridad del país se convierte en un proyecto
        </h2>

        <ol className="ruta">
          {rutaCooperacion.map((paso, indice) => (
            <li className="ruta__paso" key={paso.etiqueta}>
              <span className="ruta__indice">{String(indice + 1).padStart(2, "0")}</span>
              <h3>{paso.etiqueta}</h3>
              <p>{paso.pregunta}</p>
            </li>
          ))}
        </ol>

        <div className="ruta__union" aria-hidden="true">
          <span />
        </div>

        <div className="actores">
          {actoresRuta.map((actor) => (
            <article className="actor" key={actor.etiqueta}>
              <h3>{actor.etiqueta}</h3>
              <p>{actor.pregunta}</p>
            </article>
          ))}
        </div>

        <button type="button" className="boton boton--blanco" onClick={onAbrir}>
          Ver cómo funciona
          <IconoFlecha />
        </button>
      </div>
    </section>
  );
}

/* ── 04 · Proyectos ──────────────────────────────────────────── */

function SeccionProyectos() {
  return (
    <section className="seccion nodo" id="proyectos">
      <div className="seccion__cabecera">
        <Etiqueta>Proyectos</Etiqueta>
        <h2>¿Y cómo se ve todo esto en la práctica?</h2>
        <p className="seccion__lead">
          A través de proyectos que conectan necesidades concretas con capacidades, cooperación y
          conocimiento técnico.
        </p>
      </div>

      <div className="proyectos">
        {proyectos.map((proyecto) => (
          <article className="tarjeta" key={proyecto.slug}>
            <Espacio proporcion="3 / 2" nota={`Fotografía · ${proyecto.nombre}`} />
            <div className="tarjeta__cuerpo">
              <h3>{proyecto.nombre}</h3>
              {proyecto.estado === "en-preparacion" ? (
                <EnPreparacion />
              ) : (
                <>
                  <p className="tarjeta__resumen">{proyecto.resumen}</p>
                  <ul className="tarjeta__tags">
                    {proyecto.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </>
              )}
              {proyecto.estado === "publicado" && (
                <Link className="tarjeta__enlace" href={`/proyectos/${proyecto.slug}`}>
                  Conocer proyecto
                  <IconoFlecha />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── 05 · Plataformas, redes y oportunidades ─────────────────── */

function SeccionPlataformas() {
  return (
    <section className="seccion nodo" id="plataformas">
      <div className="seccion__cabecera">
        <Etiqueta>Plataformas</Etiqueta>
        <h2>Herramientas para convertir conocimiento en acción.</h2>
        <p className="seccion__lead">
          Espacios digitales desarrollados o acompañados desde ONUDI Costa Rica para facilitar
          información, fortalecer capacidades y acercar soluciones.
        </p>
      </div>

      <div className="fichas">
        {plataformas.map((plataforma) => (
          <article className="ficha" key={plataforma.nombre}>
            <Espacio proporcion="16 / 9" nota={`Imagen · ${plataforma.nombre}`} />
            <div className="ficha__cuerpo">
              <h3>{plataforma.nombre}</h3>
              <p>{plataforma.texto}</p>
              <BotonEnlace href={plataforma.enlace} tono="linea" externo>
                {plataforma.boton}
              </BotonEnlace>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SeccionRedes() {
  return (
    <section className="seccion nodo" id="redes">
      <div className="seccion__cabecera">
        <Etiqueta>Redes</Etiqueta>
        <h2>Conectar personas también genera capacidades.</h2>
        <p className="seccion__lead">
          Espacios que permiten compartir conocimiento, crear vínculos y acercar personas alrededor
          de desafíos comunes.
        </p>
      </div>

      <div className="fichas">
        {redes.map((red) => (
          <article className="ficha" key={red.nombre}>
            <Espacio proporcion="16 / 9" nota={`Imagen · ${red.nombre}`} />
            <div className="ficha__cuerpo">
              <h3>{red.nombre}</h3>
              <p>{red.texto}</p>
              <div className="ficha__acciones">
                {red.enlaces.map((enlace) =>
                  enlace.url ? (
                    <a
                      className="boton boton--linea"
                      key={enlace.etiqueta}
                      href={enlace.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {enlace.etiqueta}
                      <IconoExterno />
                    </a>
                  ) : (
                    <span className="boton boton--pendiente" key={enlace.etiqueta}>
                      {enlace.etiqueta}
                      <em>enlace pendiente</em>
                    </span>
                  ),
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SeccionOportunidades() {
  return (
    <section className="seccion nodo" id="oportunidades">
      <div className="seccion__cabecera">
        <Etiqueta>Oportunidades</Etiqueta>
        <h2>La cooperación también abre oportunidades.</h2>
        <p className="seccion__lead">
          Convocatorias, programas, formación, premios y oportunidades vinculadas con ONUDI que
          pueden resultar relevantes para personas, empresas, academia, instituciones y
          organizaciones en Costa Rica.
        </p>
      </div>

      <ul className="filtros" aria-label="Filtros de oportunidades">
        {publicosOportunidad.map((publico) => (
          <li key={publico}>
            <button type="button" disabled>
              {publico}
            </button>
          </li>
        ))}
      </ul>

      {oportunidades.length === 0 ? (
        <div className="vacio">
          <h3>Todavía no hay oportunidades publicadas.</h3>
          <p>
            La sección ya está lista para recibirlas. Cada oportunidad mostrará para quién es, qué
            ofrece, la fecha límite, quién convoca y el enlace a la fuente oficial.
          </p>
        </div>
      ) : (
        <div className="oportunidades">
          {oportunidades.map((oportunidad) => (
            <article className="oportunidad" key={oportunidad.nombre}>
              <h3>{oportunidad.nombre}</h3>
              <dl>
                <dt>¿Para quién es?</dt>
                <dd>{oportunidad.publicos.join(" · ")}</dd>
                <dt>¿Qué ofrece?</dt>
                <dd>{oportunidad.ofrece}</dd>
                <dt>Fecha límite</dt>
                <dd>{oportunidad.fechaLimite}</dd>
                <dt>Quién convoca</dt>
                <dd>{oportunidad.convoca}</dd>
              </dl>
              <a href={oportunidad.sitio} target="_blank" rel="noreferrer">
                Ir al sitio oficial
                <IconoExterno />
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Cierre ──────────────────────────────────────────────────── */

function Cierre() {
  return (
    <section className="cierre">
      <div className="cierre__interior">
        <h2>Distintos proyectos. Una misma dirección.</h2>
        <p>
          Formación, energía, economía circular, calidad, innovación, tecnología y cooperación
          pueden parecer caminos diferentes. En ONUDI Costa Rica se conectan alrededor de un mismo
          propósito:
        </p>
        <p className="cierre__proposito">
          fortalecer capacidades para que los sectores productivos puedan crecer de manera más
          competitiva, inclusiva y sostenible.
        </p>
        <div className="cierre__acciones">
          <a className="boton boton--blanco" href="#proyectos">
            Explorá nuestros proyectos
            <IconoFlecha />
          </a>
          <a className="boton boton--contorno" href="#plataformas">
            Conocé nuestras plataformas
            <IconoFlecha />
          </a>
          <a className="boton boton--contorno" href="#oportunidades">
            Encontrá oportunidades
            <IconoFlecha />
          </a>
        </div>
      </div>
    </section>
  );
}
