/**
 * ====================================================================
 * WEBHOOK DE RECEPCIÓN AUTOMÁTICA - GOOGLE SHEET MAESTRO (FLOR MARTÍNEZ)
 * ====================================================================
 * Este script se coloca en la planilla privada de Flor y Santi:
 * "Control de Licencias / Ventas"
 * 
 * ¿Qué hace?
 * Cada vez que alguien compra en la web o Santi emite una clave desde
 * el panel de Superadmin, este webhook recibe los datos e inserta la
 * fila en tiempo real automáticamente sin que tengas que copiar nada.
 * 
 * INSTRUCCIONES DE INSTALACIÓN (2 MINUTOS):
 * 1. Abrí tu Google Sheet maestro de control.
 * 2. Andá a Extensiones > Apps Script.
 * 3. Pegá este código en un archivo llamado Webhook.gs y guardá (Ctrl + S).
 * 4. Hacé clic arriba a la derecha en "Implementar" > "Nueva implementación".
 * 5. Tipo: "Aplicación web".
 * 6. Descripción: "Webhook Ventas Web y Superadmin".
 * 7. Ejecutar como: "Yo (tu correo)".
 * 8. Quién tiene acceso: "Cualquier usuario" (Anyone).
 * 9. Copiá la URL generada y configúrala en la variable de entorno:
 *    MASTER_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/TU_ID/exec"
 * ====================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Servidor ocupado, reintentar."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Petición vacía"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var clave = (data.clave || "").toString().trim().toUpperCase();
    var nombre = (data.nombre || "").toString().trim();
    var email = (data.email || "").toString().trim().toLowerCase();
    var telefono = (data.telefono || "").toString().trim();
    var canal = (data.canal || "WEB").toString().trim().toUpperCase();
    var notas = (data.notas || "").toString().trim();
    var fecha = data.fecha ? new Date(data.fecha) : new Date();

    if (!clave) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Falta la clave"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Busca la hoja 'Licencias' o 'Control' o usa la primera hoja
    var sheet = ss.getSheetByName("Licencias") || ss.getSheetByName("Control") || ss.getSheets()[0];

    // Si la hoja está totalmente vacía, agregamos los encabezados oficiales
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "CLAVE_LICENCIA",
        "CLIENTE_NOMBRE",
        "CLIENTE_EMAIL",
        "TELEFONO",
        "CANAL_VENTA",
        "FECHA_VENTA",
        "ESTADO",
        "NOTAS"
      ]);
      sheet.getRange("A1:H1").setFontWeight("bold").setBackground("#0D1B2A").setFontColor("#FAF5EE");
    }

    // Insertamos la nueva fila automáticamente
    sheet.appendRow([
      clave,
      nombre,
      email,
      telefono,
      canal,
      Utilities.formatDate(fecha, ss.getSpreadsheetTimeZone() || "GMT-3", "dd/MM/yyyy HH:mm:ss"),
      "ACTIVA",
      notas
    ]);

    SpreadsheetApp.flush();

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Licencia registrada en Google Sheet con éxito.",
      clave: clave
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Función para probar localmente desde el editor de Apps Script
 */
function probarWebhookLocal() {
  var e = {
    postData: {
      contents: JSON.stringify({
        clave: "FM-TEST-WEBHOOK",
        nombre: "Cliente Prueba",
        email: "test@ejemplo.com",
        canal: "WHATSAPP",
        notas: "Prueba de inserción automática"
      })
    }
  };
  var res = doPost(e);
  Logger.log(res.getContent());
}
