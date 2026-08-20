# Qué subir a GitHub

Este paquete es solo lo que cambió respecto al ZIP anterior. Todo lo demás del
repositorio queda igual.

**No hay que borrar nada.** Todos los archivos de aquí, o son nuevos, o
reemplazan a uno del mismo nombre.

## Archivos que se reemplazan

| Archivo | Qué cambió |
|---|---|
| `app/globals.css` | Estilos del cierre en azul, tarjeta celeste, registro de interés y la página de la red |
| `app/inicio.tsx` | Plataformas en tarjetas, enlace a la red y bloque del formulario de interés |
| `app/components/contenido-ventanas.tsx` | Carrusel dentro de ¿Qué es ONUDI? |
| `app/components/matriz.tsx` | Cierre de la matriz a una sola columna |
| `app/data/recursos.ts` | Enlaces del formulario de interés y de unido.org |
| `public/imagenes/ods9-cubo.png` | Versión nueva del cubo |
| `public/imagenes/ia-consciente.jpg` | Recorte que ya no corta el bombillo |
| `README.md` | Documentación al día |

## Archivos nuevos

| Archivo | Qué es |
|---|---|
| `app/data/mujeres-industria.ts` | Contenido de la Red de Mujeres en la Industria |
| `app/redes/mujeres-en-la-industria/page.tsx` | La página de la red |
| `public/imagenes/mujeres/` | Las nueve imágenes de la red |

## Cómo subirlo

Descomprimí este ZIP y arrastrá el contenido de la carpeta a la raíz del
repositorio en GitHub, respetando la estructura de carpetas. GitHub reemplaza
los archivos que ya existen y agrega los nuevos.

Ojo con una cosa: la carpeta `app/redes/` es nueva. Si al arrastrar solo subís
archivos sueltos, esa ruta no se crea. Conviene arrastrar las carpetas
completas (`app` y `public`) para que la estructura se respete.
