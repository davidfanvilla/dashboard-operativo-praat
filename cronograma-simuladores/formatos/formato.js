// Construye un formato a partir de FORMATO (definido en cada página HTML).
// El contenido de cada formato reproduce el archivo Word original sin cambios.
const F = FORMATO;
const KEY = "praat-formato-" + F.id;
const KEY_CRONO = "praat-cronograma-simuladores-v1";
const BLANCO = new URLSearchParams(location.search).has("blanco");
const esc = (x) =>
  String(x ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const pad = (n) => String(n).padStart(2, "0");
const $ = (s) => document.querySelector(s);

/* ---------- Datos del cronograma (para sugerir nombres y registrar) ---------- */
function cronoData() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY_CRONO));
    if (s && s.data) return s.data;
  } catch {}
  return typeof DATOS_INICIALES !== "undefined" ? JSON.parse(JSON.stringify(DATOS_INICIALES)) : null;
}

/* ---------- Construcción del formato ---------- */
function campo(c) {
  const lab = `<b>${esc(c.label)}</b>`;
  if (c.tipo === "fecha")
    return `<label>${lab}<input class="dd" name="${c.name}_d" inputmode="numeric" maxlength="2" placeholder="____" aria-label="Día"> / <input class="dd" name="${c.name}_m" inputmode="numeric" maxlength="2" placeholder="____" aria-label="Mes"> / <input class="aaaa" name="${c.name}_a" inputmode="numeric" maxlength="4" placeholder="______" aria-label="Año"></label>`;
  if (c.tipo === "opciones")
    return `<label>${lab}<span class="opciones" data-name="${c.name}">${c.opciones
      .map((o, i) => `${i ? "/" : ""}<button type="button" class="opcion" data-valor="${esc(o)}">${esc(o)}</button>`)
      .join("")}</span></label>`;
  const lista = c.lista ? ` list="lista-${c.lista}"` : "";
  return `<label>${lab}<input class="largo" name="${c.name}"${lista} autocomplete="off"></label>`;
}
function filasLista(secciones, p) {
  return secciones
    .map((s, si) => {
      let h = `<tr class="sec"><td colspan="4">${esc(s.titulo)}</td></tr>`;
      s.items.forEach((item, k) => {
        const id = `p${p}s${si}i${k}`;
        const etiqueta = item === "" ? `<td class="l"><input name="${id}_txt" aria-label="Renglón libre"></td>` : `<td>${esc(item)}</td>`;
        h += `<tr>${etiqueta}<td class="c"><button type="button" class="marca" data-name="${id}" data-col="S" aria-label="S: ${esc(item)}"></button></td><td class="c"><button type="button" class="marca" data-name="${id}" data-col="T" aria-label="T: ${esc(item)}"></button></td><td class="o"><input name="${id}_obs" aria-label="Observaciones: ${esc(item)}"></td></tr>`;
      });
      return h;
    })
    .join("");
}
const colgroup = `<colgroup><col><col class="c"><col class="c"><col class="o"></colgroup>`;
const cabeceraLista = `<thead><tr><th></th><th>S</th><th>T</th><th>Observaciones</th></tr></thead>`;

function construir() {
  const [p1, p2] = F.paginas;
  const n = F.paginas.length;
  let html = `<section class="hoja" data-pagina="Página 1 de ${n}">
    <div class="enc"><img src="logo-praat.png" alt="PRAAT Escuela de Vuelo">
      <div class="titulos">${F.titulos.map((t) => `<span class="t">${esc(t)}</span>`).join("")}${F.subtitulos
        .map((s) => `<span class="s ${s.color}" style="font-size:${s.tam || "8.5pt"}">${esc(s.texto)}</span>`)
        .join("")}</div></div>
    <table class="control"><tr><td colspan="2" class="cab">DATOS DE CONTROL</td></tr>${F.control
      .map((fila) => `<tr>${fila.map((c) => `<td>${campo(c)}</td>`).join("")}</tr>`)
      .join("")}</table>
    ${F.leyenda ? `<p class="leyenda">${esc(F.leyenda)}</p>` : ""}
    <table class="lista">${colgroup}${cabeceraLista}<tbody>${filasLista(p1.secciones, 1)}</tbody></table>
  </section>
  <section class="hoja" data-pagina="Página 2 de ${n}">
    <p class="enc2">${esc(p2.encabezado)}</p>
    <table class="lista">${colgroup}${p2.cabecera ? cabeceraLista : ""}<tbody>${filasLista(p2.secciones, 2)}</tbody></table>
    <p class="obs-tit">OBSERVACIONES</p>
    <textarea class="obs" name="observaciones" aria-label="Observaciones"></textarea>
    <hr class="linea">
    <p class="firma-de">${esc(F.firmas.titulo)}</p>
    <div class="firmas">${F.firmas.nombres
      .map(
        (nom, i) =>
          `<div><canvas data-firma="firma${i}" width="600" height="190" aria-label="Firma de ${esc(nom)}"></canvas><b>${esc(nom)}</b><button type="button" class="borrar-firma" data-borrar="firma${i}">Borrar firma</button></div>`,
      )
      .join("")}</div>
  </section>`;
  $("#formato").innerHTML = html;

  // Listas de sugerencias con los instructores y simuladores del cronograma.
  const d = cronoData();
  if (d) {
    const sims = [...new Set([...(d.simuladores || []), ...d.instructores.flatMap((i) => i.simuladores)])].filter(
      (s) => s !== "Por confirmar",
    );
    document.body.insertAdjacentHTML(
      "beforeend",
      `<datalist id="lista-instructores">${d.instructores.map((i) => `<option value="${esc(i.nombre)}">`).join("")}</datalist>
       <datalist id="lista-simuladores">${sims.map((s) => `<option value="${esc(s)}">`).join("")}</datalist>`,
    );
  }
}

/* ---------- Estado, guardado automático y llenado ---------- */
let estado = {};
function cargar() {
  if (BLANCO) return;
  try {
    estado = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    estado = {};
  }
  if (!Object.keys(estado).length) estado = nuevoEstado();
}
function nuevoEstado() {
  const e = {};
  for (const fila of F.control)
    for (const c of fila) {
      if (c.valor) e[c.name] = c.valor;
      if (c.tipo === "fecha") {
        const t = new Date();
        e[c.name + "_d"] = pad(t.getDate());
        e[c.name + "_m"] = pad(t.getMonth() + 1);
        e[c.name + "_a"] = String(t.getFullYear());
      }
    }
  return e;
}
function guardar() {
  if (BLANCO) return;
  localStorage.setItem(KEY, JSON.stringify(estado));
  $("#guardado").textContent = "Borrador guardado en este navegador · " + new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}
function pintar() {
  document.querySelectorAll("#formato input, #formato textarea").forEach((el) => (el.value = estado[el.name] ?? ""));
  // Valores fijos del original (por ejemplo «13 / 23») se muestran también en blanco.
  if (BLANCO) for (const fila of F.control) for (const c of fila) if (c.valor) document.querySelector(`[name="${c.name}"]`).value = c.valor;
  document.querySelectorAll(".marca").forEach((b) => (b.textContent = estado[b.dataset.name] === b.dataset.col ? "✓" : ""));
  document.querySelectorAll(".opciones").forEach((g) =>
    g.querySelectorAll(".opcion").forEach((o) => o.classList.toggle("sel", estado[g.dataset.name] === o.dataset.valor)),
  );
  document.querySelectorAll("canvas[data-firma]").forEach((cv) => {
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (estado[cv.dataset.firma]) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = estado[cv.dataset.firma];
    }
  });
}
function eventos() {
  $("#formato").addEventListener("input", (e) => {
    if (!e.target.name) return;
    estado[e.target.name] = e.target.value;
    guardar();
  });
  $("#formato").addEventListener("click", (e) => {
    const m = e.target.closest(".marca");
    if (m) {
      estado[m.dataset.name] = estado[m.dataset.name] === m.dataset.col ? "" : m.dataset.col;
      pintar();
      guardar();
    }
    const o = e.target.closest(".opcion");
    if (o) {
      const g = o.closest(".opciones").dataset.name;
      estado[g] = estado[g] === o.dataset.valor ? "" : o.dataset.valor;
      pintar();
      guardar();
      actualizarRegistro();
    }
    const b = e.target.closest("[data-borrar]");
    if (b) {
      delete estado[b.dataset.borrar];
      pintar();
      guardar();
    }
  });
  // Firmas con mouse, dedo o lápiz.
  document.querySelectorAll("canvas[data-firma]").forEach((cv) => {
    const ctx = cv.getContext("2d");
    let dibujando = false;
    const punto = (ev) => {
      const r = cv.getBoundingClientRect();
      return [((ev.clientX - r.left) * cv.width) / r.width, ((ev.clientY - r.top) * cv.height) / r.height];
    };
    cv.addEventListener("pointerdown", (ev) => {
      dibujando = true;
      cv.setPointerCapture(ev.pointerId);
      ctx.lineWidth = 3;
      ctx.lineCap = ctx.lineJoin = "round";
      ctx.strokeStyle = "#08214f";
      ctx.beginPath();
      ctx.moveTo(...punto(ev));
    });
    cv.addEventListener("pointermove", (ev) => {
      if (!dibujando) return;
      ctx.lineTo(...punto(ev));
      ctx.stroke();
    });
    const fin = () => {
      if (!dibujando) return;
      dibujando = false;
      estado[cv.dataset.firma] = cv.toDataURL("image/png");
      guardar();
    };
    cv.addEventListener("pointerup", fin);
    cv.addEventListener("pointercancel", fin);
  });
  $("#imprimir").onclick = () => window.print();
  $("#blanco").onclick = () => window.open(location.pathname + "?blanco=1", "_blank");
  $("#nuevo").onclick = () => {
    if (!confirm("¿Borrar lo capturado y empezar un formato nuevo? Imprime o guarda en PDF antes si lo necesitas.")) return;
    estado = nuevoEstado();
    pintar();
    guardar();
    actualizarRegistro();
  };
  if (F.cronograma) {
    $("#formato").addEventListener("input", actualizarRegistro);
    $("#reg-btn").onclick = registrar;
  }
}

/* ---------- Registro de la supervisión en el cronograma ---------- */
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fmtFecha = (f) => {
  const [y, m, d] = f.split("-").map(Number);
  return (d ? d + " " : "") + MESES[m - 1] + " " + y;
};
function sumarMeses(f, n) {
  const [y0, m0, d0] = f.split("-").map(Number),
    i = y0 * 12 + m0 - 1 + n,
    y = Math.floor(i / 12),
    m = (i % 12) + 1;
  return `${y}-${pad(m)}` + (d0 ? "-" + pad(Math.min(d0, new Date(y, m, 0).getDate())) : "");
}
function datosRegistro() {
  const c = F.cronograma,
    d = cronoData();
  const ins = d?.instructores.find((i) => norm(i.nombre) === norm(estado[c.instructor]));
  const dd = Number(estado[c.fecha + "_d"]),
    mm = Number(estado[c.fecha + "_m"]),
    aa = Number(estado[c.fecha + "_a"]);
  const fechaOk = aa > 2000 && mm >= 1 && mm <= 12 && dd >= 1 && dd <= new Date(aa, mm, 0).getDate();
  const meses = c.meses[estado[c.proxima]] || null;
  return { d, ins, fecha: fechaOk ? `${aa}-${pad(mm)}-${pad(dd)}` : null, meses };
}
function actualizarRegistro() {
  if (!F.cronograma || BLANCO) return;
  const { d, ins, fecha, meses } = datosRegistro();
  const sel = $("#reg-sim"),
    previo = sel.value;
  const sims = ins ? [...ins.simuladores.filter((s) => s !== "Por confirmar"), ...(d.simuladores || []).filter((s) => !ins.simuladores.includes(s))] : d?.simuladores || [];
  sel.innerHTML = sims.map((s) => `<option ${s === previo ? "selected" : ""}>${esc(s)}</option>`).join("");
  const faltan = [];
  if (!ins) faltan.push("un instructor que exista en el cronograma (elígelo de la lista)");
  if (!fecha) faltan.push("la fecha completa");
  if (!meses) faltan.push("«Proxima supervision: 3 m / 6 m»");
  $("#reg-info").innerHTML = faltan.length
    ? "Para registrar falta: " + faltan.join(", ") + "."
    : `Se registrará como <b>${meses === 6 ? "aprobatoria" : "no aprobatoria"}</b> el ${fmtFecha(fecha)} y se programará la siguiente supervisión para <b>${fmtFecha(sumarMeses(fecha, meses))}</b>.`;
  $("#reg-btn").disabled = faltan.length > 0;
}
function registrar() {
  const c = F.cronograma;
  const { d, ins, fecha, meses } = datosRegistro();
  const sim = $("#reg-sim").value;
  if (!d || !ins || !fecha || !meses || !sim) return actualizarRegistro();
  const resultado = meses === 6 ? "Aprobatoria" : "No aprobatoria";
  const mismo = (e) => e.instructor === ins.id && e.simulador === sim;
  if (d.evaluaciones.some((e) => mismo(e) && e.estado === "Realizada" && e.fecha === fecha))
    return toast("Esta supervisión ya está registrada en el cronograma.");
  const detalle = [
    estado[c.supervisor] && "Verificador: " + estado[c.supervisor],
    estado[c.sesion] && "Sesión " + estado[c.sesion],
    estado[c.matricula] && "Matrícula " + estado[c.matricula],
  ]
    .filter(Boolean)
    .join(". ");
  const nota = "Registrada desde el formato de supervisión" + (detalle ? ". " + detalle : "") + ".";
  const mes = fecha.slice(0, 7);
  // Si había una evaluación programada para ese simulador (o «Por confirmar»), se marca como realizada.
  const prog =
    d.evaluaciones.filter((e) => mismo(e) && e.estado === "Programada" && e.fecha.slice(0, 7) <= mes).sort((a, b) => (a.fecha < b.fecha ? -1 : 1))[0] ||
    d.evaluaciones.find((e) => e.instructor === ins.id && e.simulador === "Por confirmar" && e.estado === "Programada" && e.fecha.slice(0, 7) <= mes);
  const registro = { fecha, simulador: sim, estado: "Realizada", resultado, siguienteMeses: meses, evaluador: estado[c.supervisor] || "" };
  if (prog) Object.assign(prog, registro, { notas: (prog.notas ? prog.notas + " " : "") + nota });
  else d.evaluaciones.push({ id: "ev-" + Date.now().toString(36), instructor: ins.id, ...registro, notas: nota });
  const insD = d.instructores.find((i) => i.id === ins.id);
  if (!insD.simuladores.includes(sim)) insD.simuladores = [...insD.simuladores.filter((s) => s !== "Por confirmar"), sim];
  const sig = sumarMeses(fecha, meses);
  let extra = "";
  if (!d.evaluaciones.some((e) => mismo(e) && e.estado === "Programada" && e.fecha > fecha)) {
    d.evaluaciones.push({
      id: "ev-" + (Date.now() + 1).toString(36),
      instructor: ins.id,
      simulador: sim,
      fecha: sig,
      estado: "Programada",
      resultado: "Pendiente",
      siguienteMeses: null,
      evaluador: "",
      notas: `Generada automáticamente: ${meses} meses después de la supervisión del ${fmtFecha(fecha)} (${resultado.toLowerCase()}).`,
    });
    extra = ` Siguiente: ${fmtFecha(sig)}.`;
  }
  const t = new Date();
  d.actualizado = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  localStorage.setItem(KEY_CRONO, JSON.stringify({ data: d, savedAt: t.toISOString() }));
  toast(`Registrada en el cronograma de este navegador.${extra} <a href="../">Ver cronograma</a>`, true);
}

function toast(t, html) {
  const el = $("#toast");
  el[html ? "innerHTML" : "textContent"] = t;
  el.style.display = "block";
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (el.style.display = "none"), 6000);
}

construir();
cargar();
pintar();
eventos();
actualizarRegistro();
if (BLANCO) {
  $("#guardado").textContent = "Formato en blanco: no se guarda nada.";
  document.querySelector(".registro")?.remove();
  document.title += " (en blanco)";
  setTimeout(() => window.print(), 400);
}
