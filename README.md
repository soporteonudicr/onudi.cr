# ONUDI Costa Rica

Plataforma espejo de ONUDI Costa Rica: explica qué hace la organización en el
país, cómo se organiza su cooperación y cómo esa cooperación se convierte en
proyectos, plataformas, redes y oportunidades.

Proyecto **Next.js (App Router)**. Sin base de datos, sin servicios pagos y sin
variables de entorno: todo el contenido vive en archivos del repositorio.

---

## Dónde se edita cada cosa

Todo el texto está en `app/data/`. No hace falta tocar los componentes.

| Archivo | Qué contiene |
|---|---|
| `app/data/programa-pais.ts` | ¿Quiénes somos?, ODS 9, los 4 componentes, los 4 ejes transversales, la ruta de la cooperación y los personajes |
| `app/data/proyectos.ts` | Los cinco proyectos, con sus siete secciones cada uno |
| `app/data/recursos.ts` | Plataformas, redes y oportunidades |

### Agregar un proyecto

Se copia un bloque de `app/data/proyectos.ts` y se cambian los datos. El `slug`
define la URL: `/proyectos/mi-slug`. La tarjeta del home y la página completa se
generan solas.

Un proyecto con `estado: "en-preparacion"` muestra la ficha lista pero sin
contenido, tal como piden Costa Rica por Siempre y Conservación Internacional.
Los campos que se dejan afuera simplemente no aparecen: si un proyecto no tiene
`avances`, esa sección no se dibuja. Así nunca queda un espacio inventado.

### Agregar una oportunidad

En `app/data/recursos.ts`, dentro de `oportunidades`. Mientras el arreglo esté
vacío, la sección muestra el mensaje de que todavía no hay convocatorias.

---

## Imágenes

Están en `public/imagenes/`:

| Archivo | Dónde se ve |
|---|---|
| `portada.jpg` | Portada del inicio |
| `programa-pais.jpg` | Sección Programa País |
| `ruta/01-prioridad.png` … `04-proyectos.png` | Iconos de la ruta de la cooperación |
| `proyectos/<slug>.jpg` | Tarjeta y portada de cada proyecto |
| `ia-consciente.jpg` | Tarjeta de la plataforma IA Consciente |
| `mujeres-industria.jpg` | Tarjeta de la red Mujeres en la Industria |

Para cambiar una imagen basta reemplazar el archivo conservando el nombre. Para
agregar una nueva, se guarda en esa carpeta y se apunta desde el campo `imagen`
del archivo de datos correspondiente.

Donde todavía no hay fotografía aparece un recuadro punteado que indica qué
imagen corresponde ahí. Son componentes `<Espacio nota="..." />` y se
reemplazan por `<Foto src="..." alt="..." />` cuando llegue el material.

---

## Sistema visual

**Color.** El azul es exactamente el del emblema: `#009CDC`. El celeste
`#E1F2FB` es su tinte y se usa en las franjas. El azul hondo `#0A2B3C` existe
solo para que los párrafos largos se lean sin cansar la vista. Se definen al
inicio de `app/globals.css`.

**Tipografía.** Archivo para titulares (la grotesca más cercana al logotipo
ONUDI) y Source Sans 3 para texto corrido. Se cambian en `app/layout.tsx`,
sustituyendo las dos importaciones de `next/font/google`.

**Firma visual.** El hilo de cooperación: una línea azul continua que baja por
el borde izquierdo del home y marca cada sección con un nodo. Dibuja la ruta de
comprensión que plantea el documento. En móvil se oculta.

**Logos.** En `public/logos/`, en versión azul y blanca, emblema y horizontal.

---

## Desplegar en Vercel

1. Subir esta carpeta a un repositorio de GitHub.
2. En Vercel: **Add New → Project → Import** ese repositorio.
3. Dejar todo por defecto. Vercel detecta Next.js solo.
4. **Deploy**.

## Correr localmente

Requiere Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Queda en `http://localhost:3000`.

---

## Reglas editoriales que respeta el código

- Las metas nunca se muestran como resultados: son dos bloques separados y con
  etiqueta explícita.
- Ningún actor de gobernanza aparece sin su rol escrito.
- Lo que no tiene fuente validada queda como "contenido en preparación", no se
  rellena.
- Las oportunidades dirigen siempre al sitio oficial; la plataforma no
  reproduce convocatorias completas.

## Sobre `_archivo/`

Tres archivos de un proyecto distinto que venían en el ZIP original. Están fuera
del build y no afectan el despliegue.
