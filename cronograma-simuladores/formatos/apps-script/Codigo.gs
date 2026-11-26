// Apps Script para guardar las evaluaciones de los formatos PRAAT en Google Sheets.
// Instrucciones en LEEME.md (misma carpeta).
const HOJA = "Evaluaciones";
const ENCABEZADOS = ["ID", "Formato", "Fecha de evaluación", "Evaluado", "Evaluador", "Detalle", "S", "T", "Guardado", "Actualizado", "Datos (no editar)"];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(HOJA);
  if (!h) {
    h = ss.insertSheet(HOJA);
    h.appendRow(ENCABEZADOS);
    h.setFrozenRows(1);
    h.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight("bold").setBackground("#150f63").setFontColor("white");
  }
  return h;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Guarda, actualiza o elimina una evaluación.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const r = JSON.parse(e.postData.contents);
    if (!r.id) return json_({ ok: false, error: "Falta el ID." });
    const h = hoja_();
    const n = h.getLastRow() - 1;
    const ids = n > 0 ? h.getRange(2, 1, n, 1).getValues().map((f) => String(f[0])) : [];
    const i = ids.indexOf(String(r.id));
    if (r.eliminar) {
      if (i >= 0) h.deleteRow(i + 2);
      return json_({ ok: true });
    }
    const datos = JSON.stringify(r);
    if (datos.length > 49000) return json_({ ok: false, error: "La evaluación es demasiado grande para una celda (firmas muy pesadas)." });
    const fila = [r.id, r.formatoNombre || r.formato, r.fecha, r.evaluado, r.evaluador, r.detalle || "", r.s || 0, r.t || 0, r.guardado, r.actualizado, datos];
    if (i >= 0) h.getRange(i + 2, 1, 1, fila.length).setValues([fila]);
    else h.appendRow(fila);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Devuelve todas las evaluaciones guardadas.
function doGet() {
  try {
    const h = hoja_();
    const n = h.getLastRow() - 1;
    const registros = n > 0
      ? h.getRange(2, 11, n, 1).getValues().map((f) => f[0]).filter(String).map((s) => JSON.parse(s))
      : [];
    return json_({ ok: true, registros: registros });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
