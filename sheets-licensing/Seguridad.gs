/**
 * ====================================================================
 * SISTEMA DE SEGURIDAD Y LICENCIAS - CLOUD & SINGLE USE BINDING
 * ====================================================================
 * Flor Martínez · Ecosistema Digital
 * 
 * - Validación oficial conectada a Supabase (1 clave = 1 archivo único).
 * - Si intentan usar la clave en una copia, el servidor la rechaza.
 * - Auto-renombrado a "Finanzas en Orden - Flor Martínez" (elimina "Copia de ").
 * - Auto-bloqueo al abrir copias duplicadas.
 * - Master bypass: "FM-ADMIN-MASTER" para administración.
 */

const API_URL_ACTIVACION = "https://ecosystem-flor-martinez.vercel.app/api/licenses/activate";
const SALT_SEGURIDAD = "FLOR_MARTINEZ_2026_SECRET";

// Lista oficial estricta de hojas que se deben mostrar al cliente
const HOJAS_PRODUCTO = ["Dashboard", "Movimientos", "Metas", "Informe Detallado", "Gastos Hormiga"];

/**
 * onOpen: Se ejecuta automáticamente al abrir el archivo.
 * - Auto-renombra si es copia nueva.
 * - Detecta si el ID del archivo no coincide con el autorizado y bloquea.
 */
function onOpen(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Auto-renombrar: quitar "Copia de " o "Copy of "
  try {
    var actual = ss.getName();
    if (actual.indexOf("Copia de ") === 0) {
      ss.rename(actual.replace(/^Copia de\s*/i, "").trim() || "Finanzas en Orden - Flor Martínez");
    } else if (actual.indexOf("Copy of ") === 0) {
      ss.rename(actual.replace(/^Copy of\s*/i, "").trim() || "Finanzas en Orden - Flor Martínez");
    }
  } catch (err) {}

  // 2. Menú de Licencia en la barra de Google Sheets
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("🔒 Licencia")
      .addItem("Activar Licencia Comercial", "activarPlanillaBoton")
      .addItem("Verificar Estado", "verificarEstadoLicencia")
      .addToUi();
  } catch (err) {}

  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  // Si es una copia clonada con el ID del dueño anterior
  if (savedId && savedId !== currentId) {
    db.getRange("Z10").clearContent();
    db.getRange("Z11").clearContent();
    db.getRange("Z12").setValue("PENDIENTE");
    SpreadsheetApp.flush();

    bloquearHojasOperativas(ss);

    var hojaLic = obtenerHojaActivacion(ss);
    if (hojaLic) {
      hojaLic.getRange("C7").clearContent();
      hojaLic.getRange("D7").setValue("👈 Escribí tu clave para activar esta copia").setFontColor("#0D1B2A").setFontWeight("normal");
    }
    ss.toast("Esta copia requiere su propia clave de licencia comercial.", "🔒 Archivo No Autorizado", 6);
  } else if (!savedId || estado !== "ACTIVO") {
    bloquearHojasOperativas(ss);
  }
}

/**
 * Función principal para activar la planilla desde botón o menú.
 */
function activarPlanillaBoton() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var portada = obtenerHojaActivacion(ss) || ss.getSheets()[0];
  var celdaClave = portada.getRange("C7");
  var celdaRespuesta = portada.getRange("D7");

  var claveIngresada = (celdaClave.getValue() || "").toString().trim().toUpperCase();

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
      ui.alert("Tenés que ingresar una clave para activar.");
      return;
    }
    celdaClave.setValue(claveIngresada);
  }

  celdaRespuesta.setValue("⏳ Validando con el servidor...").setFontColor("#1E3A5F").setFontWeight("normal");
  SpreadsheetApp.flush();

  var currentId = ss.getId();

  // Bypass para claves de desarrollo/admin
  if (claveIngresada === "FM-ADMIN-MASTER" || claveIngresada === "FM-DEV-MASTER") {
    completarActivacionExitosa(ss, currentId, claveIngresada, "Administrador");
    return;
  }

  // 1. Validación matemática previa
  if (!validarClaveLicencia(claveIngresada)) {
    celdaRespuesta.setValue("❌ Clave no válida. Revisá el código.").setFontColor("#DC2626").setFontWeight("bold");
    ss.toast("La clave ingresada no es válida.", "❌ Error", 4);
    bloquearHojasOperativas(ss);
    return;
  }

  // 2. Validación de uso único con Servidor Central (Supabase)
  var resultado = consultarServidorActivacion(claveIngresada, currentId);

  if (resultado.success) {
    completarActivacionExitosa(ss, currentId, claveIngresada, resultado.customerName);
  } else {
    var msg = resultado.error || "No se pudo activar la licencia.";
    if (resultado.code === "ALREADY_USED") {
      msg = "❌ Esta clave ya fue activada en otra copia y no puede ser reutilizada.";
    }
    celdaRespuesta.setValue(msg).setFontColor("#DC2626").setFontWeight("bold");
    ss.toast(msg, "❌ Error de Licencia", 6);
    bloquearHojasOperativas(ss);
  }
}

/**
 * Guarda el ID en la configuración oculta, desbloquea las hojas y renombra
 */
function completarActivacionExitosa(ss, currentId, clave, customerName) {
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (db) {
    db.getRange("Z10").setValue(currentId);
    db.getRange("Z11").setValue(clave);
    db.getRange("Z12").setValue("ACTIVO");
    SpreadsheetApp.flush();
  }

  var portada = obtenerHojaActivacion(ss);
  if (portada) {
    portada.getRange("D7").setValue("✅ ¡Licencia Activada con Éxito!").setFontColor("#16A34A").setFontWeight("bold");
  }

  // Renombrar automáticamente a nombre limpio
  try {
    var actual = ss.getName();
    if (actual.indexOf("Copia de ") === 0 || actual.indexOf("Copy of ") === 0) {
      ss.rename(actual.replace(/^(Copia de|Copy of)\s*/i, "").trim() || "Finanzas en Orden - Flor Martínez");
    }
  } catch (err) {}

  desbloquearTodasLasHojas(ss);
  ss.toast("¡Planilla activada y vinculada a este archivo!", "✅ Licencia Oficial", 5);
}

/**
 * Consulta la API de Supabase en producción
 */
function consultarServidorActivacion(clave, spreadsheetId) {
  try {
    var url = API_URL_ACTIVACION + "?key=" + encodeURIComponent(clave) + "&id=" + encodeURIComponent(spreadsheetId);
    var response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true
    });
    var status = response.getResponseCode();
    var json = JSON.parse(response.getContentText() || "{}");
    if (status === 200 && json.success) {
      return { success: true, customerName: json.customerName, code: json.code };
    }
    return {
      success: false,
      code: json.code || "REJECTED",
      error: json.message || json.error || "Clave no válida o ya utilizada."
    };
  } catch (err) {
    var errStr = (err ? err.toString() : "");
    if (errStr.indexOf("permission") !== -1 || errStr.indexOf("UrlFetchApp") !== -1 || errStr.indexOf("permiso") !== -1) {
      return {
        success: false,
        code: "PERMISSION_REQUIRED",
        error: "👉 Hacé clic en menú '🔒 Licencia' > 'Activar Licencia Comercial'"
      };
    }
    return {
      success: false,
      code: "NETWORK_ERROR",
      error: "Error al conectar con el servidor de licencias. Verificá tu conexión."
    };
  }
}

/**
 * Procesa la activación cuando se escribe en la celda C7
 */
function procesarActivacionCelda(e) {
  var range = e.range;
  var ss = e.source || SpreadsheetApp.getActiveSpreadsheet();
  var sheet = range.getSheet();

  // Verificamos celda C7
  if (range.getRow() !== 7 || range.getColumn() !== 3) {
    return;
  }

  var claveIngresada = (range.getValue() || "").toString().trim().toUpperCase();
  var celdaRespuesta = sheet.getRange("D7");
  sheet.getRange("C8").clearContent();

  if (!claveIngresada) {
    celdaRespuesta
      .setValue("👈 Escribí tu clave para activar")
      .setFontColor("#0D1B2A")
      .setFontWeight("normal");
    return;
  }

  // Bypass para claves de desarrollo/admin
  if (claveIngresada === "FM-ADMIN-MASTER" || claveIngresada === "FM-DEV-MASTER") {
    completarActivacionExitosa(ss, ss.getId(), claveIngresada, "Administrador");
    return;
  }

  // 1. Verificación previa de formato y checksum
  if (!validarClaveLicencia(claveIngresada)) {
    celdaRespuesta
      .setValue("❌ Clave no válida. Revisá el código.")
      .setFontColor("#DC2626")
      .setFontWeight("bold");
    ss.toast("La clave ingresada no es válida.", "❌ Error", 4);
    bloquearHojasOperativas(ss);
    return;
  }

  // 2. Clave con formato válido: en onEdit no se puede hacer UrlFetchApp
  // Guiamos al usuario a hacer clic en el menú o botón
  celdaRespuesta
    .setValue("👉 Clave válida. Hacé clic en menú '🔒 Licencia' > 'Activar'")
    .setFontColor("#1E3A5F")
    .setFontWeight("bold");
  ss.toast("Para validar con el servidor, hacé clic en el menú 🔒 Licencia -> Activar Licencia Comercial", "🔑 Casi listo", 7);
}

/**
 * Detecta si la hoja es la de activación
 */
function esHojaDeActivacion(nombreHoja) {
  if (!nombreHoja) return false;
  var n = nombreHoja.toLowerCase();
  return n.indexOf("activar") !== -1 || n.indexOf("licencia") !== -1;
}

/**
 * Obtiene la referencia a la hoja de activación
 */
function obtenerHojaActivacion(ss) {
  var hojas = ss.getSheets();
  for (var i = 0; i < hojas.length; i++) {
    if (esHojaDeActivacion(hojas[i].getName())) {
      return hojas[i];
    }
  }
  return null;
}

/**
 * Verifica si el archivo cuenta con licencia activa
 */
function estaLicenciaActiva() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return true;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  // Si no tiene ID guardado o no coincide con este archivo
  if (!savedId || savedId !== currentId || estado !== "ACTIVO") {
    bloquearHojasOperativas(ss);
    return false;
  }

  return true;
}

/**
 * Desbloquea ÚNICAMENTE las hojas oficiales del producto
 */
function desbloquearTodasLasHojas(ss) {
  for (var i = 0; i < HOJAS_PRODUCTO.length; i++) {
    var sh = ss.getSheetByName(HOJAS_PRODUCTO[i]);
    if (sh) {
      try {
        sh.showSheet();
      } catch (err) {}
    }
  }

  var dash = ss.getSheetByName("Dashboard") || ss.getSheetByName("dashboard");
  if (dash) {
    try {
      dash.showSheet();
      ss.setActiveSheet(dash);
    } catch (err) {}
  }

  var hojas = ss.getSheets();
  for (var j = 0; j < hojas.length; j++) {
    var sh2 = hojas[j];
    var n2 = sh2.getName().toLowerCase();
    if (n2.indexOf("config") !== -1 || esHojaDeActivacion(sh2.getName())) {
      try {
        sh2.hideSheet();
      } catch (err) {}
    }
  }

  SpreadsheetApp.flush();
}

/**
 * Oculta las hojas oficiales
 */
function bloquearHojasOperativas(ss) {
  var hojaLic = obtenerHojaActivacion(ss);

  if (hojaLic && hojaLic.isSheetHidden()) {
    try {
      hojaLic.showSheet();
    } catch (err) {}
  }

  for (var j = 0; j < HOJAS_PRODUCTO.length; j++) {
    var sh = ss.getSheetByName(HOJAS_PRODUCTO[j]);
    if (sh && !sh.isSheetHidden()) {
      try {
        sh.hideSheet();
      } catch (err) {}
    }
  }

  var conf = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (conf && !conf.isSheetHidden()) {
    try {
      conf.hideSheet();
    } catch (err) {}
  }

  SpreadsheetApp.flush();
}

/**
 * FUNCIÓN PARA PREPARAR LA PLANTILLA ANTES DE VENDERLA
 */
function prepararPlantillaParaVender() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  
  if (db) {
    db.getRange("Z10").clearContent();
    db.getRange("Z11").clearContent();
    db.getRange("Z12").setValue("PENDIENTE");
  }

  var hojaLic = obtenerHojaActivacion(ss);
  if (hojaLic) {
    hojaLic.getRange("C7").clearContent();
    hojaLic.getRange("C8").clearContent();
    hojaLic
      .getRange("D7")
      .setValue("👈 Escribí tu clave y presioná Enter")
      .setFontColor("#0D1B2A")
      .setFontWeight("normal");
  }

  bloquearHojasOperativas(ss);
  SpreadsheetApp.flush();
  ss.toast("Plantilla bloqueada y lista para ser vendida.", "Modo Venta", 5);
}

/**
 * Función de rescate manual
 */
function forzarDesbloqueoManual() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var i = 0; i < HOJAS_PRODUCTO.length; i++) {
    var sh = ss.getSheetByName(HOJAS_PRODUCTO[i]);
    if (sh) {
      try {
        sh.showSheet();
      } catch (e) {}
    }
  }
  var db = ss.getSheetByName("Configuracion");
  if (db) {
    db.getRange("Z10").setValue(ss.getId());
    db.getRange("Z11").setValue("FM-DEV-MASTER");
    db.getRange("Z12").setValue("ACTIVO");
    SpreadsheetApp.flush();
  }
  ss.toast("Hojas oficiales desbloqueadas.", "Listo", 4);
}

/**
 * Verificar estado actual de la copia
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

/**
 * ALGORITMO CRIPTOGRÁFICO DE VALIDACIÓN
 */
function validarClaveLicencia(clave) {
  if (!clave) return false;
  var limpia = clave.toString().trim().toUpperCase().replace(/[\s–—]/g, "-");
  while (limpia.indexOf("--") !== -1) limpia = limpia.replace("--", "-");

  if (limpia === "FM-ADMIN-MASTER" || limpia === "FM-DEV-MASTER") return true;

  var partes = limpia.split("-");
  if (partes.length !== 3 || partes[0] !== "FM") return false;
  
  var seed = partes[1];
  var checkEsperado = calcularChecksumLicencia(seed);
  return partes[2] === checkEsperado;
}

function calcularChecksumLicencia(str) {
  var hash = 5381;
  var combined = str + SALT_SEGURIDAD;
  for (var i = 0; i < combined.length; i++) {
    hash = ((hash * 33) ^ combined.charCodeAt(i)) >>> 0;
  }
  var code = Math.abs(hash).toString(36).toUpperCase();
  while (code.length < 4) code = "0" + code;
  return code.substring(0, 4);
}
