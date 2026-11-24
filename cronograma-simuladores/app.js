// FUNCIONAMIENTO DEL CRONOGRAMA. Los datos están en datos.js.
const PUBLICADOS = DATOS_INICIALES;
const KEY = "praat-cronograma-simuladores-v1";
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const ESTADOS = ["Programada", "Realizada", "Cancelada"];
const RESULTADOS = ["Pendiente", "Aprobatoria", "No aprobatoria", "No registrado"];
const SIM_ESPECIALES = ["Por confirmar", "No indicado"];

const $ = (id) => document.getElementById(id);
const clone = (x) => JSON.parse(JSON.stringify(x));
const esc = (x) =>
  String(x ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Datos y guardado ---------- */
let data = clone(PUBLICADOS),
  savedAt = null;
try {
  const s = JSON.parse(localStorage.getItem(KEY));
  if (s) {
    validar(s.data);
    data = s.data;
    savedAt = s.savedAt;
  }
} catch {}

function validar(d) {
  if (!d || !Array.isArray(d.instructores) || !Array.isArray(d.evaluaciones))
    throw Error("El archivo no tiene la estructura del cronograma.");
  d.reglas = { ...PUBLICADOS.reglas, ...(d.reglas || {}) };
  if (!Array.isArray(d.simuladores)) d.simuladores = clone(PUBLICADOS.simuladores);
  const ids = new Set();
  d.instructores.forEach((i) => {
    if (typeof i.id !== "string" || typeof i.nombre !== "string" || !Array.isArray(i.simuladores))
      throw Error("Instructor inválido.");
    ids.add(i.id);
  });
  d.evaluaciones.forEach((e) => {
    if (!ids.has(e.instructor)) throw Error("Evaluación con instructor desconocido: " + e.instructor);
    if (!/^\d{4}-\d{2}(-\d{2})?$/.test(e.fecha)) throw Error("Fecha inválida: " + e.fecha);
    if (!ESTADOS.includes(e.estado)) throw Error("Estado inválido: " + e.estado);
    if (!RESULTADOS.includes(e.resultado)) throw Error("Resultado inválido: " + e.resultado);
    if (typeof e.simulador !== "string" || !e.simulador) throw Error("Falta el simulador.");
  });
}

function guardar(d, mensaje = "Cambios guardados en este navegador") {
  validar(d);
  d.actualizado = isoHoy();
  const time = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify({ data: d, savedAt: time }));
  data = d;
  savedAt = time;
  render();
  toast(mensaje);
}

/* ---------- Fechas ---------- */
const pad = (n) => String(n).padStart(2, "0");
function isoHoy() {
  const t = new Date();
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
}
function partes(f) {
  const [y, m, d] = f.split("-").map(Number);
  return { y, m, d: d || null };
}
const mesIdx = (f) => partes(f).y * 12 + partes(f).m - 1;
const hoyIdx = () => mesIdx(isoHoy());
const idxTexto = (i) => `${MESES[i % 12]} ${Math.floor(i / 12)}`;
function fmtFecha(f) {
  const p = partes(f);
  return (p.d ? p.d + " " : "") + MESES[p.m - 1] + " " + p.y;
}
function sumarMeses(f, n) {
  const p = partes(f),
    i = p.y * 12 + p.m - 1 + n,
    y = Math.floor(i / 12),
    m = (i % 12) + 1;
  let s = `${y}-${pad(m)}`;
  if (p.d) s += "-" + pad(Math.min(p.d, new Date(y, m, 0).getDate()));
  return s;
}
function diasHasta(f) {
  const p = partes(f),
    t = new Date();
  t.setHours(0, 0, 0, 0);
  return Math.round((new Date(p.y, p.m - 1, p.d || 1) - t) / 86400000);
}
// Estado de una fecha pendiente (programada o sugerida).
function estadoFecha(f) {
  const i = mesIdx(f),
    h = hoyIdx(),
    p = partes(f);
  if (i < h || (p.d && i === h && diasHasta(f) < 0)) return "Vencida";
  if (i === h) return "Este mes";
  if (diasHasta(f) <= data.reglas.avisoDias) return "Próxima";
  return "Programada";
}

/* ---------- Cálculos ---------- */
const instructor = (id) => data.instructores.find((i) => i.id === id);
const nombre = (id) => instructor(id)?.nombre || id;
const porFecha = (a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0);
function mesesSiguiente(e) {
  if (Number.isFinite(e.siguienteMeses) && e.siguienteMeses > 0) return e.siguienteMeses;
  if (e.resultado === "Aprobatoria") return data.reglas.aprobatoria;
  if (e.resultado === "No aprobatoria") return data.reglas.noAprobatoria;
  return null;
}
// Una asignación = instructor + simulador en el que se evalúa.
function asignaciones() {
  const out = [];
  data.instructores.forEach((ins) =>
    ins.simuladores.forEach((sim) => {
      const evs = data.evaluaciones.filter((e) => e.instructor === ins.id && e.simulador === sim);
      const ultima = evs.filter((e) => e.estado === "Realizada").sort(porFecha).pop() || null;
      const prog = evs.filter((e) => e.estado === "Programada").sort(porFecha)[0] || null;
      let proxima = null,
        estado = "Sin programar",
        sugerida = false;
      if (prog) {
        proxima = prog.fecha;
        estado = estadoFecha(prog.fecha);
      } else if (ultima && mesesSiguiente(ultima)) {
        proxima = sumarMeses(ultima.fecha, mesesSiguiente(ultima));
        sugerida = true;
        estado = estadoFecha(proxima) === "Vencida" ? "Vencida" : "Por programar";
      }
      out.push({ ins, sim, ultima, prog, proxima, estado, sugerida });
    }),
  );
  return out;
}

/* ---------- Presentación ---------- */
const pill = (t) => `<span class="pill" data-estado="${esc(t)}">${esc(t)}</span>`;
const resPill = (t) => `<span class="res" data-resultado="${esc(t)}">${esc(t)}</span>`;
let calInicio = hoyIdx() - 2;

function render() {
  const asig = asignaciones(),
    progs = data.evaluaciones.filter((e) => e.estado === "Programada"),
    h = hoyIdx();
  const vencidas = asig.filter((a) => a.estado === "Vencida").length;
  const sinFecha = asig.filter((a) => !a.prog).length;
  const kpis = [
    ["♙", "Instructores", data.instructores.length, `${asig.length} asignaciones instructor-simulador`],
    ["✓", "Evaluaciones realizadas", data.evaluaciones.filter((e) => e.estado === "Realizada").length, "Historial registrado"],
    ["◷", "Programadas pendientes", progs.length, "Fechas futuras y del mes"],
    ["▦", "Este mes", progs.filter((e) => mesIdx(e.fecha) === h).length, idxTexto(h)],
    ["⚠", "Vencidas", vencidas, "Fecha pasada sin resultado"],
    ["ⓘ", "Sin fecha programada", sinFecha, "Asignaciones por programar"],
  ];
  $("kpis").innerHTML = kpis
    .map(
      ([icon, t, v, s]) =>
        `<article class="kpi"><div class="ktitle"><span class="icon">${icon}</span>${esc(t)}</div><div class="kvalue">${v}</div><small>${esc(s)}</small></article>`,
    )
    .join("");

  $("dates").textContent = `Hoy: ${fmtFecha(isoHoy())} | Última actualización de datos: ${fmtFecha(data.actualizado || PUBLICADOS.actualizado)} | Aviso de próximas: ${data.reglas.avisoDias} días`;
  $("reglas").textContent = `Resultado aprobatorio: siguiente evaluación a ${data.reglas.aprobatoria} meses. Resultado no aprobatorio: siguiente evaluación a ${data.reglas.noAprobatoria} meses. Cada evaluación puede tener su propio intervalo en «Meses hasta la siguiente».`;

  renderProximas(asig);
  renderEstado(asig);
  renderCalendario(asig);
  renderHistorial();

  $("saved").textContent = savedAt
    ? "Último guardado en este navegador: " + new Date(savedAt).toLocaleString("es-MX") + "."
    : "Datos publicados en GitHub (datos.js).";
  $("warning").textContent =
    savedAt && PUBLICADOS.actualizado > (data.actualizado || "")
      ? `Hay datos publicados más recientes (${fmtFecha(PUBLICADOS.actualizado)}). Para verlos, usa «Cargar datos publicados»; exporta antes un JSON si quieres conservar tus cambios locales.`
      : "";
}

function renderProximas(asig) {
  const filas = [
    ...data.evaluaciones
      .filter((e) => e.estado === "Programada")
      .map((e) => ({ fecha: e.fecha, ins: e.instructor, sim: e.simulador, estado: estadoFecha(e.fecha), notas: e.notas, ev: e })),
    ...asig
      .filter((a) => a.sugerida)
      .map((a) => ({
        fecha: a.proxima,
        ins: a.ins.id,
        sim: a.sim,
        estado: a.estado,
        notas: `Sugerida: ${mesesSiguiente(a.ultima)} meses después de la evaluación de ${fmtFecha(a.ultima.fecha)} (${a.ultima.resultado.toLowerCase()}).`,
        sug: true,
      })),
  ].sort(porFecha);
  $("proximas").innerHTML =
    `<thead><tr><th>Instructor</th><th>Fecha</th><th>Simulador</th><th>Estado</th><th>Notas</th><th class="acc">Acción</th></tr></thead><tbody>` +
    (filas.length
      ? filas
          .map(
            (f) => `<tr><td>${esc(nombre(f.ins))}</td><td><b>${fmtFecha(f.fecha)}</b></td><td>${esc(f.sim)}</td><td>${pill(f.sug && f.estado !== "Vencida" ? "Por programar" : f.estado)}</td><td class="txt">${esc(f.notas)}</td><td class="acc">${
              f.sug
                ? `<button class="mini" data-programar="${esc(f.ins)}|${esc(f.sim)}|${f.fecha}">Programar</button>`
                : `<button class="mini primary" data-resultado="${esc(f.ev.id)}">Registrar resultado</button> <button class="mini" data-editar="${esc(f.ev.id)}" aria-label="Editar">✎</button>`
            }</td></tr>`,
          )
          .join("")
      : `<tr><td colspan="6">Sin evaluaciones programadas.</td></tr>`) +
    "</tbody>";
}

function renderEstado(asig) {
  let html = `<thead><tr><th>Instructor</th><th>Simulador</th><th>Última evaluación</th><th>Resultado</th><th>Próxima</th><th>Estado</th></tr></thead><tbody>`;
  data.instructores.forEach((ins) => {
    const filas = asig.filter((a) => a.ins.id === ins.id);
    const otras = data.evaluaciones.filter((e) => e.instructor === ins.id && e.estado === "Realizada").sort(porFecha);
    const ultimaGeneral = otras[otras.length - 1];
    filas.forEach((a, k) => {
      const ult = a.ultima || (ultimaGeneral && !ins.simuladores.includes(ultimaGeneral.simulador) ? ultimaGeneral : null);
      html += `<tr>${
        k === 0
          ? `<td rowspan="${filas.length}">${esc(ins.nombre)} <button class="mini edit-ins" data-instructor="${esc(ins.id)}" aria-label="Editar instructor">✎</button></td>`
          : ""
      }<td>${esc(a.sim)}</td><td>${ult ? fmtFecha(ult.fecha) + (ult !== a.ultima ? `<br><small>(${esc(ult.simulador)})</small>` : "") : "—"}</td><td>${ult ? resPill(ult.resultado) : "—"}</td><td>${a.proxima ? `<b>${fmtFecha(a.proxima)}</b>${a.sugerida ? "<br><small>sugerida</small>" : ""}` : "—"}</td><td>${pill(a.estado)}</td></tr>`;
    });
  });
  $("estado").innerHTML = html + "</tbody>";
}

function renderCalendario(asig) {
  const n = window.innerWidth < 650 ? 6 : 12,
    meses = Array.from({ length: n }, (_, k) => calInicio + k),
    h = hoyIdx();
  // Filas: asignaciones vigentes y combinaciones que solo aparecen en el historial.
  const filas = asig.map((a) => ({ ins: a.ins, sim: a.sim, a }));
  data.evaluaciones.forEach((e) => {
    if (!filas.some((f) => f.ins.id === e.instructor && f.sim === e.simulador))
      filas.push({ ins: instructor(e.instructor), sim: e.simulador, a: null });
  });
  const orden = data.instructores.map((i) => i.id);
  filas.sort((x, y) => orden.indexOf(x.ins.id) - orden.indexOf(y.ins.id));
  let html = `<thead><tr><th class="cal-nombre">Instructor · simulador</th>${meses
    .map((m) => `<th class="${m === h ? "hoy" : ""}">${idxTexto(m)}</th>`)
    .join("")}</tr></thead><tbody>`;
  filas.forEach((f) => {
    html += `<tr><td class="cal-nombre">${esc(f.ins.nombre)}<br><small>${esc(f.sim)}</small></td>`;
    meses.forEach((m) => {
      const evs = data.evaluaciones.filter(
        (e) => e.instructor === f.ins.id && e.simulador === f.sim && e.estado !== "Cancelada" && mesIdx(e.fecha) === m,
      );
      let marcas = evs
        .map((e) => {
          const fecha = fmtFecha(e.fecha);
          if (e.estado === "Realizada") {
            const cls = e.resultado === "Aprobatoria" ? "ok" : e.resultado === "No aprobatoria" ? "bad" : "done";
            return `<span class="mk ${cls}" title="${esc(`${fecha} · Realizada · ${e.resultado}`)}">${cls === "bad" ? "✗" : "✓"}</span>`;
          }
          const late = estadoFecha(e.fecha) === "Vencida";
          return `<span class="mk ${late ? "late" : "prog"}" title="${esc(`${fecha} · ${late ? "Vencida" : "Programada"}`)}">●</span>`;
        })
        .join("");
      if (f.a?.sugerida && mesIdx(f.a.proxima) === m)
        marcas += `<span class="mk sug" title="${esc("Sugerida · " + fmtFecha(f.a.proxima))}">◌</span>`;
      html += `<td class="${m === h ? "hoy" : ""}">${marcas}</td>`;
    });
    html += "</tr>";
  });
  $("calendario").innerHTML = html + "</tbody>";
}

function opciones(lista, sel, todas) {
  return (todas ? `<option value="">${todas}</option>` : "") +
    lista.map((v) => {
      const [val, txt] = Array.isArray(v) ? v : [v, v];
      return `<option value="${esc(val)}" ${val === sel ? "selected" : ""}>${esc(txt)}</option>`;
    }).join("");
}
function todosSimuladores() {
  const s = new Set([...data.simuladores]);
  data.instructores.forEach((i) => i.simuladores.forEach((x) => s.add(x)));
  data.evaluaciones.forEach((e) => s.add(e.simulador));
  SIM_ESPECIALES.forEach((x) => s.delete(x));
  return [...s, ...SIM_ESPECIALES];
}
function renderHistorial() {
  const fi = $("f-instructor").value,
    fs = $("f-simulador").value,
    fe = $("f-estado").value;
  $("f-instructor").innerHTML = opciones(data.instructores.map((i) => [i.id, i.nombre]), fi, "Todos");
  $("f-simulador").innerHTML = opciones(todosSimuladores(), fs, "Todos");
  $("f-estado").innerHTML = opciones(ESTADOS, fe, "Todos");
  const lista = data.evaluaciones
    .filter((e) => (!fi || e.instructor === fi) && (!fs || e.simulador === fs) && (!fe || e.estado === fe))
    .sort(porFecha)
    .reverse();
  $("historial").innerHTML =
    `<thead><tr><th>Instructor</th><th>Fecha</th><th>Simulador</th><th>Estado</th><th>Resultado</th><th>Siguiente</th><th>Evaluador</th><th>Notas</th><th class="acc">Acción</th></tr></thead><tbody>` +
    (lista.length
      ? lista
          .map((e) => {
            const m = e.estado === "Realizada" ? mesesSiguiente(e) : null;
            return `<tr class="${e.estado === "Cancelada" ? "cancelada" : ""}"><td>${esc(nombre(e.instructor))}</td><td><b>${fmtFecha(e.fecha)}</b></td><td>${esc(e.simulador)}</td><td>${pill(e.estado === "Programada" ? estadoFecha(e.fecha) : e.estado)}</td><td>${resPill(e.resultado)}</td><td>${m ? `${m} meses<br><small>${fmtFecha(sumarMeses(e.fecha, m))}</small>` : "—"}</td><td>${esc(e.evaluador) || "—"}</td><td class="txt">${esc(e.notas)}</td><td class="acc"><button class="mini" data-editar="${esc(e.id)}" aria-label="Editar">✎</button></td></tr>`;
          })
          .join("")
      : `<tr><td colspan="9">No hay evaluaciones con esos filtros.</td></tr>`) +
    "</tbody>";
}

/* ---------- Editor de evaluaciones ---------- */
const fEv = $("form-evaluacion");
let editando = null;
function simuladoresPara(insId, actual) {
  const propios = instructor(insId)?.simuladores || [];
  const resto = todosSimuladores().filter((s) => !propios.includes(s));
  const lista = [...propios, ...resto];
  if (actual && !lista.includes(actual)) lista.unshift(actual);
  return lista;
}
function abrirEvaluacion(ev, preset = {}) {
  editando = ev ? ev.id : null;
  const e = { instructor: data.instructores[0]?.id, simulador: "", fecha: isoHoy().slice(0, 7), estado: "Programada", resultado: "Pendiente", siguienteMeses: null, evaluador: "", notas: "", ...(ev || {}), ...preset };
  $("ev-titulo").textContent = ev ? "Editar evaluación" : "Registrar evaluación";
  $("ev-borrar").hidden = !ev;
  fEv.instructor.innerHTML = opciones(data.instructores.map((i) => [i.id, i.nombre]), e.instructor);
  fEv.simulador.innerHTML = opciones(simuladoresPara(e.instructor, e.simulador), e.simulador || instructor(e.instructor)?.simuladores[0]);
  fEv.estado.innerHTML = opciones(ESTADOS, e.estado);
  fEv.resultado.innerHTML = opciones(RESULTADOS, e.resultado);
  const p = partes(e.fecha);
  fEv.mes.value = `${p.y}-${pad(p.m)}`;
  fEv.dia.value = p.d || "";
  fEv.siguienteMeses.value = e.siguienteMeses ?? "";
  fEv.evaluador.value = e.evaluador || "";
  fEv.notas.value = e.notas || "";
  fEv.auto.checked = true;
  actualizarAyuda();
  $("dlg-evaluacion").showModal();
}
function actualizarAyuda() {
  const res = fEv.resultado.value,
    regla = res === "Aprobatoria" ? data.reglas.aprobatoria : res === "No aprobatoria" ? data.reglas.noAprobatoria : null;
  fEv.siguienteMeses.placeholder = regla ? `Según regla: ${regla}` : "Sin regla para este resultado";
  const meses = Number(fEv.siguienteMeses.value) || regla;
  const visible = fEv.estado.value === "Realizada" && meses && fEv.mes.value;
  $("auto-wrap").hidden = !visible;
  if (visible) {
    const f = fEv.mes.value + (fEv.dia.value ? "-" + pad(fEv.dia.value) : "");
    $("auto-texto").textContent = `Programar automáticamente la siguiente evaluación: ${fmtFecha(sumarMeses(f, meses))} (${meses} meses)`;
  }
}
fEv.instructor.onchange = () => {
  fEv.simulador.innerHTML = opciones(simuladoresPara(fEv.instructor.value), instructor(fEv.instructor.value)?.simuladores[0]);
};
fEv.estado.onchange = () => {
  if (fEv.estado.value === "Programada") fEv.resultado.value = "Pendiente";
  actualizarAyuda();
};
for (const n of ["resultado", "siguienteMeses", "mes", "dia"]) fEv[n].addEventListener("input", actualizarAyuda);

fEv.onsubmit = (ev) => {
  ev.preventDefault();
  const dia = fEv.dia.value ? Number(fEv.dia.value) : null;
  const [y, m] = fEv.mes.value.split("-").map(Number);
  if (dia && dia > new Date(y, m, 0).getDate()) return toast("Ese día no existe en el mes elegido.");
  const e = {
    id: editando || "ev-" + Date.now().toString(36),
    instructor: fEv.instructor.value,
    simulador: fEv.simulador.value,
    fecha: fEv.mes.value + (dia ? "-" + pad(dia) : ""),
    estado: fEv.estado.value,
    resultado: fEv.resultado.value,
    siguienteMeses: fEv.siguienteMeses.value ? Number(fEv.siguienteMeses.value) : null,
    evaluador: fEv.evaluador.value.trim(),
    notas: fEv.notas.value.trim(),
  };
  if (e.estado === "Realizada" && e.resultado === "Pendiente")
    return toast("Indica el resultado o elige «No registrado».");
  const d = clone(data);
  const i = d.evaluaciones.findIndex((x) => x.id === e.id);
  if (i >= 0) d.evaluaciones[i] = e;
  else d.evaluaciones.push(e);
  let msg = "Evaluación guardada en este navegador";
  const meses = mesesSiguiente(e);
  if (e.estado === "Realizada" && meses && !$("auto-wrap").hidden && fEv.auto.checked) {
    const yaHay = d.evaluaciones.some(
      (x) => x.id !== e.id && x.estado === "Programada" && x.instructor === e.instructor && x.simulador === e.simulador && x.fecha > e.fecha,
    );
    if (yaHay) msg += ". Ya existía una siguiente evaluación programada; no se creó otra";
    else {
      const sig = sumarMeses(e.fecha, meses);
      d.evaluaciones.push({
        id: "ev-" + (Date.now() + 1).toString(36),
        instructor: e.instructor,
        simulador: e.simulador,
        fecha: sig,
        estado: "Programada",
        resultado: "Pendiente",
        siguienteMeses: null,
        evaluador: "",
        notas: `Generada automáticamente: ${meses} meses después de la evaluación de ${fmtFecha(e.fecha)} (${e.resultado.toLowerCase()}).`,
      });
      msg += `. Siguiente programada: ${fmtFecha(sig)}`;
    }
  }
  try {
    guardar(d, msg);
    $("dlg-evaluacion").close();
  } catch (err) {
    toast(err.message);
  }
};
$("ev-borrar").onclick = () => {
  if (!editando || !confirm("¿Eliminar esta evaluación del cronograma?")) return;
  const d = clone(data);
  d.evaluaciones = d.evaluaciones.filter((x) => x.id !== editando);
  guardar(d, "Evaluación eliminada");
  $("dlg-evaluacion").close();
};

/* ---------- Editor de instructores ---------- */
const fIn = $("form-instructor");
let editandoIns = null;
function abrirInstructor(id) {
  editandoIns = id || null;
  const ins = id ? instructor(id) : { nombre: "", simuladores: [] };
  $("in-titulo").textContent = id ? "Editar instructor" : "Nuevo instructor";
  $("in-borrar").hidden = !id;
  fIn.nombre.value = ins.nombre;
  fIn.otros.value = "";
  $("in-sims").innerHTML = [...new Set([...todosSimuladores().filter((s) => s !== "No indicado"), ...ins.simuladores])]
    .map((s) => `<label class="check"><input type="checkbox" value="${esc(s)}" ${ins.simuladores.includes(s) ? "checked" : ""}/> ${esc(s)}</label>`)
    .join("");
  $("dlg-instructor").showModal();
}
fIn.onsubmit = (ev) => {
  ev.preventDefault();
  const otros = fIn.otros.value.split(",").map((s) => s.trim()).filter(Boolean);
  const sims = [...new Set([...[...$("in-sims").querySelectorAll("input:checked")].map((c) => c.value), ...otros])];
  if (!sims.length) return toast("Marca al menos un simulador (o «Por confirmar»).");
  const d = clone(data);
  otros.forEach((s) => !d.simuladores.includes(s) && d.simuladores.push(s));
  const nombreNuevo = fIn.nombre.value.trim();
  if (editandoIns) {
    const ins = d.instructores.find((i) => i.id === editandoIns);
    ins.nombre = nombreNuevo;
    ins.simuladores = sims;
  } else {
    let id = nombreNuevo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/^cap\.?\s*/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "instructor";
    while (d.instructores.some((i) => i.id === id)) id += "-2";
    d.instructores.push({ id, nombre: nombreNuevo, simuladores: sims });
  }
  try {
    guardar(d, "Instructor guardado");
    $("dlg-instructor").close();
  } catch (err) {
    toast(err.message);
  }
};
$("in-borrar").onclick = () => {
  if (!editandoIns) return;
  const n = data.evaluaciones.filter((e) => e.instructor === editandoIns).length;
  if (n) return toast(`Tiene ${n} evaluaciones registradas. Elimínalas primero para conservar el historial completo.`);
  if (!confirm("¿Eliminar este instructor?")) return;
  const d = clone(data);
  d.instructores = d.instructores.filter((i) => i.id !== editandoIns);
  guardar(d, "Instructor eliminado");
  $("dlg-instructor").close();
};

/* ---------- Botones y eventos ---------- */
function toast(t) {
  $("toast").textContent = t;
  $("toast").style.display = "block";
  clearTimeout(toast.t);
  toast.t = setTimeout(() => ($("toast").style.display = "none"), 4500);
}
function descargar(nombreArchivo, texto, tipo) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([texto], { type: tipo }));
  a.download = nombreArchivo;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button");
  if (!b) return;
  if (b.classList.contains("cerrar")) b.closest("dialog").close();
  if (b.dataset.editar) abrirEvaluacion(data.evaluaciones.find((e) => e.id === b.dataset.editar));
  if (b.dataset.resultado)
    abrirEvaluacion(data.evaluaciones.find((e) => e.id === b.dataset.resultado), { estado: "Realizada", resultado: "Aprobatoria" });
  if (b.dataset.programar) {
    const [ins, sim, fecha] = b.dataset.programar.split("|");
    abrirEvaluacion(null, { instructor: ins, simulador: sim, fecha, notas: "Programada según la regla de estandarización." });
  }
  if (b.dataset.instructor) abrirInstructor(b.dataset.instructor);
});
$("nueva").onclick = $("nueva-2").onclick = () => abrirEvaluacion(null);
$("nuevo-instructor").onclick = () => abrirInstructor(null);
for (const id of ["f-instructor", "f-simulador", "f-estado"]) $(id).onchange = renderHistorial;
$("cal-prev").onclick = () => ((calInicio -= 3), render());
$("cal-next").onclick = () => ((calInicio += 3), render());
$("cal-hoy").onclick = () => ((calInicio = hoyIdx() - 2), render());
$("export").onclick = () =>
  descargar(`cronograma-simuladores-${isoHoy()}.json`, JSON.stringify(data, null, 2), "application/json");
$("import").onchange = async (ev) => {
  const file = ev.target.files[0];
  ev.target.value = "";
  if (!file) return;
  try {
    guardar(JSON.parse(await file.text()), "JSON importado y guardado en este navegador");
  } catch (err) {
    toast("No se importó: " + err.message);
  }
};
$("descargar-datos").onclick = () => {
  const d = clone(data);
  d.actualizado = isoHoy();
  const cabecera = `// DATOS PUBLICADOS DEL CRONOGRAMA. Edita aquí o reemplaza este archivo con
// el que descarga el botón «Descargar datos.js» del cronograma.
//
// Fechas: "AAAA-MM" cuando solo se conoce el mes; "AAAA-MM-DD" con día.
// estado: "Programada" | "Realizada" | "Cancelada"
// resultado: "Pendiente" | "Aprobatoria" | "No aprobatoria" | "No registrado"
// siguienteMeses: meses hasta la siguiente evaluación (vacío = según regla).
`;
  descargar("datos.js", cabecera + "const DATOS_INICIALES = " + JSON.stringify(d, null, 2) + ";\n", "text/javascript");
  toast("Sube este datos.js a la carpeta cronograma-simuladores en GitHub para publicarlo.");
};
$("reset").onclick = () => {
  if (!confirm("Esto reemplaza los cambios guardados en este navegador por los datos publicados. ¿Continuar?")) return;
  localStorage.removeItem(KEY);
  data = clone(PUBLICADOS);
  savedAt = null;
  render();
  toast("Datos publicados cargados");
};
$("full").onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    toast("Utiliza F11 para pantalla completa.");
  }
};
let anchoPrevio = window.innerWidth < 650;
window.addEventListener("resize", () => {
  const ahora = window.innerWidth < 650;
  if (ahora !== anchoPrevio) ((anchoPrevio = ahora), render());
});

render();
