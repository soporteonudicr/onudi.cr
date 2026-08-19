import Link from "next/link";
import type { Project } from "../data/projects";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function ProjectTemplate({ project }: { project: Project }) {
  return (
    <main className="project-page">
      <header className="project-topbar">
        <Link href="/" className="back-link"><ArrowIcon /> Volver a la biblioteca</Link>
        <span>ONUDI · Costa Rica</span>
      </header>

      <section className="project-hero">
        <p className="project-kicker">Proyecto · {project.country}</p>
        <h1>{project.title}</h1>
        <p className="project-summary">{project.summary}</p>
      </section>

      <section className="facts-grid" aria-label="Datos principales del proyecto">
        <article><span>País</span><strong>{project.country}</strong></article>
        <article><span>Región</span><strong>{project.region}</strong></article>
        <article><span>Duración</span><strong>{project.duration}</strong></article>
        <article><span>Presupuesto total</span><strong>{project.budget}</strong></article>
      </section>

      <section className="objective-block">
        <p>Objetivo</p>
        <h2>{project.objective}</h2>
      </section>

      <div className="project-content-grid">
        <section className="project-section context-section">
          <p className="project-section-number">01</p>
          <div>
            <span className="project-section-label">Contexto</span>
            <h2>¿Por qué es importante?</h2>
            {project.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="project-section strategy-section">
          <p className="project-section-number">02</p>
          <div>
            <span className="project-section-label">Estrategia</span>
            <h2>¿Cómo se está abordando?</h2>
            <div className="strategy-list">
              {project.strategy.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="project-section impact-section">
          <p className="project-section-number">03</p>
          <div>
            <span className="project-section-label">Impacto esperado</span>
            <h2>Resultados que se buscan</h2>
            <ul>{project.impact.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="project-section partners-section">
          <p className="project-section-number">04</p>
          <div>
            <span className="project-section-label">Colaboración</span>
            <h2>¿Quiénes participan?</h2>
            <div className="partners-grid">
              <article><span>Implementación</span>{project.partners.implementation.map((item) => <strong key={item}>{item}</strong>)}</article>
              <article><span>Contraparte</span>{project.partners.government.map((item) => <strong key={item}>{item}</strong>)}</article>
              <article><span>Financiamiento</span>{project.partners.financing.map((item) => <strong key={item}>{item}</strong>)}</article>
            </div>
          </div>
        </section>
      </div>

      <section className="sdg-section">
        <div><p className="project-section-label">Contribución</p><h2>Objetivos de Desarrollo Sostenible</h2></div>
        <div className="sdg-list">{project.sdgs.map((sdg) => <span key={sdg}>ODS {sdg}</span>)}</div>
      </section>

      <section className="updates-section">
        <div>
          <p className="project-section-label">Bitácora del proyecto</p>
          <h2>Actualizaciones y publicaciones</h2>
          <p>Este espacio permitirá agregar noticias, documentos, resultados y novedades conforme avance el proyecto.</p>
        </div>
        <div className="updates-placeholder">
          <span>Próximamente</span>
          <strong>Aquí aparecerán las primeras actualizaciones.</strong>
        </div>
      </section>

      <footer className="project-footer">
        <p>Micrositio informativo de iniciativas de ONUDI en Costa Rica.</p>
        <a href="https://www.unido.org/" target="_blank" rel="noreferrer">Visitar el sitio institucional de ONUDI</a>
      </footer>
    </main>
  );
}
