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
  "maintenanceNote": "XB-RHP registra 5.5 h al próximo E2. XB-NTP cambió a GO y conserva remanentes fechados el 02/11. El reporte anota para el próximo servicio los excesos del intervalo de 50 h: RHP motor izquierdo 53 h y derecho 53.6 h, y NTP 50.4 h.",
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
      "id": "XB-RHP",
      "hours": 5.5,
      "service": "E2"
    },
    {
      "id": "XB-PLH",
      "hours": 13.7,
      "service": "E2"
    },
    {
      "id": "XB-OWB",
      "hours": 18.3,
      "service": "E3"
    },
    {
      "id": "XB-PMJ",
      "hours": 20.6,
      "service": "E1"
    },
    {
      "id": "XB-NCK",
      "hours": 22.9,
      "service": "E2"
    },
    {
      "id": "XB-PDL",
      "hours": 25.6,
      "service": "E4"
    },
    {
      "id": "XB-PBH",
      "hours": 30.5,
      "service": "E4"
    },
    {
      "id": "XB-NTP",
      "hours": 36.2,
      "service": "E2"
    },
    {
      "id": "XB-PDM",
      "hours": 36.9,
      "service": "E4"
    },
    {
      "id": "XB-OGV",
      "hours": 38.9,
      "service": "E2"
    },
    {
      "id": "XB-OHB",
      "hours": 42,
      "service": "E3"
    },
    {
      "id": "XB-NAP",
      "hours": 50,
      "service": "E2"
    }
  ],
  "edition": "2026-11-19",
  "maintenanceCut": "2026-11-23",
  "sourceReport": "PRAAT-MNT-CR-003/26 · 23/11/2026",
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
      "hours": 50,
      "service": "E2",
      "date": "22/11/2026",
      "note": "",
      "engine": 940.4,
      "propeller": 740.4
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NCK",
      "hours": 22.9,
      "service": "E2",
      "date": "22/11/2026",
      "note": "",
      "engine": 1358.4,
      "propeller": 1158.4
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-NTP",
      "hours": 36.2,
      "service": "E2",
      "date": "02/11/2026",
      "note": "",
      "engine": 349.1,
      "propeller": 149.1
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OGV",
      "hours": 38.9,
      "service": "E2",
      "date": "22/11/2026",
      "note": "",
      "engine": 1946,
      "propeller": 1746
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-OHB",
      "hours": 42,
      "service": "E3",
      "date": "22/11/2026",
      "note": "",
      "engine": 731.3,
      "propeller": 531.3
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PDL",
      "hours": 25.6,
      "service": "E4",
      "date": "22/11/2026",
      "note": "",
      "engine": 885.6,
      "propeller": 685.6
    },
    {
      "base": "QET",
      "status": "GO",
      "id": "XB-PLH",
      "hours": 13.7,
      "service": "E2",
      "date": "22/11/2026",
      "note": "",
      "engine": 1546.3,
      "propeller": 1269.4
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
      "hours": 5.5,
      "service": "E2",
      "date": "22/11/2026",
      "note": "",
      "engine": 1380.6,
      "propeller": 180.6
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
      "hours": 30.5,
      "service": "E4",
      "date": "22/11/2026",
      "note": "",
      "engine": 1650.4,
      "propeller": 1450.4
    },
    {
      "base": "PBC",
      "status": "GO",
      "id": "XB-PMJ",
      "hours": 20.6,
      "service": "E1",
      "date": "20/11/2026",
      "note": "",
      "engine": 251.1,
      "propeller": 51.1
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
      "hours": 18.3,
      "service": "E3",
      "date": "22/11/2026",
      "note": "",
      "engine": 336.8,
      "propeller": 1286.5
    },
    {
      "base": "JJC",
      "status": "GO",
      "id": "XB-PDM",
      "hours": 36.9,
      "service": "E4",
      "date": "22/11/2026",
      "note": "",
      "engine": 1273.7,
      "propeller": 1073.7
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
