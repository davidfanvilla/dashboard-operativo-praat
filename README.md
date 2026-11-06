# Dashboard Operativo PRAAT

[Ver dashboard](https://davidfanvilla.github.io/dashboard-operativo-praat/)

## Qué archivo editar

| Quiero cambiar… | Archivo |
| --- | --- |
| Alumnos, horas, instructores, aviones, asignaciones y cancelaciones | [datos.js](datos.js) |
| Matrículas y horas hasta mantenimiento | [datos.js](datos.js), sección `maintenance` |
| Fechas y periodos del reporte | [datos.js](datos.js), al inicio |
| Título principal, títulos de secciones e indicadores | [textos.js](textos.js), sección `TEXTOS` |
| Encabezados de la tabla | [textos.js](textos.js), lista `columnas` |
| Nombres de campos del formulario | [textos.js](textos.js), sección `ETIQUETAS_EDITOR` |
| Notas explicativas y botones | [index.html](index.html), organizado por secciones |
| Colores, tamaños, espacios y diseño móvil | [style.css](style.css) |
| Cálculos y comportamiento | [app.js](app.js) |

Para cambios habituales empieza por **datos.js** o **textos.js**.

## Cambiar un dato en GitHub

1. Abre el archivo y pulsa el lápiz **Edit this file**.
2. Busca el valor o título que necesitas modificar.
3. Pulsa **Commit changes** y guarda en `main`.
4. Espera a que termine **Actions → pages-build-deployment**.
5. Recarga el dashboard.

### Ejemplo: instructores de Querétaro

En `datos.js`, dentro de `bases`, busca:

```js
{
  "name": "QET",
  "instructors": 7,
  "students": 329
}
```

Cambia únicamente el número que corresponda. El objeto real contiene más campos: consérvalos.

### Ejemplo: título de una sección

En `textos.js`:

```js
"indicadores": "▦ Indicadores por base"
```

Puedes sustituirlo por:

```js
"indicadores": "▦ Resumen de operación por base"
```

`pagina` modifica el título visible del encabezado y el nombre de la pestaña. El logo y el avión siguen usando `referencia.png`.

## Diccionario de datos

Las bases son **QET = Querétaro**, **PBC = Puebla**, **JJC = Atizapán**. Conserva el orden de las tres bases.

| Clave de cada base | Significado |
| --- | --- |
| `name` | Nombre o abreviatura de la base |
| `instructors` | Instructores de la base; los dos especializados están incluidos en QET |
| `students` | Alumnos registrados |
| `hours` | Horas pendientes |
| `mono` / `bi` | Monomotores / bimotores en rol |
| `assigned` | Asignaciones semanales |
| `unconfirmed` | No confirmados |
| `cancel` | Cancelaciones de esa base |
| `near` | Alumnos con 10 h o menos pendientes |
| `nearHours` | Horas pendientes de ese grupo |

Al inicio del archivo: `cut` es fecha de corte; `roles` es periodo del rol; `incidents` es corte de incidencias; `period` es periodo de cancelaciones. `blocks`, `duration` y `days` definen la capacidad teórica de programación de aeronaves. `totalMono`, `totalBi`, `goMono` y `goBi` definen la flota total y GO.

`cancellations` conserva el total reportado. Si difiere de la suma por base, el dashboard muestra una advertencia. `trainingNote` contiene las restricciones de formación e instructores. `maintenanceNote` contiene la observación de mantenimiento.

En `maintenance`: `id` es matrícula, `hours` son horas hasta el servicio, `service` es el tipo de servicio.

Los totales, porcentajes, capacidad teórica y alumnos por instructor se calculan automáticamente. El plazo de atención permanece pendiente: no se deduce de la capacidad teórica.

## Datos publicados y datos del navegador

- Editar **datos.js en GitHub** cambia los datos iniciales publicados para todos.
- **Editar datos** en el dashboard guarda una copia solo en ese navegador.
- Si ya tienes cambios locales, estos se conservan y pueden ocultar un cambio que acabas de publicar.
- Para usar la versión publicada: abre **Editar datos → Cargar datos publicados**. Esta acción reemplaza los datos locales. Exporta un JSON primero si quieres conservarlos.
- Un archivo JSON antiguo se puede importar; los campos nuevos de instructores se completan con los valores publicados cuando no existen.

## Reglas para editar sin romper el archivo

- No cambies las claves (por ejemplo, `students`) ni los IDs del HTML.
- Los textos van entre comillas; los números no.
- Usa punto decimal: `7613.4`, sin separador de miles.
- Conserva las comas, llaves y corchetes.
- En las listas `kpis` y `columnas`, cambia los textos sin alterar el orden ni la cantidad.
- Mantén juntos los archivos `index.html`, `datos.js`, `textos.js`, `app.js`, `style.css` y `referencia.png`.

## Organización técnica

`index.html` carga primero `datos.js`, después `textos.js` y al final `app.js`. El JavaScript no necesita compilación. GitHub Pages publica directamente la rama `main`.

Los archivos están formateados con sangría. Puedes abrirlos en un editor de texto o modificarlos desde GitHub.
