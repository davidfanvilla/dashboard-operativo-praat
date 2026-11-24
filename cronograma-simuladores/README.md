# Cronograma de evaluación a los instructores de simulador · PRAAT

[Ver cronograma](https://davidfanvilla.github.io/dashboard-operativo-praat/cronograma-simuladores/)

Usa el mismo estilo y encabezado que el [Dashboard Operativo](../) (`../style.css` y `../referencia.png`). Los ajustes propios están en `estilo.css`.

## Qué archivo editar

| Quiero cambiar… | Archivo |
| --- | --- |
| Instructores, simuladores, evaluaciones pasadas y futuras | [datos.js](datos.js) |
| Regla de meses (aprobatoria 6, no aprobatoria 3) y aviso de próximas | [datos.js](datos.js), sección `reglas` |
| Títulos y notas | [index.html](index.html) |
| Colores y tamaños propios | [estilo.css](estilo.css) |
| Cálculos y comportamiento | [app.js](app.js) |

## Uso diario

- **＋ Registrar evaluación**: agrega una evaluación realizada (historial) o programada (fecha futura). Si solo conoces el mes, deja el día vacío.
- **Registrar resultado**: convierte una evaluación programada en realizada. Con resultado aprobatorio se programa la siguiente a 6 meses; con no aprobatorio, a 3 meses. Puedes cambiar el intervalo en «Meses hasta la siguiente».
- **＋ Instructor** y el botón ✎ junto al nombre: agrega instructores o cambia sus simuladores.
- **Calendario**: ‹ › recorre los meses; **Hoy** regresa al mes actual.

## Dónde se guarda la información

- Lo que registras en la página se guarda **solo en ese navegador**.
- Para que quede publicado para todos y no se pierda: **Descargar datos.js** → en GitHub abre la carpeta `cronograma-simuladores` → **Add file → Upload files** → sube el `datos.js` descargado (reemplaza al actual) → **Commit changes**. Espera a **Actions → pages-build-deployment** y recarga.
- **Exportar JSON / Importar JSON** sirven como respaldo o para pasar los datos a otro equipo.
- **Cargar datos publicados** reemplaza los cambios locales por los de GitHub. Exporta un JSON antes si quieres conservarlos.
- GitHub guarda cada versión de `datos.js`, así que el historial de cambios queda en **History** del archivo.

## Formato de datos.js

- `fecha`: `"2026-11"` (solo mes) o `"2026-11-20"` (con día).
- `estado`: `"Programada"`, `"Realizada"` o `"Cancelada"`.
- `resultado`: `"Pendiente"`, `"Aprobatoria"`, `"No aprobatoria"` o `"No registrado"`.
- `siguienteMeses`: número de meses hasta la siguiente; `null` usa la regla.
- `instructor` usa el `id` del instructor (por ejemplo `"sergio-damian"`).
- Conserva comillas, comas, llaves y corchetes.
