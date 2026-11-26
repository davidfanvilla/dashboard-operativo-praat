// Evaluaciones guardadas: en este navegador y, si config.js tiene la URL,
// también en la hoja de Google Sheets para verlas desde cualquier equipo.
const ALMACEN_KEY = "praat-formatos-guardados";
const Almacen = {
  url: typeof PRAAT_SHEETS_URL === "string" ? PRAAT_SHEETS_URL.trim() : "",
  local() {
    try {
      return JSON.parse(localStorage.getItem(ALMACEN_KEY)) || [];
    } catch {
      return [];
    }
  },
  escribir(lista) {
    try {
      localStorage.setItem(ALMACEN_KEY, JSON.stringify(lista));
    } catch {
      throw Error("No hay espacio en este navegador. Exporta un respaldo y elimina evaluaciones antiguas.");
    }
  },
  guardarLocal(r) {
    const l = this.local(),
      i = l.findIndex((x) => x.id === r.id);
    if (i >= 0) l[i] = r;
    else l.push(r);
    this.escribir(l);
  },
  borrarLocal(id) {
    this.escribir(this.local().filter((x) => x.id !== id));
  },
  // Envía (o elimina) un registro en Google Sheets. Devuelve false si no hay URL.
  async enviar(r, eliminar = false) {
    if (!this.url) return false;
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(eliminar ? { id: r.id, eliminar: true } : r),
    });
    const j = await res.json();
    if (!j.ok) throw Error(j.error || "Google Sheets no aceptó el registro.");
    return true;
  },
  async remotos() {
    if (!this.url) return [];
    const res = await fetch(this.url + (this.url.includes("?") ? "&" : "?") + "t=" + Date.now());
    const j = await res.json();
    if (!j.ok) throw Error(j.error || "No se pudo leer Google Sheets.");
    return (j.registros || []).map((r) => ({ ...r, enviado: true }));
  },
  // Une lo local y lo remoto; si un registro local tiene cambios sin enviar, gana el local.
  async todos() {
    const mapa = new Map();
    let error = null;
    try {
      (await this.remotos()).forEach((r) => mapa.set(r.id, { ...r, origen: "Google Sheets" }));
    } catch (e) {
      error = e;
    }
    this.local().forEach((r) => {
      const remoto = mapa.get(r.id);
      if (!remoto || !r.enviado || r.actualizado > remoto.actualizado) mapa.set(r.id, { ...r, origen: remoto ? "Google Sheets" : "Este equipo" });
    });
    return { registros: [...mapa.values()], error };
  },
  async buscar(id) {
    const l = this.local().find((x) => x.id === id);
    if (l) return l;
    return (await this.remotos()).find((x) => x.id === id) || null;
  },
};
