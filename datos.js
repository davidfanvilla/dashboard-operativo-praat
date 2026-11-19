// EDICIÓN 19 NOV 2026. El PDF solo actualiza mantenimiento; los demás cortes se conservan.
const DATOS_INICIALES = {
  "cut": "2026-11-05",
  "roles": "02–08 nov 2026",
  "incidents": "2026-11-01",
  "period": "oct-2026",
  "blocks": 5,
  "duration": 2,
  "days": 7,
  "totalMono": 19,
  "totalBi": 4,
  "goMono": 10,
  "goBi": 2,
  "cancellations": 202,
  "trainingNote": "IFR/NOC y bimotor se vuelan únicamente en Querétaro. Cap. Carreto y Cap. Castillo, incluidos en los 7 instructores de esa base, también vuelan VFR: su disponibilidad se comparte entre las tres modalidades. No realizan nocturnos toda la semana. Para iniciar bimotor, el alumno debe completar 155 h visuales y 15 h IFR/NOC.",
  "maintenanceNote": "OHB figura GO con «EN SERVICIO E2» y PDM figura GO con «EN SERVICIO E3»: validar liberación operativa. La nota técnica registra excesos de 50 h: RHP motor izquierdo 53 h, derecho 53.6 h; NTP 50.4 h, considerados para el próximo servicio.",
  "bases": [
    {
      "name": "QET",
      "instructors": 7,
      "students": 329,
      "hours": 7613.4,
      "mono": 6,
      "bi": 2,
      "assigned": 143,
      "unconfirmed": 16,
      "cancel": 99,
      "near": 175,
      "nearHours": 1086.7
    },
    {
      "name": "PBC",
      "instructors": 3,
      "students": 67,
      "hours": 1816.3,
      "mono": 2,
      "bi": 0,
      "assigned": 33,
      "unconfirmed": 24,
      "cancel": 72,
      "near": 36,
      "nearHours": 227.1
    },
    {
      "name": "JJC",
      "instructors": 2,
      "students": 32,
      "hours": 1449,
      "mono": 2,
      "bi": 0,
      "assigned": 46,
      "unconfirmed": 25,
      "cancel": 30,
      "near": 8,
      "nearHours": 50.7
    }
  ],
  "maintenance": [
    {
      "id": "XB-OGV",
      "hours": 9,
      "service": "E1"
    },
    {
      "id": "XB-NAP",
      "hours": 18.2,
      "service": "E1"
    },
    {
      "id": "XB-RHP",
      "hours": 24.7,
      "service": "E2"
    },
    {
      "id": "XB-PMJ",
      "hours": 28.9,
      "service": "E1"
    },
    {
      "id": "XB-OWB",
      "hours": 31.7,
      "service": "E3"
    },
    {
      "id": "XB-PLH",
      "hours": 35,
      "service": "E2"
    },
    {
      "id": "XB-NCK",
      "hours": 45.5,
      "service": "E2"
    },
    {
      "id": "XB-PBH",
      "hours": 48.1,
      "service": "E4"
    },
    {
      "id": "XB-PDL",
      "hours": 48.5,
      "service": "E4"
    },
    {
      "id": "XB-OHB",
      "hours": 50,
      "service": "E3"
    },
    {
      "id": "XB-PDM",
      "hours": 50,
      "service": "E4"
    }
  ],
  "edition": "2026-11-19",
  "maintenanceCut": "2026-11-19",
  "sourceReport": "PRAAT-MNT-CR-003/26 · 19/11/2026",
  "fleetRecords": [
    {
      "base": "QET",
      "status": "AOG",
      "id": "XB-GOJ",
      "hours": 9.9,
      "service": "E4",
      "date": "18/11/2026",
      "note": "",
      "engine": 19.7,
      "propeller": 119.7
    },
    {
      "base": "QET",
      "status": "AOG",
      "id": "XB-NAN",
      "hours": null,
      "service": "—",
      "date": "MNT",
      "note": "AWC vencido; trabajos de mantenimiento",
      "engine": null,
      "propeller": null
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NAP",
      "hours": 18.2,
      "service": "E1",
      "date": "18/11/2026",
      "note": "",
      "engine": 956.7,
      "propeller": 756.7
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NCK",
      "hours": 45.5,
      "service": "E2",
      "date": "18/11/2026",
      "note": "",
      "engine": 1381,
      "propeller": 1181
    },
    {
      "base": "QET",
      "status": "AOG",
      "id": "XB-NTP",
      "hours": 36.2,
      "service": "E2",
      "date": "02/11/2026",
      "note": "SPINNER",
      "engine": 349.1,
      "propeller": 149.1
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OGV",
      "hours": 9,
      "service": "E1",
      "date": "18/11/2026",
      "note": "",
      "engine": 1964,
      "propeller": 1764
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OHB",
      "hours": 50,
      "service": "E3",
      "date": "19/11/2026",
      "note": "EN SERVICIO E2",
      "engine": 739.3,
      "propeller": 539.3
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PDL",
      "hours": 48.5,
      "service": "E4",
      "date": "18/11/2026",
      "note": "",
      "engine": 908.5,
      "propeller": 708.5
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PLH",
      "hours": 35,
      "service": "E2",
      "date": "18/11/2026",
      "note": "",
      "engine": 1567.6,
      "propeller": 1290.7
    },
    {
      "base": "QET",
      "status": "AOG",
      "id": "XB-PMV",
      "hours": null,
      "service": "—",
      "date": "Trabajos de mantenimiento",
      "note": "Documentación pendiente para AWC",
      "engine": null,
      "propeller": null
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-RHP",
      "hours": 24.7,
      "service": "E2",
      "date": "18/11/2026",
      "note": "",
      "engine": 1396.8,
      "propeller": 196.8
    },
    {
      "base": "QET",
      "status": "AOG",
      "id": "XB-SUV",
      "hours": null,
      "service": "—",
      "date": "—",
      "note": "Documentación pendiente para AWC",
      "engine": null,
      "propeller": null
    },
    {
      "base": "PBC",
      "status": "OVH",
      "id": "XB-ODC",
      "hours": null,
      "service": "OVERHAUL",
      "date": "OVERHAUL",
      "note": "OVERHAUL",
      "engine": null,
      "propeller": null
    },
    {
      "base": "PBC",
      "status": "GO",
      "id": "XB-PBH",
      "hours": 48.1,
      "service": "E4",
      "date": "18/11/2026",
      "note": "",
      "engine": 1668,
      "propeller": 1468
    },
    {
      "base": "PBC",
      "status": "GO",
      "id": "XB-PMJ",
      "hours": 28.9,
      "service": "E1",
      "date": "18/11/2026",
      "note": "",
      "engine": 259.4,
      "propeller": 59.4
    },
    {
      "base": "PBC",
      "status": "AOG",
      "id": "XB-ITD",
      "hours": null,
      "service": "25 hrs",
      "date": "11/05/2026",
      "note": "Documentación pendiente para AWC",
      "engine": null,
      "propeller": null
    },
    {
      "base": "JJC",
      "status": "GO",
      "id": "XB-OWB",
      "hours": 31.7,
      "service": "E3",
      "date": "18/11/2026",
      "note": "",
      "engine": 350.2,
      "propeller": 1299.9
    },
    {
      "base": "JJC",
      "status": "GO",
      "id": "XB-PDM",
      "hours": 50,
      "service": "E4",
      "date": "18/11/2026",
      "note": "EN SERVICIO E3",
      "engine": 1286.8,
      "propeller": 1086.8
    },
    {
      "base": "JJC",
      "status": "AOG",
      "id": "XB-AWN",
      "hours": null,
      "service": "—",
      "date": "—",
      "note": "Documentación pendiente para AWC",
      "engine": null,
      "propeller": null
    },
    {
      "base": "JJC",
      "status": "AOG",
      "id": "XB-FOJ",
      "hours": null,
      "service": "—",
      "date": "—",
      "note": "Aeronave a nombre de otro propietario",
      "engine": null,
      "propeller": null
    },
    {
      "base": "JJC",
      "status": "AOG",
      "id": "XB-KHN",
      "hours": null,
      "service": "—",
      "date": "—",
      "note": "Aeronave a nombre de otro propietario",
      "engine": null,
      "propeller": null
    },
    {
      "base": "JJC",
      "status": "AOG",
      "id": "XB-BZB",
      "hours": null,
      "service": "—",
      "date": "—",
      "note": "Aeronave a nombre de otro propietario",
      "engine": null,
      "propeller": null
    },
    {
      "base": "JJC",
      "status": "AOG",
      "id": "XB-IKT",
      "hours": null,
      "service": "—",
      "date": "—",
      "note": "Aeronave a nombre de otro propietario",
      "engine": null,
      "propeller": null
    }
  ]
};
