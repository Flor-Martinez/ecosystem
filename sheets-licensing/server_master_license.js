/**
 * ====================================================================
 * SERVIDOR CENTRAL DE LICENCIAS - FLOR MARTÍNEZ (MASTER SHEET)
 * ====================================================================
 * Este script se coloca en tu planilla privada: "Control de Licencias"
 * y se publica como Aplicación Web (Web App) con acceso para "Cualquiera".
 * 
 * Estructura de la hoja "Licencias":
 * Col A: CLAVE_LICENCIA
 * Col B: CLIENTE_NOMBRE
 * Col C: CLIENTE_EMAIL
 * Col D: SPREADSHEET_ID
 * Col E: ESTADO (ACTIVO | BLOQUEADO | PENDIENTE)
 * Col F: FECHA_ACTIVACION
 * Col G: ULTIMO_ACCESO
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Espera hasta 10 segundos por si entran peticiones simultáneas
  try {
    lock.waitLock(10000);
  } catch (err) {
    return responderJSON({
      success: false,
      code: "SERVER_BUSY",
      message: "El servidor está ocupado. Intenta de nuevo en unos segundos."
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responderJSON({ success: false, code: "EMPTY_PAYLOAD", message: "Petición vacía." });
    }

    var data = JSON.parse(e.postData.contents);
    var licenseKey = (data.licenseKey || "").toString().trim().toUpperCase();
    var spreadsheetId = (data.spreadsheetId || "").toString().trim();
    var userEmail = (data.userEmail || "").toString().trim().toLowerCase();

    if (!licenseKey) {
      return responderJSON({ success: false, code: "MISSING_KEY", message: "Falta la clave de licencia." });
    }
    if (!spreadsheetId) {
      return responderJSON({ success: false, code: "MISSING_ID", message: "Falta el ID del archivo." });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Licencias") || ss.getSheets()[0];
    var ultFila = sheet.getLastRow();

    if (ultFila < 2) {
      return responderJSON({ success: false, code: "INVALID_KEY", message: "Clave de licencia no válida o no registrada." });
    }

    // Leemos las columnas A a E (Fila 2 en adelante)
    var datos = sheet.getRange(2, 1, ultFila - 1, 5).getValues();
    var filaEncontrada = -1;
    var registro = null;

    for (var i = 0; i < datos.length; i++) {
      var claveExistente = (datos[i][0] || "").toString().trim().toUpperCase();
      if (claveExistente === licenseKey) {
        filaEncontrada = i + 2; // Índice real en la hoja (1-based)
        registro = {
          clave: datos[i][0],
          nombre: datos[i][1],
          email: datos[i][2],
          spreadsheetId: (datos[i][3] || "").toString().trim(),
          estado: (datos[i][4] || "ACTIVO").toString().trim().toUpperCase()
        };
        break;
      }
    }

    // 1. Clave no encontrada
    if (filaEncontrada === -1 || !registro) {
      return responderJSON({
        success: false,
        code: "INVALID_KEY",
        message: "La clave de licencia ingresada no existe en nuestro sistema."
      });
    }

    // 2. Licencia suspendida / revocada (por ejemplo si pidió reembolso)
    if (registro.estado === "BLOQUEADO" || registro.estado === "REVOCADO") {
      return responderJSON({
        success: false,
        code: "REVOKED",
        message: "Esta licencia se encuentra suspendida o dada de baja."
      });
    }

    var ahora = new Date();

    // 3. Caso: Primera activación (No tiene Spreadsheet ID asignado aún)
    if (!registro.spreadsheetId) {
      sheet.getRange(filaEncontrada, 4).setValue(spreadsheetId); // Asocia el ID único del archivo
      sheet.getRange(filaEncontrada, 5).setValue("ACTIVO");
      sheet.getRange(filaEncontrada, 6).setValue(ahora); // Fecha de activación
      sheet.getRange(filaEncontrada, 7).setValue(ahora); // Último acceso

      return responderJSON({
        success: true,
        code: "ACTIVATED",
        clientName: registro.nombre,
        clientEmail: registro.email,
        message: "¡Licencia activada con éxito para " + registro.nombre + "!"
      });
    }

    // 4. Caso: El archivo coincide exactamente con el registrado previamente
    if (registro.spreadsheetId === spreadsheetId) {
      sheet.getRange(filaEncontrada, 7).setValue(ahora); // Actualiza último acceso

      return responderJSON({
        success: true,
        code: "VERIFIED",
        clientName: registro.nombre,
        clientEmail: registro.email,
        message: "Licencia verificada correctamente."
      });
    }

    // 5. Caso: SPREADSHEET_ID diferente -> ¡COPIA PIRATA O CLONADA!
    return responderJSON({
      success: false,
      code: "DUPLICATE_FILE",
      message: "Esta clave de licencia ya está vinculada a otro archivo de Google Sheets. Cada copia requiere su propia licencia comercial."
    });

  } catch (error) {
    return responderJSON({
      success: false,
      code: "SERVER_ERROR",
      message: "Error interno: " + error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Servidor de Licencias Flor Martínez activo.").setMimeType(ContentService.MimeType.TEXT);
}

function responderJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Función auxiliar para generar claves aleatorias con formato FM-XXXX-XXXX
 * Ejecútala desde Apps Script para crear 10 licencias nuevas listas para vender
 */
function generarNuevasClaves(cantidad) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Licencias") || ss.getSheets()[0];
  var total = cantidad || 10;
  var filas = [];

  for (var i = 0; i < total; i++) {
    var parte1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    var parte2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    var clave = "FM-" + parte1 + "-" + parte2;
    filas.push([clave, "", "", "", "PENDIENTE", "", ""]);
  }

  var ultFila = Math.max(sheet.getLastRow(), 1);
  sheet.getRange(ultFila + 1, 1, filas.length, 7).setValues(filas);
  SpreadsheetApp.getActiveSpreadsheet().toast("Se generaron " + total + " licencias nuevas.", "Completado", 4);
}
