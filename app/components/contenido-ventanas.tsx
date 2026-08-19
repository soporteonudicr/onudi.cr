"use client";

import { useState } from "react";
import {
  componentes,
  conexionesDisponibles,
  dondeSeRefleja,
  ejes,
  estructuraRuta,
  notaComponentes,
  notaEjes,
  ods9,
  personajes,
  programaPais,
  quienesSomos,
} from "../data/programa-pais";
import { Espacio, Etiqueta, EnPreparacion, IconoFlecha } from "./ui";

/* ── Ventana · ¿Quiénes somos? ───────────────────────────────── */

export function QuienesSomos({ onVerProgramaPais }: { onVerProgramaPais: () => void }) {
  return (
    <article className="doc">
      <header className="doc__portada">
        <Etiqueta>Quiénes somos</Etiqueta>
        <h1>{quienesSomos.titulo}</h1>
        {quienesSomos.texto.map((parrafo) => (
          <p className="doc__lead" key={parrafo}>
            {parrafo}
          </p>
        ))}
      </header>

      <section className="ods9">
        <div className="ods9__texto">
          <span className="ods9__numero">{ods9.etiqueta}</span>
          <h2>{ods9.titulo}</h2>
          {ods9.texto.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>
        <Espacio
          proporcion="4 / 3"
          tono="sobre-azul"
          nota="Fotografía · industria, innovación o infraestructura en Costa Rica"
        />
      </section>

      <section className="doc__bloque">
        <h2 className="doc__titulo">{dondeSeRefleja.titulo}</h2>
        <div className="refleja">
          {dondeSeRefleja.entradas.map((entrada) => (
            <article className="refleja__item" key={entrada.titulo}>
              <h3>{entrada.titulo}</h3>
              <p>{entrada.texto}</p>
            </article>
          ))}
        </div>
        <button type="button" className="boton boton--azul" onClick={onVerProgramaPais}>
          Conocé el Programa País
          <IconoFlecha />
        </button>
      </section>
    </article>
  );
}

/* ── Ventana · Programa País ─────────────────────────────────── */

export function ProgramaPais() {
  return (
    <article className="doc">
      <header className="doc__portada">
        <Etiqueta>Programa País</Etiqueta>
        <h1>{programaPais.titulo}</h1>
        <p className="doc__subtitulo">{programaPais.subtitulo}</p>
        {programaPais.texto.map((parrafo) => (
          <p className="doc__lead" key={parrafo}>
            {parrafo}
          </p>
        ))}
      </header>

      <section className="doc__bloque">
        <Etiqueta>Cuatro componentes</Etiqueta>
        <h2 className="doc__titulo">En qué trabaja el programa</h2>
        <div className="componentes">
          {componentes.map((componente) => (
            <article className="componente" key={componente.numero}>
              <span className="componente__numero">{componente.numero}</span>
              <div>
                <h3>{componente.titulo}</h3>
                <p className="componente__frase">{componente.frase}</p>
                <p>{componente.texto}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="doc__nota">{notaComponentes}</p>
      </section>

      <section className="doc__bloque">
        <Etiqueta>Ejes transversales</Etiqueta>
        <h2 className="doc__titulo">Cuatro temas atraviesan las distintas rutas</h2>
        <div className="ejes">
          {ejes.map((eje) => (
            <article className="eje" key={eje.titulo}>
              <h3>{eje.titulo}</h3>
              <p>{eje.texto}</p>
            </article>
          ))}
        </div>
        <p className="doc__nota">{notaEjes}</p>
      </section>

      <RutasPersonajes />
    </article>
  );
}

/* ── Rutas del Programa País ─────────────────────────────────── */

function RutasPersonajes() {
  const [activo, setActivo] = useState<string | null>(null);
  const personaje = personajes.find((item) => item.id === activo);

  return (
    <section className="doc__bloque rutas">
      <Etiqueta>Rutas del Programa País</Etiqueta>
      <h2 className="doc__titulo">Seguí una ruta</h2>
      <p className="doc__lead">
        Elegí una persona y descubrí cómo una necesidad concreta puede conectar diferentes
        componentes y ejes del Programa País.
      </p>

      <div className="rutas__personajes">
        {personajes.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`personaje ${activo === item.id ? "personaje--activo" : ""}`}
            onClick={() => setActivo(activo === item.id ? null : item.id)}
            aria-pressed={activo === item.id}
          >
            <span className="personaje__retrato">
              <Espacio proporcion="1 / 1" nota={`Retrato de ${item.nombre}`} />
            </span>
            <span className="personaje__nombre">{item.nombre}</span>
          </button>
        ))}
      </div>

      {personaje && (
        <div className="ruta-detalle">
          <h3>La ruta de {personaje.nombre}</h3>
          <EnPreparacion>
            La historia de {personaje.nombre} se incorporará con los textos narrativos aprobados.
          </EnPreparacion>
          <ol className="ruta-detalle__pasos">
            {estructuraRuta.map((paso, indice) => (
              <li key={paso}>
                <span className="ruta-detalle__indice">{String(indice + 1).padStart(2, "0")}</span>
                <span className="ruta-detalle__paso">{paso}</span>
              </li>
            ))}
          </ol>
          <details className="ruta-detalle__conexiones">
            <summary>Conexiones disponibles en la matriz</summary>
            <ul>
              {conexionesDisponibles.map((conexion) => (
                <li key={conexion}>{conexion}</li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </section>
  );
}
