// DATOS PUBLICADOS DEL CRONOGRAMA. Edita aquí o reemplaza este archivo con
// el que descarga el botón «Descargar datos.js» del cronograma.
//
// Fechas: "AAAA-MM" cuando solo se conoce el mes; "AAAA-MM-DD" con día.
// estado: "Programada" | "Realizada" | "Cancelada"
// resultado: "Pendiente" | "Aprobatoria" | "No aprobatoria" | "No registrado"
// siguienteMeses: meses hasta la siguiente evaluación (vacío = según regla).
const DATOS_INICIALES = {
  "version": 1,
  "actualizado": "2026-11-26",
  "reglas": {
    "aprobatoria": 6,
    "noAprobatoria": 3,
    "avisoDias": 45
  },
  "simuladores": ["Cirrus", "Red Bird", "A-320", "B737", "B787"],
  "instructores": [
    { "id": "sergio-damian", "nombre": "Cap. Sergio Damián", "simuladores": ["Cirrus"] },
    { "id": "bernardo", "nombre": "Cap. Bernardo", "simuladores": ["Por confirmar"] },
    { "id": "marco-gusman", "nombre": "Cap. Marco Gusmán", "simuladores": ["Red Bird", "Cirrus"] },
    { "id": "corona", "nombre": "Cap. Corona", "simuladores": ["B737", "B787", "Red Bird"] },
    { "id": "gustavo-angeles", "nombre": "Cap. Gustavo Angeles", "simuladores": ["Cirrus", "A-320"] },
    { "id": "ivan-orozco", "nombre": "Cap. Iván Orozco", "simuladores": ["Cirrus", "A-320"] }
  ],
  "evaluaciones": [
    {
      "id": "ev-001",
      "instructor": "sergio-damian",
      "simulador": "Cirrus",
      "fecha": "2026-11",
      "estado": "Programada",
      "resultado": "Pendiente",
      "siguienteMeses": null,
      "evaluador": "",
      "notas": "Primero en la secuencia de estandarización."
    },
    {
      "id": "ev-002",
      "instructor": "bernardo",
      "simulador": "Por confirmar",
      "fecha": "2026-11",
      "estado": "Programada",
      "resultado": "Pendiente",
      "siguienteMeses": null,
      "evaluador": "",
      "notas": "Segundo en la secuencia. Si no es aprobatoria, siguiente a 3 meses; si es aprobatoria, a 6 meses."
    },
    {
      "id": "ev-003",
      "instructor": "marco-gusman",
      "simulador": "No indicado",
      "fecha": "2026-11",
      "estado": "Realizada",
      "resultado": "No registrado",
      "siguienteMeses": 6,
      "evaluador": "",
      "notas": "Evaluado en noviembre de 2026."
    },
    {
      "id": "ev-004",
      "instructor": "marco-gusman",
      "simulador": "Red Bird",
      "fecha": "2027-05",
      "estado": "Programada",
      "resultado": "Pendiente",
      "siguienteMeses": null,
      "evaluador": "",
      "notas": "Seis meses después de la evaluación de noviembre de 2026."
    }
  ]
};
