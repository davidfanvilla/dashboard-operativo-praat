# Dashboard Operativo PRAAT

[Ver dashboard](https://davidfanvilla.github.io/dashboard-operativo-praat/)

[Cronograma de evaluación a los instructores de simulador](https://davidfanvilla.github.io/dashboard-operativo-praat/cronograma-simuladores/) · [instrucciones](cronograma-simuladores/README.md)

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


## Ediciones semanales e historial

- [Dashboard actual](https://davidfanvilla.github.io/dashboard-operativo-praat/): mantenimiento al 24/11/2026 e incidencias al 22/11/2026.
- [Corte del 24/11/2026 previo a la actualización de incidencias](historial/2026-11-24/).
- [Corte del 23/11/2026](historial/2026-11-23/).
- [Corte del 20/11/2026](historial/2026-11-20/).
- [Versión anterior, datos al 05/11/2026](historial/2026-11-05/).
- [Copia semanal del 19/11/2026](historial/2026-11-19/).
- [Transcripción del reporte de mantenimiento](historial/2026-11-19/reporte-transcrito.json).

Las copias históricas incluyen su propio HTML, estilos, títulos, datos y lógica. Son de solo lectura y no leen cambios locales del navegador: preservan la versión publicada. Los cambios locales que ya tenías siguen en su clave anterior de almacenamiento y no se borran con esta actualización.

Cada edición tiene una clave de guardado local independiente. Los JSON de otra edición no sustituyen el reporte actual. No cambies la fecha de edición al editar datos: identifica la versión de guardado.

El PDF del 19/11/2026 solo actualiza mantenimiento y estados de flota. Se mantienen el corte de alumnos/demanda del 05/11, roles 02–08/11 e incidencias al 01/11. La capacidad teórica de 840 h sigue asociada a ese rol anterior.

En la edición semanal, `fleetRecords` es el registro fuente: 23 aeronaves, 11 GO, 11 AOG y 1 OVH. Los totales GO se calculan desde ese registro. `goMono`, `goBi`, `totalMono` y `totalBi` permanecen como referencia anterior; no se usan para presentar el desglose de tipo de la flota semanal porque este PDF no lo especifica. Los campos `mono` y `bi` de las bases siguen describiendo el rol histórico, no el estado actual de mantenimiento.

Las matrículas OHB y PDM están clasificadas GO en el documento, con observaciones «EN SERVICIO E2» y «EN SERVICIO E3»; se conserva esa clasificación junto con su salvedad. Los remanentes no indicados se representan con `null`, nunca con cero.

Para otra semana, crea primero una copia histórica de la edición publicada y después actualiza `maintenanceCut`, `sourceReport`, `fleetRecords`, `maintenance` y `maintenanceNote`. Conserva `edition` para mantener la compatibilidad con los datos guardados. Conserva los cortes de los indicadores que no tengan una fuente nueva.
