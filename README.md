# Centro de recursos | ONUDI Costa Rica

Biblioteca digital que organiza proyectos, plataformas, redes y oportunidades
vinculadas con las iniciativas de ONUDI en Costa Rica.

Proyecto **Next.js (App Router)**, sin base de datos y sin servicios pagos.
Todo el contenido vive en archivos del repositorio.

## Estructura

| Archivo | Para qué sirve |
|---|---|
| `app/page.tsx` | Página de inicio (carga la biblioteca) |
| `app/resource-library.tsx` | Buscador, categorías, tarjetas y panel lateral |
| `app/data/projects.ts` | **Contenido de los proyectos** — aquí se edita el texto |
| `app/components/project-template.tsx` | Plantilla común de las páginas de proyecto |
| `app/proyectos/[slug]/page.tsx` | Ruta individual de cada proyecto |
| `app/globals.css` | Todos los estilos |
| `public/` | Íconos e imágenes públicas |
| `_archivo/` | Código viejo que no se usa (ver más abajo) |

### Agregar o editar un proyecto

Todo se hace en `app/data/projects.ts`. Cada proyecto es un bloque con
`slug`, `title`, `summary`, `context`, `strategy`, `impact`, `partners` y `sdgs`.
El `slug` define la URL: `/proyectos/mi-slug`.

No hay que tocar nada más: la tarjeta en la biblioteca y la página del
proyecto se generan solas.

## Paleta

Solo tres colores, definidos en `app/globals.css`:

```
--blue:   #009cdc
--orange: #f47a42
--white:  #ffffff
```

## Desplegar en Vercel

1. Subir esta carpeta a un repositorio de GitHub.
2. En Vercel: **Add New → Project → Import** ese repositorio.
3. Dejar todo por defecto. Vercel detecta Next.js solo.
4. **Deploy**.

No hay que configurar variables de entorno, comandos de build ni bases de datos.

## Correr localmente (opcional)

Requiere Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Queda en `http://localhost:3000`.

## Sobre `_archivo/`

La versión anterior traía tres archivos de un proyecto distinto (un
"observatorio" con base de datos, usuarios y reportes) que no forman parte
de este sitio y que estaban rotos: llamaban a tablas y módulos que no
existen. Se guardaron ahí como `.txt` para no perderlos. La carpeta está
excluida del build y no afecta el despliegue.
