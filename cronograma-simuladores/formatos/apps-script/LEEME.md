# Guardar las evaluaciones en Google Sheets

Sin esta conexión, cada evaluación se guarda solo en el navegador del equipo donde se llenó. Con ella, todas quedan en una hoja de Google Sheets y se ven desde cualquier equipo en «Evaluaciones guardadas».

Se hace una sola vez (unos 5 minutos):

1. En Google Drive crea una hoja de cálculo nueva, por ejemplo «Evaluaciones PRAAT».
2. En la hoja: **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de [Codigo.gs](Codigo.gs). Guarda (ícono de disco).
4. **Implementar → Nueva implementación** → en el engrane elige **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
5. Pulsa **Implementar**, autoriza con tu cuenta de Google y copia la **URL de la aplicación web** (termina en `/exec`).
6. En GitHub abre `cronograma-simuladores/formatos/config.js`, pulsa el lápiz y pega la URL entre las comillas:

   ```js
   const PRAAT_SHEETS_URL = "https://script.google.com/macros/s/…/exec";
   ```

7. **Commit changes**. Al publicarse, el botón «Guardar evaluación» enviará cada evaluación a la hoja.

Notas:

- La hoja «Evaluaciones» se crea sola con la primera evaluación. La columna «Datos (no editar)» guarda el formato completo (incluidas firmas); no la modifiques a mano.
- Como el repositorio es público, cualquiera que vea `config.js` podría enviar datos a la hoja. Revisa la hoja de vez en cuando y, si lo necesitas, haz una implementación nueva para cambiar la URL.
- Si cambias el código de Apps Script, usa **Implementar → Administrar implementaciones → Editar → Versión nueva** para conservar la misma URL.
