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
| `app/data/programa-pais.ts` | ¿Quiénes somos?, ODS 9, dónde se refleja el trabajo y la ruta de la cooperación |
| `app/data/matriz.ts` | Las Rutas del Programa País: componentes, ejes, personajes, las 16 historias y el cierre |
| `app/data/carrusel.ts` | Fotografías del carrusel del inicio |
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

El video de portada está en `public/video/`: `portada.mp4` y su primer
fotograma, `portada-poster.jpg`, que se muestra mientras el video carga. Para
cambiarlo se reemplazan ambos archivos conservando los nombres. Conviene
exportar a 1600 px de ancho y sin audio, para que pese alrededor de 1 MB.

El titular está incrustado en el video, así que también se escribe como texto
real en `app/inicio.tsx`. En pantallas anchas ese texto queda oculto a la vista
(lo leen los buscadores y los lectores de pantalla) y en móvil se muestra,
porque ahí la versión del video resulta demasiado pequeña. Si cambia el titular
del video, hay que cambiarlo también ahí.

El resto está en `public/imagenes/`:

| Archivo | Dónde se ve |
|---|---|
| `carrusel/01.jpg` … `06.jpg` | Carrusel del inicio |
| `ods9-cubo.png` | Cubo del ODS 9, dentro de ¿Quiénes somos? |
| `refleja/01.png` … `04.png` | Iconos de ¿Dónde se refleja este trabajo? |
| `matriz/componentes/`, `matriz/ejes/`, `matriz/personajes/`, `matriz/historias/` | Ilustraciones de las Rutas del Programa País |
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
solo para que los párrafos largos se lean sin cansar la vista. El naranja
`#F47A42`, tomado de las ilustraciones, se reserva para los ejes transversales
de la matriz. Se definen al inicio de `app/globals.css`.

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

## La matriz del Programa País

Cuatro componentes (columnas) por cuatro ejes transversales (filas) dan
dieciséis escenas, numeradas del 01 al 16 en orden de lectura. Cada componente,
cada eje, cada personaje y cada escena abre su propia ficha.

Debajo de 900 px de ancho el cuadro completo deja de leerse, así que el mismo
contenido se apila agrupado por eje. Son dos disposiciones del mismo dato: se
edita una sola vez, en `app/data/matriz.ts`.

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
