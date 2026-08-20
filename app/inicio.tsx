"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProgramaPais, QuienesSomos } from "./components/contenido-ventanas";
import { PieDePagina } from "./components/pie";
import { PortadaVideo } from "./components/portada-video";
import {
  EnPreparacion,
  Espacio,
  Etiqueta,
  Foto,
  IconoExterno,
  IconoFlecha,
  Marca,
} from "./components/ui";
import { Carrusel } from "./components/carrusel";
import { Ventana } from "./components/ventana";
import { fotosInicio } from "./data/carrusel";
import { programaPais, rutaCooperacion } from "./data/programa-pais";
import { proyectos } from "./data/proyectos";
import {
  artesSeccion,
  masHerramientas,
  oportunidades,
  plataformas,
  publicosOportunidad,
  redes,
  registroInteres,
} from "./data/recursos";

type VentanaAbierta = "quienes-somos" | "programa-pais" | null;

export function Inicio() {
  const [ventana, setVentana] = useState<VentanaAbierta>(null);

  return (
    <>
      <Encabezado onConocerOnudi={() => setVentana("quienes-somos")} />

      <main id="inicio">
        <PortadaVideo titulo="Desarrollo industrial para una Costa Rica más competitiva, inclusiva y sostenible." />
        <Presentacion onConocerOnudi={() => setVentana("quienes-somos")} />

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

/* ── Hero ────────────────────────────────────────────────────── */

function Presentacion({ onConocerOnudi }: { onConocerOnudi: () => void }) {
  return (
    <section className="hero">
      <div className="hero__texto">
        <div className="hero__columna">
          <p className="hero__destacado">
            ONUDI es la agencia especializada de Naciones Unidas que promueve el desarrollo
            industrial inclusivo y sostenible, y su mandato contribuye de manera central al ODS 9:
            Industria, Innovación e Infraestructura.
          </p>
          <p className="hero__cuerpo">
            Trabajamos junto a instituciones públicas, sector privado, academia, comunidades y
            socios de cooperación para fortalecer capacidades, impulsar innovación y convertir
            desafíos productivos en soluciones concretas.
          </p>
          <button type="button" className="boton boton--azul" onClick={onConocerOnudi}>
            Conocé ONUDI
            <IconoFlecha />
          </button>
        </div>

        <Carrusel imagenes={fotosInicio} />
      </div>
    </section>
  );
}

/* ── Cabecera de sección, con imagen a la par ────────────────── */

function Cabecera({
  etiqueta,
  titulo,
  texto,
  imagen,
}: {
  etiqueta: string;
  titulo: string;
  texto: string;
  imagen?: string;
}) {
  return (
    <div className="cabecera nodo">
      <div className="cabecera__texto">
        <Etiqueta>{etiqueta}</Etiqueta>
        <h2>{titulo}</h2>
        <p>{texto}</p>
      </div>
      {imagen ? (
        <Foto src={imagen} alt="" proporcion="4 / 5" tamanos="(max-width: 900px) 100vw, 40vw" />
      ) : (
        <Espacio proporcion="4 / 5" nota={`Imagen · ${etiqueta}`} />
      )}
    </div>
  );
}

/* ── Programa País ───────────────────────────────────────────── */

function SeccionProgramaPais({ onAbrir }: { onAbrir: () => void }) {
  return (
    <section className="seccion" id="programa-pais">
      <div className="programa nodo">
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
        <Foto
          src={programaPais.imagen}
          alt="¿Cómo funciona el Programa País?"
          proporcion="4 / 5"
          tamanos="(max-width: 900px) 100vw, 40vw"
        />
      </div>
    </section>
  );
}

/* ── Franja celeste · Ruta de la cooperación ─────────────────── */

function FranjaRuta({ onAbrir }: { onAbrir: () => void }) {
  return (
    <section className="franja" aria-labelledby="titulo-ruta">
      <div className="franja__interior">
        <div className="franja__cabecera nodo">
          <Etiqueta>Ruta de la cooperación</Etiqueta>
          <h2 id="titulo-ruta" className="franja__titulo">
            Cómo una prioridad del país se convierte en un proyecto
          </h2>
        </div>

        <ol className="ruta">
          {rutaCooperacion.map((paso, indice) => (
            <li className="ruta__paso" key={paso.etiqueta}>
              <span className="ruta__icono">
                <Image src={paso.icono} alt="" width={160} height={160} />
              </span>
              <span className="ruta__indice">{String(indice + 1).padStart(2, "0")}</span>
              <h3>{paso.etiqueta}</h3>
              <p>{paso.pregunta}</p>
            </li>
          ))}
        </ol>

        <button type="button" className="boton boton--blanco" onClick={onAbrir}>
          Ver cómo funciona
          <IconoFlecha />
        </button>
      </div>
    </section>
  );
}

/* ── Proyectos ───────────────────────────────────────────────── */

function SeccionProyectos() {
  return (
    <section className="seccion" id="proyectos">
      <div className="seccion__cabecera nodo">
        <Etiqueta>Proyectos</Etiqueta>
        <h2>¿Y cómo se ve todo esto en la práctica?</h2>
        <p className="seccion__lead">
          A través de proyectos que conectan necesidades concretas con capacidades, cooperación y
          conocimiento técnico.
        </p>
      </div>

      <div className="rejilla">
        {proyectos.map((proyecto) => (
          <article className="tarjeta" key={proyecto.slug}>
            {proyecto.imagen ? (
              <Foto
                src={proyecto.imagen}
                alt={proyecto.nombre}
                proporcion="5 / 4"
                tamanos="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            ) : (
              <Espacio proporcion="5 / 4" nota={`Fotografía · ${proyecto.nombre}`} />
            )}
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

/* ── Plataformas ─────────────────────────────────────────────── */

function SeccionPlataformas() {
  return (
    <section className="seccion" id="plataformas">
      <Cabecera
        etiqueta="Plataformas"
        titulo="Herramientas para convertir conocimiento en acción."
        texto="Espacios digitales desarrollados o acompañados desde ONUDI Costa Rica para facilitar información, fortalecer capacidades y acercar soluciones."
        imagen={artesSeccion.plataformas}
      />

      <div className="rejilla">
        {plataformas.map((plataforma) => (
          <article className="tarjeta" key={plataforma.nombre}>
            {plataforma.imagen ? (
              <Foto
                src={plataforma.imagen}
                alt={plataforma.nombre}
                proporcion="5 / 4"
                tamanos="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            ) : (
              <Espacio proporcion="5 / 4" nota={`Imagen · ${plataforma.nombre}`} />
            )}
            <div className="tarjeta__cuerpo">
              <h3>{plataforma.nombre}</h3>
              <p className="tarjeta__resumen">{plataforma.texto}</p>
              <a
                className="tarjeta__enlace"
                href={plataforma.enlace}
                target="_blank"
                rel="noreferrer"
              >
                {plataforma.boton}
                <IconoExterno />
              </a>
            </div>
          </article>
        ))}

        <article className="tarjeta tarjeta--celeste">
          <div className="tarjeta__cuerpo">
            <h3>{masHerramientas.titulo}</h3>
            <p className="tarjeta__resumen">{masHerramientas.texto}</p>
            <a
              className="tarjeta__enlace"
              href={masHerramientas.enlace}
              target="_blank"
              rel="noreferrer"
            >
              {masHerramientas.boton}
              <IconoExterno />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ── Redes ───────────────────────────────────────────────────── */

function SeccionRedes() {
  return (
    <section className="seccion" id="redes">
      <Cabecera
        etiqueta="Redes"
        titulo="Conectar personas también genera capacidades."
        texto="Espacios que permiten compartir conocimiento, crear vínculos y acercar personas alrededor de desafíos comunes."
        imagen={artesSeccion.redes}
      />

      {redes.map((red) => (
        <div className="duo duo--invertido" key={red.nombre}>
          <div className="duo__texto">
            <h3>{red.nombre}</h3>
            <p>{red.texto}</p>
            <div className="duo__acciones">
              {red.enlaces.map((enlace) => {
                if (!enlace.url) {
                  return (
                    <span className="boton boton--pendiente" key={enlace.etiqueta}>
                      {enlace.etiqueta}
                      <em>enlace pendiente</em>
                    </span>
                  );
                }
                if (enlace.externo === false) {
                  return (
                    <Link className="boton boton--azul" key={enlace.etiqueta} href={enlace.url}>
                      {enlace.etiqueta}
                      <IconoFlecha />
                    </Link>
                  );
                }
                return (
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
                );
              })}
            </div>
          </div>
          {red.imagen ? (
            <Foto
              src={red.imagen}
              alt={red.nombre}
              proporcion="5 / 4"
              tamanos="(max-width: 900px) 100vw, 48vw"
            />
          ) : (
            <Espacio proporcion="5 / 4" nota={`Imagen · ${red.nombre}`} />
          )}
        </div>
      ))}
    </section>
  );
}

/* ── Oportunidades ───────────────────────────────────────────── */

function SeccionOportunidades() {
  return (
    <section className="seccion" id="oportunidades">
      <Cabecera
        etiqueta="Oportunidades"
        titulo="La cooperación también abre oportunidades."
        texto="Convocatorias, programas, formación, premios y oportunidades vinculadas con ONUDI que pueden resultar relevantes para personas, empresas, academia, instituciones y organizaciones en Costa Rica."
        imagen={artesSeccion.oportunidades}
      />

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

      <div className="interes">
        <div className="interes__texto">
          <h3>{registroInteres.titulo}</h3>
          <p>{registroInteres.texto}</p>
        </div>
        <a
          className="boton boton--azul"
          href={registroInteres.enlace}
          target="_blank"
          rel="noreferrer"
        >
          {registroInteres.boton}
          <IconoExterno />
        </a>
      </div>
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
