"use client";

import Image from "next/image";
import { dondeSeRefleja, ods9, quienesSomos } from "../data/programa-pais";
import { Matriz } from "./matriz";
import { Etiqueta, IconoFlecha } from "./ui";

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
        <div className="ods9__cubo">
          <Image
            src="/imagenes/ods9-cubo.png"
            alt="Objetivo de Desarrollo Sostenible 9: Industria, innovación e infraestructura"
            width={620}
            height={497}
          />
        </div>
      </section>

      <section className="doc__bloque">
        <h2 className="doc__titulo">{dondeSeRefleja.titulo}</h2>
        <div className="refleja">
          {dondeSeRefleja.entradas.map((entrada) => (
            <article className="refleja__item" key={entrada.titulo}>
              <Image src={entrada.icono} alt="" width={150} height={150} />
              <div>
                <h3>{entrada.titulo}</h3>
                <p>{entrada.texto}</p>
              </div>
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
  return <Matriz />;
}
