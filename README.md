# Centro de recursos ONUDI Costa Rica

Borrador de una biblioteca digital para organizar proyectos, plataformas, redes y oportunidades vinculadas con las iniciativas de ONUDI en Costa Rica.

## Contenido actual

- Biblioteca principal con buscador y filtros.
- Cuatro proyectos con páginas individuales y una plantilla reutilizable.
- Enlace directo a IA Consciente.
- Panel informativo de la Red de Mujeres en la Industria.
- Espacio preparado para futuras oportunidades.
- Paleta visual limitada a `#009cdc`, `#f47a42` y blanco.

El PDF utilizado como referencia para estructurar la información no está incluido en este proyecto.

## Ejecutar localmente

Requiere Node.js 22.13 o posterior.

```bash
npm install
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:3000`.

## Validar el proyecto

```bash
npm run lint
npm test
```

## Estructura principal

- `app/page.tsx`: entrada de la biblioteca.
- `app/resource-library.tsx`: buscador, categorías, tarjetas y paneles laterales.
- `app/data/projects.ts`: información estructurada de los proyectos.
- `app/components/project-template.tsx`: plantilla común para las páginas de proyecto.
- `app/proyectos/[slug]/page.tsx`: rutas individuales de cada proyecto.

Este borrador todavía no está conectado al repositorio de GitHub ni al proyecto de Vercel de ONUDI.
