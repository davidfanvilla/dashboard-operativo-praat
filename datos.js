// EDICIÓN SEMANAL. El corte de mantenimiento se actualiza por separado.
const DATOS_INICIALES = {
  "cut": "2026-11-05",
  "roles": "02–08 nov 2026",
  "incidents": "2026-11-19",
  "unconfirmedCut": "2026-11-15",
  "period": "1–19 nov 2026",
  "blocks": 5,
  "duration": 2,
  "days": 7,
  "totalMono": 19,
  "totalBi": 4,
  "goMono": 10,
  "goBi": 2,
  "cancellations": 69,
  "trainingNote": "IFR/NOC y bimotor se vuelan únicamente en Querétaro. Cap. Carreto y Cap. Castillo, incluidos en los 7 instructores de esa base, también vuelan VFR: su disponibilidad se comparte entre las tres modalidades. No realizan nocturnos toda la semana. Para iniciar bimotor, el alumno debe completar 155 h visuales y 15 h IFR/NOC.",
  "maintenanceNote": "OGV y OHB figuran GO con observaciones «EN SERVICIO E1» y «EN SERVICIO E2», respectivamente. La liberación operativa está pendiente de confirmación. PDM figura GO sin observación de servicio en este corte. La nota técnica registra excesos de 50 h: RHP motor izquierdo 53 h, derecho 53.6 h; NTP 50.4 h, considerados para el próximo servicio.",
  "bases": [
    {
      "name": "QET",
      "instructors": 7,
      "students": 329,
      "hours": 7613.4,
      "mono": 6,
      "bi": 2,
      "assigned": 143,
      "unconfirmed": 22,
      "cancel": 26,
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
      "unconfirmed": 18,
      "cancel": 28,
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
      "unconfirmed": 16,
      "cancel": 15,
      "near": 8,
      "nearHours": 50.7
    }
  ],
  "maintenance": [
    {
      "id": "XB-NAP",
      "hours": 12.8,
      "service": "E1"
    },
    {
      "id": "XB-RHP",
      "hours": 16.2,
      "service": "E2"
    },
    {
      "id": "XB-PMJ",
      "hours": 24.4,
      "service": "E1"
    },
    {
      "id": "XB-OWB",
      "hours": 25.6,
      "service": "E3"
    },
    {
      "id": "XB-PLH",
      "hours": 29,
      "service": "E2"
    },
    {
      "id": "XB-NCK",
      "hours": 38.9,
      "service": "E2"
    },
    {
      "id": "XB-PBH",
      "hours": 41.9,
      "service": "E4"
    },
    {
      "id": "XB-PDL",
      "hours": 42.1,
      "service": "E4"
    },
    {
      "id": "XB-OGV",
      "hours": 50,
      "service": "E2"
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
  "maintenanceCut": "2026-11-20",
  "sourceReport": "PRAAT-MNT-CR-003/26 · 20/11/2026",
  "fleetRecords": [
    {
      "base": "QET",
      "status": "AOG",
      "id": "XB-GOJ",
      "hours": 9.9,
      "service": "E4",
      "date": "15/11/2026",
      "note": "ALTERNADOR",
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
      "hours": 12.8,
      "service": "E1",
      "date": "19/11/2026",
      "note": "",
      "engine": 951.3,
      "propeller": 751.3
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NCK",
      "hours": 38.9,
      "service": "E2",
      "date": "19/11/2026",
      "note": "",
      "engine": 1374.4,
      "propeller": 1174.4
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
      "hours": 50,
      "service": "E2",
      "date": "20/11/2026",
      "note": "EN SERVICIO E1",
      "engine": 1957.1,
      "propeller": 1757.1
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OHB",
      "hours": 50,
      "service": "E3",
      "date": "20/11/2026",
      "note": "EN SERVICIO E2",
      "engine": 739.3,
      "propeller": 539.3
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PDL",
      "hours": 42.1,
      "service": "E4",
      "date": "19/11/2026",
      "note": "",
      "engine": 902.1,
      "propeller": 702.1
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PLH",
      "hours": 29,
      "service": "E2",
      "date": "19/11/2026",
      "note": "",
      "engine": 1561.6,
      "propeller": 1284.7
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
      "hours": 16.2,
      "service": "E2",
      "date": "19/11/2026",
      "note": "",
      "engine": 1391.3,
      "propeller": 191.3
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
      "hours": 41.9,
      "service": "E4",
      "date": "19/11/2026",
      "note": "",
      "engine": 1661.8,
      "propeller": 1461.8
    },
    {
      "base": "PBC",
      "status": "GO",
      "id": "XB-PMJ",
      "hours": 24.4,
      "service": "E1",
      "date": "19/11/2026",
      "note": "",
      "engine": 254.9,
      "propeller": 54.9
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
      "hours": 25.6,
      "service": "E3",
      "date": "19/11/2026",
      "note": "",
      "engine": 344.1,
      "propeller": 1293.8
    },
    {
      "base": "JJC",
      "status": "GO",
      "id": "XB-PDM",
      "hours": 50,
      "service": "E4",
      "date": "19/11/2026",
      "note": "",
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
