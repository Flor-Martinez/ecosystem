/**
 * ====================================================================
 * SISTEMA OFICIAL DE LICENCIAS - PLANILLA FINANZAS EN ORDEN
 * ====================================================================
 * Flor Martínez · Ecosistema Digital
 * 
 * CARACTERÍSTICAS:
 * 1. Clave de un solo uso vinculada al ID de Google Drive del comprador.
 * 2. Si alguien duplica el archivo, la copia se bloquea automáticamente.
 * 3. Si intentan ingresar la misma clave en una copia, el servidor la rechaza.
 * 4. Renombrado automático: Elimina el texto "Copia de" para llamarse "Finanzas en Orden".
 */

// URL oficial del endpoint en producción
const API_URL_ACTIVACION = "https://ecosystem-flor-martinez.vercel.app/api/licenses/activate";

// Nombre oficial limpio que debe tener la planilla del cliente
const NOMBRE_PLANILLA_OFICIAL = "Finanzas en Orden - Flor Martínez";

// Lista oficial de hojas protegidas que se muestran solo con licencia activa
const HOJAS_OPERATIVAS = ["Dashboard", "Movimientos", "Metas", "Informe Detallado", "Gastos Hormiga"];

/**
 * onOpen: Se ejecuta automáticamente al abrir el documento.
 * - Elimina el prefijo "Copia de " si el usuario acaba de hacer la copia.
 * - Verifica si el archivo fue clonado/duplicado. Si el ID cambió, bloquea las hojas.
 */
function onOpen(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Crear menú superior de Licencia
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("🔒 Licencia")
      .addItem("Activar Licencia Comercial", "activarPlanillaBoton")
      .addItem("Verificar Estado", "verificarEstadoLicencia")
      .addToUi();
  } catch (err) {}

  // 2. Renombrado automático: eliminar "Copia de " o "Copy of "
  limpiarNombreCopia(ss);

  // 3. Verificación de copia duplicada
  verificarSeguridadCopia(ss);
}

/**
 * Elimina automáticamente el prefijo "Copia de "
 */
function limpiarNombreCopia(ss) {
  try {
    var actual = ss.getName();
    if (actual.indexOf("Copia de ") === 0) {
      var limpio = actual.replace(/^Copia de\s*/i, "").trim() || NOMBRE_PLANILLA_OFICIAL;
      ss.rename(limpio);
    } else if (actual.indexOf("Copy of ") === 0) {
      var limpio = actual.replace(/^Copy of\s*/i, "").trim() || NOMBRE_PLANILLA_OFICIAL;
      ss.rename(limpio);
    }
  } catch (err) {
    // Si no tiene permisos de renombrado inmediatos, continúa
  }
}

/**
 * Verifica si el archivo actual coincide con el ID autorizado original.
 * Si fue copiado o no está activo, bloquea las hojas operativas.
 */
function verificarSeguridadCopia(ss) {
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  // Si no está activado o fue clonado a otro ID
  if (!savedId || savedId !== currentId || estado !== "ACTIVO") {
    bloquearHojasOperativas(ss);
    if (savedId && savedId !== currentId) {
      ss.toast("Esta copia requiere su propia licencia comercial.", "🔒 Copia No Autorizada", 6);
    }
  }
}

/**
 * Función principal de Activación:
 * Puede ejecutarse desde el menú '🔒 Licencia -> Activar' o asignarse a un botón en la hoja.
 */
function activarPlanillaBoton() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var portada = ss.getSheetByName("Activar Licencia") || ss.getSheetByName("Portada") || ss.getSheets()[0];
  var celdaClave = portada.getRange("C7");
  var celdaRespuesta = portada.getRange("C8");

  var claveIngresada = (celdaClave.getValue() || "").toString().trim().toUpperCase();

  // Si la celda C7 está vacía, pedimos la clave mediante un cuadro de diálogo
  if (!claveIngresada) {
    var ui = SpreadsheetApp.getUi();
    var respuesta = ui.prompt(
      "Activar Planilla Finanzas en Orden",
      "Ingresá tu Clave de Licencia Oficial (ej. FM-XXXX-YYYY):",
      ui.ButtonSet.OK_CANCEL
    );
    if (respuesta.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    claveIngresada = (respuesta.getResponseText() || "").trim().toUpperCase();
    if (!claveIngresada) {
      ui.alert("Tenés que ingresar una clave para activar el producto.");
      return;
    }
    celdaClave.setValue(claveIngresada);
  }

  ss.toast("Verificando con el servidor oficial...", "🔒 Validando Licencia", 5);
  celdaRespuesta.setValue("⏳ Conectando con el servidor central...").setFontColor("#1E3A5F");
  SpreadsheetApp.flush();

  // 1. Llamada al Servidor Central (Web / Supabase)
  var spreadsheetId = ss.getId();
  var resultado = consultarServidorActivacion(claveIngresada, spreadsheetId);

  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");

  if (resultado.success) {
    // ÉXITO: Licencia aprobada y vinculada a ESTE documento
    if (db) {
      db.getRange("Z10").setValue(spreadsheetId);      // ID del archivo autorizado
      db.getRange("Z11").setValue(claveIngresada);     // Clave
      db.getRange("Z12").setValue("ACTIVO");           // Estado
      SpreadsheetApp.flush();
    }

    limpiarNombreCopia(ss);
    desbloquearTodasLasHojas(ss);

    celdaRespuesta
      .setValue("✅ ¡Planilla Activada con Éxito! Bienvenida/o " + (resultado.customerName || ""))
      .setFontColor("#16A34A")
      .setFontWeight("bold");

    SpreadsheetApp.flush();
    ss.toast("¡Tu planilla ha sido activada y vinculada a este archivo!", "✅ Licencia Oficial", 6);

  } else {
    // ERROR: Clave inexistente, revocada o YA USADA en otro archivo
    var mensajeError = resultado.error || "No se pudo activar la licencia.";
    
    if (resultado.code === "ALREADY_USED") {
      mensajeError = "❌ Esta clave ya fue activada en otra copia y no puede ser reutilizada.";
    }

    celdaRespuesta
      .setValue(mensajeError)
      .setFontColor("#DC2626")
      .setFontWeight("bold");

    if (db) {
      db.getRange("Z12").setValue("BLOQUEADO");
    }

    bloquearHojasOperativas(ss);
    ss.toast(mensajeError, "❌ Error de Licencia", 6);
  }
}

/**
 * Consulta la API oficial en Supabase
 */
function consultarServidorActivacion(clave, spreadsheetId) {
  try {
    var url = API_URL_ACTIVACION + "?key=" + encodeURIComponent(clave) + "&id=" + encodeURIComponent(spreadsheetId);
    
    var response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true,
      headers: {
        "Accept": "application/json"
      }
    });

    var status = response.getResponseCode();
    var json = JSON.parse(response.getContentText() || "{}");

    if (status === 200 && json.success) {
      return { success: true, customerName: json.customerName, code: json.code };
    } else {
      return {
        success: false,
        code: json.code || "REJECTED",
        error: json.message || json.error || "Error al validar la clave con el servidor."
      };
    }
  } catch (err) {
    return {
      success: false,
      code: "NETWORK_ERROR",
      error: "Error de conexión con el servidor de licencias. Verificá tu conexión a internet."
    };
  }
}

/**
 * Desbloquea y hace visibles las hojas oficiales del producto
 */
function desbloquearTodasLasHojas(ss) {
  for (var i = 0; i < HOJAS_OPERATIVAS.length; i++) {
    var sh = ss.getSheetByName(HOJAS_OPERATIVAS[i]);
    if (sh) {
      try {
        sh.showSheet();
      } catch (e) {}
    }
  }
  // Ir al Dashboard principal
  var dash = ss.getSheetByName("Dashboard") || ss.getSheetByName("Movimientos");
  if (dash) {
    ss.setActiveSheet(dash);
  }
}

/**
 * Oculta todas las hojas excepto la portada de activación
 */
function bloquearHojasOperativas(ss) {
  var portada = ss.getSheetByName("Activar Licencia") || ss.getSheetByName("Portada") || ss.getSheets()[0];
  if (portada) {
    try {
      portada.showSheet();
      ss.setActiveSheet(portada);
    } catch (e) {}
  }

  for (var i = 0; i < HOJAS_OPERATIVAS.length; i++) {
    var sh = ss.getSheetByName(HOJAS_OPERATIVAS[i]);
    if (sh && sh.getName() !== portada.getName()) {
      try {
        sh.hideSheet();
      } catch (e) {}
    }
  }
}

/**
 * Verificar estado actual
 */
function verificarEstadoLicencia() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  var ui = SpreadsheetApp.getUi();

  if (!db) {
    ui.alert("Planilla no configurada.");
    return;
  }

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var clave = (db.getRange("Z11").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  if (estado === "ACTIVO" && savedId === currentId) {
    ui.alert("✅ Licencia Activa", "Tu copia está autorizada correctamente con la clave:\n" + clave, ui.ButtonSet.OK);
  } else {
    ui.alert("🔒 Licencia Pendiente", "Esta copia no está activada o es un duplicado no autorizado.", ui.ButtonSet.OK);
  }
}
