// EDICIÓN SEMANAL. El corte de mantenimiento se actualiza por separado.
const DATOS_INICIALES = {
  "cut": "2026-11-05",
  "roles": "23–29 nov 2026",
  "incidents": "2026-11-22",
  "unconfirmedCut": "2026-11-22",
  "period": "1–22 nov 2026",
  "blocks": 5,
  "duration": 2,
  "days": 7,
  "totalMono": 19,
  "totalBi": 4,
  "goMono": 10,
  "goBi": 2,
  "cancellations": 71,
  "trainingNote": "IFR/NOC y bimotor se vuelan únicamente en Querétaro. Cap. Carreto y Cap. Castillo, incluidos en los 7 instructores de esa base, también vuelan VFR: su disponibilidad se comparte entre las tres modalidades. No realizan nocturnos toda la semana. Para iniciar bimotor, el alumno debe completar 155 h visuales y 15 h IFR/NOC.",
  "maintenanceNote": "XB-PLH y XB-RHP figuran GO con la observación «EN SERVICIO E2». Sus 50 h corresponden al siguiente evento E3. La liberación operativa de ambas sigue por confirmar. Entre las aeronaves GO sin observación de servicio, los menores remanentes son XB-PMJ (10.1 h al E1) y XB-NCK (11.4 h al E2). El informe conserva una nota de 50.4 h para XB-NTP a considerar en su próximo servicio.",
  "bases": [
    {
      "name": "QET",
      "instructors": 7,
      "students": 329,
      "hours": 7613.4,
      "mono": 6,
      "bi": 2,
      "assigned": 159,
      "unconfirmed": 23,
      "cancel": 28,
      "near": 175,
      "nearHours": 1086.7,
      "available": 0
    },
    {
      "name": "PBC",
      "instructors": 3,
      "students": 67,
      "hours": 1816.3,
      "mono": 2,
      "bi": 0,
      "assigned": 30,
      "unconfirmed": 28,
      "cancel": 28,
      "near": 36,
      "nearHours": 227.1,
      "available": 6
    },
    {
      "name": "JJC",
      "instructors": 2,
      "students": 32,
      "hours": 1449,
      "mono": 2,
      "bi": 0,
      "assigned": 20,
      "unconfirmed": 43,
      "cancel": 15,
      "near": 8,
      "nearHours": 50.7,
      "available": 4
    }
  ],
  "maintenance": [
    {
      "id": "XB-PMJ",
      "hours": 10.1,
      "service": "E1"
    },
    {
      "id": "XB-NCK",
      "hours": 11.4,
      "service": "E2"
    },
    {
      "id": "XB-PDL",
      "hours": 14.2,
      "service": "E4"
    },
    {
      "id": "XB-OWB",
      "hours": 16.8,
      "service": "E3"
    },
    {
      "id": "XB-PBH",
      "hours": 18.9,
      "service": "E4"
    },
    {
      "id": "XB-OGV",
      "hours": 21.5,
      "service": "E2"
    },
    {
      "id": "XB-NTP",
      "hours": 30.6,
      "service": "E2"
    },
    {
      "id": "XB-OHB",
      "hours": 31.2,
      "service": "E3"
    },
    {
      "id": "XB-PDM",
      "hours": 31.7,
      "service": "E4"
    },
    {
      "id": "XB-NAP",
      "hours": 39.6,
      "service": "E2"
    },
    {
      "id": "XB-PLH",
      "hours": 50,
      "service": "E3"
    },
    {
      "id": "XB-RHP",
      "hours": 50,
      "service": "E3"
    }
  ],
  "edition": "2026-11-19",
  "maintenanceCut": "2026-11-26",
  "sourceReport": "PRAAT-MNT-CR-003/26 · 26/11/2026",
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
      "hours": 39.6,
      "service": "E2",
      "date": "25/11/2026",
      "note": "",
      "engine": 930,
      "propeller": 730
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NCK",
      "hours": 11.4,
      "service": "E2",
      "date": "24/11/2026",
      "note": "",
      "engine": 1346.9,
      "propeller": 1146.9
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NTP",
      "hours": 30.6,
      "service": "E2",
      "date": "25/11/2026",
      "note": "",
      "engine": 343.9,
      "propeller": 143.9
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OGV",
      "hours": 21.5,
      "service": "E2",
      "date": "25/11/2026",
      "note": "",
      "engine": 1928.6,
      "propeller": 1728.6
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OHB",
      "hours": 31.2,
      "service": "E3",
      "date": "24/11/2026",
      "note": "",
      "engine": 720.5,
      "propeller": 520.5
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PDL",
      "hours": 14.2,
      "service": "E4",
      "date": "25/11/2026",
      "note": "",
      "engine": 874.2,
      "propeller": 674.2
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PLH",
      "hours": 50,
      "service": "E3",
      "date": "25/11/2026",
      "note": "EN SERVICIO E2",
      "engine": 1532.6,
      "propeller": 1255.7
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
      "hours": 50,
      "service": "E3",
      "date": "26/11/2026",
      "note": "EN SERVICIO E2",
      "engine": 1379,
      "propeller": 179
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
      "hours": 18.9,
      "service": "E4",
      "date": "25/11/2026",
      "note": "",
      "engine": 1638.8,
      "propeller": 1438.8
    },
    {
      "base": "PBC",
      "status": "GO",
      "id": "XB-PMJ",
      "hours": 10.1,
      "service": "E1",
      "date": "25/11/2026",
      "note": "",
      "engine": 240.6,
      "propeller": 40.6
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
      "hours": 16.8,
      "service": "E3",
      "date": "25/11/2026",
      "note": "",
      "engine": 335.3,
      "propeller": 1285
    },
    {
      "base": "JJC",
      "status": "GO",
      "id": "XB-PDM",
      "hours": 31.7,
      "service": "E4",
      "date": "25/11/2026",
      "note": "",
      "engine": 1268.5,
      "propeller": 1068.5
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
  ],
  "rolesStart": "2026-11-23"
};
