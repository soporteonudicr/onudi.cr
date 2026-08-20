# Qué subir a GitHub

Este paquete contiene únicamente los archivos nuevos o actualizados de
`onudi.cr` para conectarlo con **Página web → Proyectos** del CRM. Los demás
archivos del repositorio se conservan sin cambios.

## Cómo subirlo

1. Descomprima el ZIP.
2. Abra el repositorio `soporteonudicr/onudi.cr` en GitHub.
3. Cargue el contenido de la carpeta `onudi.cr-main` en la raíz del repositorio,
   respetando las carpetas `app` y `public`. No borre los demás archivos.
4. Confirme que GitHub reemplace los archivos existentes y agregue los nuevos.
5. Espere el despliegue automático de Vercel.

No suba el ZIP dentro del repositorio. El paquete no contiene `node_modules`,
cachés de compilación ni credenciales.

## Archivos principales de la conexión

| Archivo | Función |
|---|---|
| `app/lib/proyectos-api.ts` | Lee y adapta los proyectos publicados desde el CRM |
| `app/page.tsx` | Obtiene los proyectos antes de renderizar el inicio |
| `app/inicio.tsx` | Genera las tarjetas con datos del CRM |
| `app/proyectos/[slug]/page.tsx` | Genera cada ficha a partir de su enlace estable |
| `app/components/proyecto-detalle.tsx` | Muestra secciones, imágenes, recursos, ODS y gobernanza |
| `public/ods/` | Iconos de los 17 Objetivos de Desarrollo Sostenible |

## Funcionamiento de la migración

- Mientras un proyecto esté como borrador, se conserva su contenido anterior
  en la plataforma pública.
- Al publicarlo desde el CRM, la versión del CRM reemplaza la ficha anterior.
- Los proyectos nuevos aparecen cuando se publican.
- Los cambios pueden tardar hasta 60 segundos en reflejarse.
- Si el CRM no responde temporalmente, el sitio conserva el contenido local en
  lugar de quedar vacío.

No hace falta ejecutar otra migración en Neon ni agregar variables en Vercel.
La dirección del CRM ya tiene un valor predeterminado. La variable opcional
`ONUDI_CRM_URL` solo se necesita si cambia el dominio del CRM.
