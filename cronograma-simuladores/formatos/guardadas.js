// Lista de evaluaciones guardadas (página de formatos).
const $g = (id) => document.getElementById(id);
const escG = (x) =>
  String(x ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const MESES_G = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fechaG = (f) => {
  if (!f) return "—";
  const [y, m, d] = f.split("-").map(Number);
  return `${d} ${MESES_G[m - 1]} ${y}`;
};
let registros = [];

function avisoG(t, html) {
  const el = $g("toast");
  el[html ? "innerHTML" : "textContent"] = t;
  el.style.display = "block";
  clearTimeout(avisoG.t);
  avisoG.t = setTimeout(() => (el.style.display = "none"), 6000);
}

async function cargarGuardadas() {
  $g("g-estado").textContent = Almacen.url ? "Cargando desde Google Sheets…" : "";
  const { registros: lista, error } = await Almacen.todos();
  registros = lista;
  $g("g-estado").textContent = !Almacen.url
    ? "Guardadas solo en este navegador. Para verlas desde cualquier equipo, conecta Google Sheets (ver instrucciones)."
    : error
      ? "No se pudo leer Google Sheets (" + error.message + "). Se muestran las guardadas en este equipo."
      : "Conectado a Google Sheets: se muestran las evaluaciones de todos los equipos.";
  pintarGuardadas();
}

function pintarGuardadas() {
  const ff = $g("g-formato").value,
    q = $g("g-buscar").value.trim().toLowerCase();
  const lista = registros
    .filter((r) => (!ff || r.formato === ff) && (!q || [r.evaluado, r.evaluador, r.detalle].join(" ").toLowerCase().includes(q)))
    .sort((a, b) => (a.fecha === b.fecha ? (a.actualizado < b.actualizado ? 1 : -1) : a.fecha < b.fecha ? 1 : -1));
  $g("g-total").textContent = `${lista.length} de ${registros.length}`;
  $g("guardadas-tabla").innerHTML =
    `<thead><tr><th>Evaluado</th><th>Fecha</th><th>Formato</th><th>Evaluador</th><th>Detalle</th><th>S / T</th><th>Guardada</th><th class="acc">Acción</th></tr></thead><tbody>` +
    (lista.length
      ? lista
          .map((r) => {
            const pag = r.pagina || r.formato + ".html";
            const pendiente = Almacen.url && !r.enviado;
            return `<tr><td>${escG(r.evaluado)}</td><td><b>${fechaG(r.fecha)}</b></td><td>${escG(r.formatoNombre || r.formato)}</td><td>${escG(r.evaluador) || "—"}</td><td>${escG(r.detalle) || "—"}</td><td>${r.s} / ${r.t}</td><td><small>${new Date(r.actualizado).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}<br>${escG(r.origen || "Este equipo")}${pendiente ? " · <b>sin enviar</b>" : ""}</small></td><td class="acc"><a class="button mini primary" href="${pag}?abrir=${encodeURIComponent(r.id)}">Abrir</a> <a class="button mini" href="${pag}?abrir=${encodeURIComponent(r.id)}&imprimir=1" target="_blank">Imprimir</a>${
              pendiente ? ` <button class="mini" data-enviar="${escG(r.id)}">Enviar</button>` : ""
            } <button class="mini danger" data-borrar="${escG(r.id)}">Eliminar</button></td></tr>`;
          })
          .join("")
      : `<tr><td colspan="8">Aún no hay evaluaciones guardadas. Llena un formato y pulsa «Guardar evaluación».</td></tr>`) +
    "</tbody>";
}

document.addEventListener("click", async (ev) => {
  const b = ev.target.closest("button");
  if (!b) return;
  if (b.dataset.enviar) {
    const r = Almacen.local().find((x) => x.id === b.dataset.enviar);
    try {
      await Almacen.enviar(r);
      Almacen.guardarLocal({ ...r, enviado: true });
      avisoG("Enviada a Google Sheets.");
    } catch (e) {
      avisoG("No se pudo enviar: " + e.message);
    }
    cargarGuardadas();
  }
  if (b.dataset.borrar) {
    const r = registros.find((x) => x.id === b.dataset.borrar);
    if (!confirm(`¿Eliminar la evaluación de ${r.evaluado} (${fechaG(r.fecha)})?${r.enviado ? " También se borrará de Google Sheets." : ""}`)) return;
    try {
      if (r.enviado) await Almacen.enviar(r, true);
      Almacen.borrarLocal(r.id);
      avisoG("Evaluación eliminada.");
    } catch (e) {
      avisoG("No se pudo eliminar en Google Sheets: " + e.message);
    }
    cargarGuardadas();
  }
});
$g("g-formato").onchange = $g("g-buscar").oninput = pintarGuardadas;
$g("g-actualizar").onclick = cargarGuardadas;
$g("g-exportar").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(registros, null, 2)], { type: "application/json" }));
  a.download = `evaluaciones-guardadas-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
};
$g("g-importar").onchange = async (ev) => {
  const f = ev.target.files[0];
  ev.target.value = "";
  if (!f) return;
  try {
    const lista = JSON.parse(await f.text());
    if (!Array.isArray(lista) || lista.some((r) => !r.id || !r.formato || !r.datos)) throw Error("el archivo no es un respaldo de evaluaciones");
    const locales = Almacen.local();
    lista.forEach((r) => {
      if (!locales.some((x) => x.id === r.id)) Almacen.guardarLocal({ ...r, enviado: false, origen: undefined });
    });
    avisoG("Respaldo importado.");
    cargarGuardadas();
  } catch (e) {
    avisoG("No se importó: " + e.message);
  }
};
cargarGuardadas();
