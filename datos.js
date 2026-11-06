// DATOS PUBLICADOS. Números sin comillas y decimales con punto.
// QET: Querétaro | PBC: Puebla | JJC: Atizapán.
const DATOS_INICIALES = {
  cut: "2026-11-05",
  roles: "02–08 nov 2026",
  incidents: "2026-11-01",
  period: "oct-2026",
  blocks: 5,
  duration: 2,
  days: 7,
  totalMono: 19,
  totalBi: 4,
  goMono: 10,
  goBi: 2,
  cancellations: 202,
  trainingNote:
    "IFR/NOC y bimotor se vuelan únicamente en Querétaro. Cap. Carreto y Cap. Castillo, incluidos en los 7 instructores de esa base, también vuelan VFR: su disponibilidad se comparte entre las tres modalidades. No realizan nocturnos toda la semana. Para iniciar bimotor, el alumno debe completar 155 h visuales y 15 h IFR/NOC.",
  maintenanceNote:
    "NCK, OHB y PBH aparecen con 50 h remanentes y observación de servicio en el reporte técnico: validar liberación operativa.",
  bases: [
    {
      name: "QET",
      instructors: 7,
      students: 329,
      hours: 7613.4,
      mono: 6,
      bi: 2,
      assigned: 143,
      unconfirmed: 16,
      cancel: 99,
      near: 175,
      nearHours: 1086.7,
    },
    {
      name: "PBC",
      instructors: 3,
      students: 67,
      hours: 1816.3,
      mono: 2,
      bi: 0,
      assigned: 33,
      unconfirmed: 24,
      cancel: 72,
      near: 36,
      nearHours: 227.1,
    },
    {
      name: "JJC",
      instructors: 2,
      students: 32,
      hours: 1449,
      mono: 2,
      bi: 0,
      assigned: 46,
      unconfirmed: 25,
      cancel: 30,
      near: 8,
      nearHours: 50.7,
    },
  ],
  maintenance: [
    {
      id: "XB-PDL",
      hours: 7.3,
      service: "E2",
    },
    {
      id: "XB-PMJ",
      hours: 27.1,
      service: "E4",
    },
    {
      id: "XB-PDM",
      hours: 32.3,
      service: "E3",
    },
    {
      id: "XB-OGV",
      hours: 35.3,
      service: "E4",
    },
    {
      id: "XB-RHP",
      hours: 36.3,
      service: "E2",
    },
    {
      id: "XB-OWB",
      hours: 36.8,
      service: "E2",
    },
  ],
};

