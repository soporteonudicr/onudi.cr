import Image from "next/image";
import Link from "next/link";
import type { Proyecto } from "../data/proyectos";
import { AlInicio } from "./al-inicio";
import { PieDePagina } from "./pie";
import {
  EnPreparacion,
  Espacio,
  Etiqueta,
  Foto,
  IconoExterno,
  IconoFlechaAtras,
  Marca,
} from "./ui";

export function ProyectoDetalle({ proyecto }: { proyecto: Proyecto }) {
  const referencia = proyecto.referencia;
  const ods = referencia?.ods ?? [];
  const datos = [
    referencia?.pais && { etiqueta: "País", valor: referencia.pais },
    referencia?.periodo && { etiqueta: "Periodo", valor: referencia.periodo },
    referencia?.programa && { etiqueta: "Programa", valor: referencia.programa },
  ].filter(Boolean) as { etiqueta: string; valor: string }[];

  return (
    <>
      <AlInicio />

      <header className="encabezado">
        <Link href="/" className="encabezado__marca" aria-label="ONUDI Costa Rica · Inicio">
          <Marca alto={34} />
          <span className="encabezado__pais">Costa Rica</span>
        </Link>
        <Link href="/#proyectos" className="encabezado__volver">
          <IconoFlechaAtras />
          Todos los proyectos
        </Link>
      </header>

      <main className="proyecto">
        {/* Cabecera */}
        <div className="proyecto__portada">
          {proyecto.banner ? (
            <Image
              src={proyecto.banner}
              alt={proyecto.bannerAlt ?? proyecto.nombre}
              width={1600}
              height={467}
              priority
            />
          ) : (
            <Espacio
              proporcion="24 / 7"
              nota={`Franja de portada · ${proyecto.nombre} · horizontal`}
            />
          )}
        </div>

        <header className="proyecto__cabecera">
          <Etiqueta>Proyecto</Etiqueta>
          <h1>{proyecto.nombreCompleto ?? proyecto.nombre}</h1>
          {proyecto.proposito && <p className="proyecto__proposito">{proyecto.proposito}</p>}
          {proyecto.tags.length > 0 && (
            <ul className="proyecto__tags">
              {proyecto.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </header>

        {(datos.length > 0 || ods.length > 0) && (
          <dl className="datos">
            {datos.map((dato) => (
              <div key={dato.etiqueta}>
                <dt>{dato.etiqueta}</dt>
                <dd>{dato.valor}</dd>
              </div>
            ))}
            {ods.length > 0 && (
              <div className="datos__ods">
                <dt>ODS</dt>
                <dd>
                  {ods.map((numero) => (
                    <a
                      href={`https://ods.cr/es/objetivo/objetivo-${numero}`}
                      target="_blank"
                      rel="noreferrer"
                      key={numero}
                      aria-label={`Conocer el ODS ${numero}`}
                      title={`ODS ${numero}`}
                    >
                      <Image
                        src={
                          numero === 17
                            ? "/ods/ods-17.jpg"
                            : `/ods/ods-${String(numero).padStart(2, "0")}.png`
                        }
                        alt={`ODS ${numero}`}
                        width={72}
                        height={72}
                      />
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        )}

        {proyecto.estado === "en-preparacion" && (
          <section className="proyecto__vacio">
            <EnPreparacion />
            <p>
              La ficha de este proyecto ya está preparada. El contenido se incorporará cuando exista
              documentación oficial validada.
            </p>
          </section>
        )}

        <div className="proyecto__cuerpo">
          <div className="proyecto__secciones">
            {/* 01 · El desafío */}
            {proyecto.desafio && (
              <section className="ps">
                <span className="ps__numero">01</span>
                <div className="ps__contenido">
                  <Etiqueta>El desafío</Etiqueta>
                  <h2>{proyecto.desafio.titulo}</h2>
                  {proyecto.desafio.parrafos.map((parrafo) => (
                    <p key={parrafo}>{parrafo}</p>
                  ))}
                </div>
              </section>
            )}

            {/* 02 · La respuesta */}
            {proyecto.respuesta && (
              <section className="ps">
                <span className="ps__numero">02</span>
                <div className="ps__contenido">
                  <Etiqueta>La respuesta</Etiqueta>
                  <h2>{proyecto.respuesta.titulo ?? "¿Qué estamos haciendo?"}</h2>
                  {proyecto.respuesta.intro && <p>{proyecto.respuesta.intro}</p>}
                  <div className="acciones">
                    {proyecto.respuesta.acciones.map((accion) => (
                      <article className="accion" key={accion.verbo}>
                        {accion.imagen && (
                          <Foto
                            src={accion.imagen}
                            alt={accion.imagenAlt ?? accion.verbo}
                            proporcion="16 / 9"
                            tamanos="(max-width: 760px) 100vw, 34vw"
                          />
                        )}
                        <h3>{accion.verbo}</h3>
                        <p>{accion.texto}</p>
                      </article>
                    ))}
                  </div>
                  {proyecto.respuesta.galeria && proyecto.respuesta.galeria.length > 0 && (
                    <div className="galeria-proyecto" aria-label="Fotografías del proyecto">
                      {proyecto.respuesta.galeria.map((foto) => (
                        <figure key={foto.id}>
                          <Foto
                            src={foto.url}
                            alt={foto.alt}
                            proporcion="4 / 3"
                            tamanos="(max-width: 760px) 100vw, 32vw"
                          />
                          {foto.pie && <figcaption>{foto.pie}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  )}
                  {proyecto.respuesta.nota && (
                    <p className="doc__nota">{proyecto.respuesta.nota}</p>
                  )}
                </div>
              </section>
            )}

            {/* 03 · ¿Cómo funciona? */}
            {proyecto.funcionamiento && (
              <section className="ps">
                <span className="ps__numero">03</span>
                <div className="ps__contenido">
                  <Etiqueta>¿Cómo funciona?</Etiqueta>
                  <h2>{proyecto.funcionamiento.titulo ?? "El recorrido, paso a paso"}</h2>
                  {proyecto.funcionamiento.intro && <p>{proyecto.funcionamiento.intro}</p>}

                  <ol
                    className={`flujo flujo--${proyecto.funcionamiento.forma}`}
                    aria-label="Recorrido del proyecto"
                  >
                    {proyecto.funcionamiento.pasos.map((paso, indice) => (
                      <li key={paso.titulo}>
                        <span className="flujo__punto" aria-hidden="true">
                          {indice + 1}
                        </span>
                        <div>
                          <h3>{paso.titulo}</h3>
                          {paso.texto && <p>{paso.texto}</p>}
                        </div>
                      </li>
                    ))}
                  </ol>

                  {proyecto.funcionamiento.forma === "circular" && (
                    <p className="flujo__cierre">
                      Y vuelve a empezar: los materiales regresan al inicio del ciclo.
                    </p>
                  )}

                  {proyecto.funcionamiento.diagrama ? (
                    <Foto
                      src={proyecto.funcionamiento.diagrama}
                      alt={
                        proyecto.funcionamiento.diagramaAlt ??
                        `Diagrama del proyecto ${proyecto.nombre}`
                      }
                      proporcion="16 / 9"
                      encaje="contain"
                    />
                  ) : (
                    <Espacio
                      proporcion="16 / 9"
                      nota={`Diagrama, mapa o fotografía del proceso · ${proyecto.nombre}`}
                    />
                  )}

                  {proyecto.funcionamiento.ejemplos && (
                    <div className="ejemplos">
                      <h3>{proyecto.funcionamiento.ejemplos.titulo}</h3>
                      <ul>
                        {proyecto.funcionamiento.ejemplos.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {proyecto.funcionamiento.nota && (
                    <p className="doc__nota">{proyecto.funcionamiento.nota}</p>
                  )}
                </div>
              </section>
            )}

            {/* 04 · ¿Por qué importa? */}
            {proyecto.importa && proyecto.importa.length > 0 && (
              <section className="ps">
                <span className="ps__numero">04</span>
                <div className="ps__contenido">
                  <Etiqueta>¿Por qué importa?</Etiqueta>
                  <h2>Lo que este proyecto cambia</h2>
                  <div className="motivos">
                    {proyecto.importa.map((motivo) => (
                      <article className="motivo" key={motivo.titulo}>
                        {motivo.imagen && (
                          <Foto
                            src={motivo.imagen}
                            alt={motivo.imagenAlt ?? motivo.titulo}
                            proporcion="4 / 3"
                            tamanos="(max-width: 760px) 100vw, 30vw"
                          />
                        )}
                        <h3>{motivo.titulo}</h3>
                        {motivo.texto && <p>{motivo.texto}</p>}
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 05 · Avances y resultados */}
            {proyecto.avances && (
              <section className="ps">
                <span className="ps__numero">05</span>
                <div className="ps__contenido">
                  <Etiqueta>Avances y resultados</Etiqueta>
                  <h2>Lo previsto y lo alcanzado</h2>

                  <div className="avances">
                    <article className="avances__bloque">
                      <h3>Metas del proyecto</h3>
                      <p className="avances__aclara">Lo que estaba previsto alcanzar.</p>
                      <ul>
                        {proyecto.avances.metas.map((meta) => (
                          <li key={meta}>{meta}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="avances__bloque avances__bloque--resultado">
                      <h3>Resultados alcanzados</h3>
                      <p className="avances__aclara">
                        Lo que existe evidencia de que ya ocurrió.
                      </p>
                      {proyecto.avances.resultados.length > 0 ? (
                        <ul>
                          {proyecto.avances.resultados.map((resultado) => (
                            <li key={resultado}>{resultado}</li>
                          ))}
                        </ul>
                      ) : (
                        <EnPreparacion />
                      )}
                    </article>
                  </div>

                  {proyecto.avances.nota && <p className="doc__nota">{proyecto.avances.nota}</p>}

                  <Espacio
                    proporcion="16 / 9"
                    nota="Fotografías, documentos o material de resultados"
                  />
                </div>
              </section>
            )}

            {/* 07 · Conocé más */}
            {proyecto.estado === "publicado" && (
              <section className="ps">
                <span className="ps__numero">07</span>
                <div className="ps__contenido">
                  <Etiqueta>Conocé más</Etiqueta>
                  <h2>Material relacionado</h2>
                  {proyecto.recursos && proyecto.recursos.length > 0 ? (
                    <div className="conocer">
                      {proyecto.recursos.map((recurso) => (
                        <article className="conocer__item" key={recurso.id}>
                          {recurso.imagen && (
                            <Foto
                              src={recurso.imagen}
                              alt={recurso.imagenAlt ?? recurso.titulo}
                              proporcion="16 / 9"
                              tamanos="(max-width: 760px) 100vw, 30vw"
                            />
                          )}
                          <p className="conocer__tipo">{recurso.tipo}</p>
                          <h3>{recurso.titulo}</h3>
                          {recurso.texto && <p>{recurso.texto}</p>}
                          <a href={recurso.url} target="_blank" rel="noreferrer">
                            Conocer más
                            <IconoExterno />
                          </a>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="conocer">
                      <article className="conocer__item">
                        <h3>Material relacionado</h3>
                        <EnPreparacion>Sin material cargado todavía</EnPreparacion>
                      </article>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* 06 · Gobernanza */}
          <aside className="gobernanza" aria-labelledby="titulo-gobernanza">
            <div className="gobernanza__caja">
              <span className="ps__numero ps__numero--lateral">06</span>
              <Etiqueta>Gobernanza</Etiqueta>
              <h2 id="titulo-gobernanza">¿Quiénes hacen posible este proyecto?</h2>

              {proyecto.gobernanza ? (
                <>
                  <ul className="actores-lista">
                    {proyecto.gobernanza.actores.map((actor) => (
                      <li key={actor.nombre}>
                        <div className="actores-lista__logo">
                          {actor.logo ? (
                            <Foto
                              src={actor.logo}
                              alt={actor.logoAlt ?? `Logo de ${actor.nombre}`}
                              proporcion="3 / 2"
                              encaje="contain"
                            />
                          ) : (
                            <Espacio
                              proporcion="3 / 2"
                              nota={`Logo · ${actor.sigla ?? actor.nombre}`}
                            />
                          )}
                        </div>
                        <h3>
                          {actor.nombre}
                          {actor.sigla && <span> · {actor.sigla}</span>}
                        </h3>
                        <p>{actor.rol}</p>
                        {actor.sitio && (
                          <a href={actor.sitio} target="_blank" rel="noreferrer">
                            Sitio oficial
                            <IconoExterno />
                          </a>
                        )}
                        {actor.redes && (
                          <a href={actor.redes} target="_blank" rel="noreferrer">
                            Redes sociales
                            <IconoExterno />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                  {proyecto.gobernanza.nota && (
                    <p className="doc__nota">{proyecto.gobernanza.nota}</p>
                  )}
                </>
              ) : (
                <EnPreparacion>
                  Los actores y sus roles se incorporarán con la documentación oficial.
                </EnPreparacion>
              )}
            </div>
          </aside>
        </div>
      </main>

      <PieDePagina />
    </>
  );
}
