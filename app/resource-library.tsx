"use client";

import { useEffect, useMemo, useState } from "react";
import { projects } from "./data/projects";

type Category = "all" | "proyectos" | "plataformas" | "comunidad" | "oportunidades";

type Resource = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  description: string;
  meta: string;
  href?: string;
  external?: boolean;
  tags: string[];
  icon: "project" | "platform" | "community" | "opportunity";
};

const categories = [
  { id: "proyectos" as const, label: "Proyectos", description: "Conoce su propósito, estrategia, avances e impacto.", count: "4 proyectos", icon: "project" },
  { id: "plataformas" as const, label: "Plataformas", description: "Herramientas digitales para aprender y participar.", count: "1 plataforma", icon: "platform" },
  { id: "comunidad" as const, label: "Redes y comunidad", description: "Iniciativas que conectan talento y liderazgo.", count: "1 iniciativa", icon: "community" },
  { id: "oportunidades" as const, label: "Oportunidades", description: "Convocatorias, eventos y espacios de participación.", count: "Próximamente", icon: "opportunity" },
];

const resources: Resource[] = [
  ...projects.map((project): Resource => ({
    id: project.slug,
    category: "proyectos",
    title: project.shortTitle,
    description: project.summary,
    meta: `${project.duration} · ${project.country}`,
    href: `/proyectos/${project.slug}`,
    tags: project.strategy.slice(0, 2).map((item) => item.title),
    icon: "project",
  })),
  {
    id: "ia-consciente",
    category: "plataformas",
    title: "IA Consciente",
    description: "Un espacio para explorar el uso responsable, inclusivo y consciente de la inteligencia artificial.",
    meta: "Plataforma interactiva",
    href: "https://ia-consciente-onudi.vercel.app/",
    external: true,
    tags: ["Inteligencia artificial", "Uso responsable"],
    icon: "platform",
  },
  {
    id: "mujeres-industria",
    category: "comunidad",
    title: "Red de Mujeres en la Industria",
    description: "Una red para conectar, visibilizar y fortalecer el liderazgo de mujeres en los sectores productivos.",
    meta: "Red y comunidad",
    tags: ["Mujeres", "Liderazgo"],
    icon: "community",
  },
  {
    id: "oportunidades-industria",
    category: "oportunidades",
    title: "Oportunidades para la industria",
    description: "Convocatorias, actividades y espacios para empresas y personas del sector industrial.",
    meta: "Convocatorias y eventos",
    tags: ["Participación", "Eventos"],
    icon: "opportunity",
  },
];

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "project") return <svg {...common}><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 11h6M9 15h6" /></svg>;
  if (name === "platform") return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>;
  if (name === "community") return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20M16 5.5a3 3 0 0 1 0 5.5M17 14a4.5 4.5 0 0 1 3.5 4.4V20" /></svg>;
  if (name === "opportunity") return <svg {...common}><path d="m12 3 1.25 4.05L17 9l-3.75 1.95L12 15l-1.25-4.05L7 9l3.75-1.95zM19 15l.7 2.3 2.3 1.2-2.3 1.2L19 22l-.7-2.3-2.3-1.2 2.3-1.2z" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === "external") return <svg {...common}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></svg>;
  return null;
}

function categoryLabel(category: Resource["category"]) {
  return categories.find((item) => item.id === category)?.label ?? category;
}

function ResourceCard({ resource, onOpenSlide }: { resource: Resource; onOpenSlide: (resource: Resource) => void }) {
  const content = (
    <>
      <div className="resource-visual">
        <span className="resource-icon"><Icon name={resource.icon} size={30} /></span>
        <span className="resource-number">{resource.category === "proyectos" ? "PROYECTO" : categoryLabel(resource.category)}</span>
        <strong>{resource.title}</strong>
      </div>
      <div className="resource-body">
        <p className="resource-category">{categoryLabel(resource.category)}</p>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <div className="tag-row">{resource.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="card-footer">
          <small>{resource.meta}</small>
          <span className="card-arrow"><Icon name={resource.external ? "external" : "arrow"} size={18} /></span>
        </div>
      </div>
    </>
  );

  if (resource.href) {
    return <a className="resource-card" href={resource.href} target={resource.external ? "_blank" : undefined} rel={resource.external ? "noreferrer" : undefined}>{content}</a>;
  }

  return <button className="resource-card resource-card-button" onClick={() => onOpenSlide(resource)}>{content}</button>;
}

export function ResourceLibrary() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState<Resource | null>(null);

  useEffect(() => {
    if (!slide) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSlide(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slide]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return resources.filter((resource) => {
      const matchesCategory = category === "all" || resource.category === category;
      const text = [resource.title, resource.description, resource.meta, ...resource.tags].join(" ").toLocaleLowerCase("es");
      return matchesCategory && (!normalized || text.includes(normalized));
    });
  }, [category, query]);

  const chooseCategory = (next: Category) => {
    setCategory(next);
    document.getElementById("recursos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegación de la biblioteca">
        <a className="brand" href="#inicio"><span className="brand-mark"><span /><span /><span /></span><span><strong>Centro de recursos</strong><small>ONUDI · Costa Rica</small></span></a>
        <nav className="side-nav">
          <p>Explorar</p>
          <button className={category === "all" ? "active" : ""} onClick={() => chooseCategory("all")}><span className="nav-dot" />Todo el contenido</button>
          {categories.map((item) => <button className={category === item.id ? "active" : ""} key={item.id} onClick={() => chooseCategory(item.id)}><Icon name={item.icon} size={19} />{item.label}</button>)}
        </nav>
        <div className="sidebar-note"><span>Micrositio informativo</span><p>Para información institucional, visita el sitio oficial de ONUDI.</p><a href="https://www.unido.org/" target="_blank" rel="noreferrer">unido.org <Icon name="external" size={15} /></a></div>
      </aside>

      <main id="inicio" className="main-content">
        <header className="topbar"><div className="mobile-brand">ONUDI · Costa Rica</div><span className="context-pill"><span /> Biblioteca digital</span><a className="official-link" href="https://www.unido.org/" target="_blank" rel="noreferrer">Sitio institucional <Icon name="external" size={16} /></a></header>

        <section className="welcome">
          <p className="eyebrow">Conocimiento que transforma</p>
          <h1>Recursos para una industria más <span>inclusiva y sostenible.</span></h1>
          <p className="welcome-copy">Explora proyectos, plataformas, redes y oportunidades impulsadas en Costa Rica.</p>
          <label className="search-box"><Icon name="search" size={21} /><span className="sr-only">Buscar recursos</span><input type="search" placeholder="Buscar por proyecto, tema o palabra clave…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">×</button>}</label>
        </section>

        <section className="category-section">
          <div className="section-heading"><div><p className="section-kicker">Colecciones</p><h2>¿Qué te gustaría explorar?</h2></div>{category !== "all" && <button className="text-button" onClick={() => setCategory("all")}>Ver todo</button>}</div>
          <div className="category-grid">
            {categories.map((item, index) => <button key={item.id} className={`category-card category-${index + 1} ${category === item.id ? "selected" : ""}`} onClick={() => chooseCategory(item.id)}><span className="category-icon"><Icon name={item.icon} size={25} /></span><span className="category-content"><strong>{item.label}</strong><small>{item.description}</small><em>{item.count}</em></span><span className="category-arrow"><Icon name="arrow" size={18} /></span></button>)}
          </div>
        </section>

        <section id="recursos" className="resources-section">
          <div className="section-heading"><div><p className="section-kicker">Biblioteca</p><h2>{category === "all" ? "Recursos destacados" : categories.find((item) => item.id === category)?.label}</h2></div><span className="result-count">{filtered.length} {filtered.length === 1 ? "recurso" : "recursos"}</span></div>
          {filtered.length ? <div className="resource-grid">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} onOpenSlide={setSlide} />)}</div> : <div className="empty-state"><Icon name="search" size={28} /><h3>No encontramos coincidencias</h3><p>Prueba con otra palabra o vuelve a ver todos los recursos.</p><button onClick={() => { setQuery(""); setCategory("all"); }}>Ver todos</button></div>}
        </section>

        <footer><p>Micrositio informativo de iniciativas de ONUDI en Costa Rica. No sustituye al portal institucional.</p><a href="https://www.unido.org/" target="_blank" rel="noreferrer">Organización de las Naciones Unidas para el Desarrollo Industrial</a></footer>
      </main>

      {slide && (
        <div className="slide-backdrop" onMouseDown={() => setSlide(null)}>
          <aside className="slide-panel" aria-label={slide.title} onMouseDown={(event) => event.stopPropagation()}>
            <button className="slide-close" onClick={() => setSlide(null)} aria-label="Cerrar">×</button>
            <p className="slide-kicker">Borrador · {categoryLabel(slide.category)}</p>
            <span className="slide-icon"><Icon name={slide.icon} size={34} /></span>
            <h2>{slide.title}</h2>
            {slide.id === "mujeres-industria" ? (
              <>
                <p className="slide-lead">Un espacio concebido para conectar, visibilizar y fortalecer la participación de las mujeres que contribuyen al desarrollo productivo, la innovación y la transformación económica.</p>
                <div className="slide-section"><span>Propósito</span><h3>Crear comunidad y abrir caminos.</h3><p>La red busca facilitar conexiones, intercambio de experiencias, fortalecimiento de capacidades y nuevas oportunidades para mujeres vinculadas con los sectores industriales y productivos.</p></div>
                <div className="slide-section"><span>Este espacio podrá reunir</span><ul><li>Actividades y encuentros de la red.</li><li>Historias y perfiles de mujeres en la industria.</li><li>Oportunidades de formación y participación.</li><li>Publicaciones, noticias y recursos.</li></ul></div>
                <div className="slide-note">El contenido y los mecanismos para unirse se incorporarán cuando sean validados.</div>
              </>
            ) : (
              <><p className="slide-lead">Aquí se publicarán convocatorias, eventos y espacios de participación para el sector industrial.</p><div className="slide-note">Por ahora no hay oportunidades publicadas. La sección ya está preparada para agregarlas.</div></>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
