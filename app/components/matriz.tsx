"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  cierre,
  componentes,
  ejes,
  entrada,
  fotosComponentes,
  historiaDe,
  historias,
  personajes,
} from "../data/matriz";
import { Carrusel } from "./carrusel";
import { Etiqueta, IconoCerrar } from "./ui";

type Detalle =
  | { tipo: "componente"; id: string }
  | { tipo: "eje"; id: string }
  | { tipo: "personaje"; id: string }
  | { tipo: "historia"; numero: string }
  | null;

export function Matriz() {
  const [detalle, setDetalle] = useState<Detalle>(null);

  return (
    <article className="doc">
      <header className="doc__portada doc__portada--doble">
        <div>
          <Etiqueta>{entrada.etiqueta}</Etiqueta>
          <h1>{entrada.titulo}</h1>
          {entrada.parrafos.map((parrafo) => (
            <p className="doc__lead" key={parrafo}>
              {parrafo}
            </p>
          ))}
        </div>
        <Carrusel imagenes={fotosComponentes} intervalo={5000} />
      </header>

      <section className="doc__bloque">
        <Etiqueta>Los personajes</Etiqueta>
        <h2 className="doc__titulo">¿Quiénes recorren esta historia?</h2>
        <div className="elenco">
          {personajes.map((personaje) => (
            <button
              type="button"
              key={personaje.id}
              className="elenco__ficha"
              onClick={() => setDetalle({ tipo: "personaje", id: personaje.id })}
            >
              <Image src={personaje.imagen} alt="" width={310} height={248} />
              <span>{personaje.nombre}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="doc__bloque">
        <Etiqueta>El cuadro</Etiqueta>
        <h2 className="doc__titulo">Seguí una ruta</h2>
        <p className="doc__lead">{entrada.instruccion}</p>

        {/* Cuadro completo · pantallas anchas */}
        <div className="matriz" role="group" aria-label="Matriz del Programa País">
          <div className="matriz__esquina" aria-hidden="true">
            <span>Componentes</span>
            <span>Ejes transversales</span>
          </div>

          {componentes.map((componente) => (
            <button
              type="button"
              key={componente.id}
              className="matriz__cabeza"
              onClick={() => setDetalle({ tipo: "componente", id: componente.id })}
            >
              <Image src={componente.imagen} alt={componente.nombre} width={310} height={248} />
            </button>
          ))}

          {ejes.map((eje) => (
            <div className="matriz__fila" key={eje.id} style={{ display: "contents" }}>
              <button
                type="button"
                className="matriz__cabeza matriz__cabeza--eje"
                onClick={() => setDetalle({ tipo: "eje", id: eje.id })}
              >
                <Image src={eje.imagen} alt={eje.nombre} width={310} height={248} />
              </button>

              {componentes.map((componente) => {
                const historia = historiaDe(componente.id, eje.id);
                if (!historia) return <div key={componente.id} />;
                return (
                  <button
                    type="button"
                    key={componente.id}
                    className="celda"
                    onClick={() => setDetalle({ tipo: "historia", numero: historia.numero })}
                  >
                    <Image src={historia.imagen} alt="" width={340} height={272} />
                    <span className="celda__pie">
                      <span className="celda__numero">{historia.numero}</span>
                      <span className="celda__titulo">{historia.titulo}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mismo contenido, agrupado por eje · pantallas angostas */}
        <div className="matriz-lista">
          <div className="matriz-lista__componentes">
            <h3>Los cuatro componentes</h3>
            <div>
              {componentes.map((componente) => (
                <button
                  type="button"
                  key={componente.id}
                  onClick={() => setDetalle({ tipo: "componente", id: componente.id })}
                >
                  <Image src={componente.imagen} alt={componente.nombre} width={310} height={248} />
                </button>
              ))}
            </div>
          </div>

          {ejes.map((eje) => (
            <div className="matriz-lista__grupo" key={eje.id}>
              <button
                type="button"
                className="matriz-lista__eje"
                onClick={() => setDetalle({ tipo: "eje", id: eje.id })}
              >
                <Image src={eje.imagen} alt={eje.nombre} width={310} height={248} />
              </button>
              <div className="matriz-lista__escenas">
                {historias
                  .filter((historia) => historia.eje === eje.id)
                  .map((historia) => (
                    <button
                      type="button"
                      key={historia.numero}
                      className="celda"
                      onClick={() => setDetalle({ tipo: "historia", numero: historia.numero })}
                    >
                      <Image src={historia.imagen} alt="" width={340} height={272} />
                      <span className="celda__pie">
                        <span className="celda__numero">{historia.numero}</span>
                        <span className="celda__titulo">{historia.titulo}</span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cierre-matriz">
        <div className="cierre-matriz__interior">
          <div className="cierre-matriz__columnas">
            <div>
              <Etiqueta>Cómo termina</Etiqueta>
              <h2>{cierre.titulo}</h2>
            </div>
            <div className="cierre-matriz__texto">
              {cierre.parrafos.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
          </div>
          <p className="cierre-matriz__remate">{cierre.remate}</p>
        </div>
      </section>

      <PanelDetalle detalle={detalle} onCerrar={() => setDetalle(null)} />
    </article>
  );
}

/* ── Panel de detalle ────────────────────────────────────────── */

function PanelDetalle({ detalle, onCerrar }: { detalle: Detalle; onCerrar: () => void }) {
  useEffect(() => {
    if (!detalle) return;
    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [detalle, onCerrar]);

  if (!detalle) return null;

  let etiqueta = "";
  let titulo = "";
  let frase = "";
  let parrafos: string[] = [];
  let imagen = "";
  let nota = "";
  let ancha = false;

  if (detalle.tipo === "componente") {
    const item = componentes.find((c) => c.id === detalle.id);
    if (!item) return null;
    etiqueta = "Componente";
    titulo = item.nombre;
    frase = item.frase;
    parrafos = item.parrafos;
    imagen = item.imagen;
    nota = item.enLaHistoria;
  } else if (detalle.tipo === "eje") {
    const item = ejes.find((e) => e.id === detalle.id);
    if (!item) return null;
    etiqueta = "Eje transversal";
    titulo = item.nombre;
    frase = item.frase;
    parrafos = item.parrafos;
    imagen = item.imagen;
  } else if (detalle.tipo === "personaje") {
    const item = personajes.find((p) => p.id === detalle.id);
    if (!item) return null;
    etiqueta = "Personaje";
    titulo = item.nombre;
    parrafos = [item.texto];
    imagen = item.imagen;
  } else {
    const item = historias.find((h) => h.numero === detalle.numero);
    if (!item) return null;
    const componente = componentes.find((c) => c.id === item.componente);
    const eje = ejes.find((e) => e.id === item.eje);
    etiqueta = `Escena ${item.numero}`;
    titulo = item.titulo;
    frase = item.frase;
    parrafos = item.parrafos;
    imagen = item.imagen;
    ancha = true;
    nota = `${componente?.nombre ?? ""} · ${eje?.nombre ?? ""}`;
  }

  return (
    <div className="detalle" role="dialog" aria-modal="true" aria-label={titulo}>
      <div className="detalle__fondo" onClick={onCerrar} />
      <div className="detalle__panel">
        <button type="button" className="detalle__cerrar" onClick={onCerrar}>
          Cerrar
          <IconoCerrar />
        </button>

        <div className={`detalle__imagen${ancha ? " detalle__imagen--ancha" : ""}`}>
          <Image src={imagen} alt="" width={680} height={544} />
        </div>

        <div className="detalle__texto">
          <Etiqueta>{etiqueta}</Etiqueta>
          <h3>{titulo}</h3>
          {frase && <p className="detalle__frase">{frase}</p>}
          {parrafos.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
          {nota && (
            <p className="detalle__nota">
              {detalle.tipo === "componente" ? <strong>En la historia: </strong> : null}
              {nota}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
