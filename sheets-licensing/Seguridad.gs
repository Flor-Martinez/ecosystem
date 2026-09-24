/**
 * ====================================================================
 * SISTEMA DE SEGURIDAD Y LICENCIAS - ZERO-AUTH CONECTADO A SUPABASE
 * ====================================================================
 * Flor Martínez · Ecosistema Digital
 * 
 * - Validación 100% en la nube mediante fórmula nativa de Google (=IMPORTDATA).
 * - CERO carteles de autorización de Google ("App no verificada / Página desconocida").
 * - El cliente solo escribe su clave en C7 y presiona Enter.
 * - Si hacen una copia y le pasan la clave a un amigo, Supabase la rechaza con ALREADY_USED.
 * - Auto-renombrado a "Finanzas en Orden - Flor Martínez".
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
      .addItem("Verificar Estado", "verificarEstadoLicencia")
      .addItem("Desbloquear Planilla", "activarPlanillaBoton")
      .addToUi();
  } catch (err) {}

  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  // Si es una copia clonada con el ID del dueño anterior
  if (savedId && savedId !== currentId) {
    db.getRange("Z10").setValue(currentId);
    db.getRange("Z11").clearContent();
    db.getRange("Z12").setValue("PENDIENTE");
    SpreadsheetApp.flush();

    bloquearHojasOperativas(ss);
    asegurarFormulasVinculacion(ss);

    var hojaLic = obtenerHojaActivacion(ss);
    if (hojaLic) {
      hojaLic.getRange("C7").clearContent();
      hojaLic.getRange("C8").clearContent();
    }
    ss.toast("Esta copia requiere su propia clave de licencia comercial.", "🔒 Archivo Duplicado", 6);
  } else if (!savedId || estado !== "ACTIVO") {
    // Si la fórmula IMPORTDATA ya dio OK (por ejemplo tras hacer clic en Permitir acceso)
    var z20 = (db.getRange("Z20").getValue() || "").toString().trim();
    if (z20 === "OK") {
      var portadaLic = obtenerHojaActivacion(ss);
      var key = (portadaLic ? portadaLic.getRange("C7").getValue() : "").toString().trim().toUpperCase();
      var customer = (db.getRange("AB20").getValue() || "").toString().trim() || "Cliente Oficial";
      completarActivacionExitosa(ss, currentId, key, customer);
      return;
    }
    bloquearHojasOperativas(ss);
    asegurarFormulasVinculacion(ss);
  }
}

/**
 * Asegura que la fórmula de consulta remota esté lista en Configuracion!Z20 y D7
 */
function asegurarFormulasVinculacion(ss) {
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  var portada = obtenerHojaActivacion(ss) || ss.getSheets()[0];
  if (!db || !portada) return;

  var currentId = ss.getId();
  db.getRange("Z10").setValue(currentId);

  var nombrePortada = portada.getName();
  var formulaZ20 = '=IF(ISBLANK(\'' + nombrePortada + '\'!C7), "", IFERROR(IMPORTDATA(CONCATENATE("' + API_URL_ACTIVACION + '?format=csv&key=", \'' + nombrePortada + '\'!C7, "&id=", Z10)), "ERROR"))';

  var formulaActual = db.getRange("Z20").getFormula();
  if (!formulaActual || formulaActual.indexOf("activate") === -1) {
    db.getRange("Z20").setFormula(formulaZ20);
  }

  var formulaD7 = '=IF(ISBLANK(C7), "👈 Escribí tu clave para activar", IF(ISERROR(Configuracion!Z20), "⏳ Validando...", IF(Configuracion!Z20="OK", "✅ ¡Licencia Oficial Activada!", IF(Configuracion!Z20="ERROR", Configuracion!AB20, "⏳ Validando..."))))';
  var formulaD7Actual = portada.getRange("D7").getFormula();
  if (!formulaD7Actual || formulaD7Actual.indexOf("Configuracion") === -1) {
    portada.getRange("D7").setFormula(formulaD7);
  }

  // Texto de ayuda sutil en C8
  var c8Val = (portada.getRange("C8").getValue() || "").toString().trim();
  if (!c8Val || c8Val.indexOf("💡") === 0) {
    portada.getRange("C8")
      .setValue("💡 Si ves una barra amarilla arriba, hacé clic en 'Permitir acceso'.")
      .setFontColor("#64748B")
      .setFontSize(8)
      .setFontStyle("italic");
  }
}

/**
 * Procesa la activación cuando se escribe en la celda C7 o se toca C8
 */
function procesarActivacionCelda(e) {
  var range = e.range;
  var ss = e.source || SpreadsheetApp.getActiveSpreadsheet();
  var sheet = range.getSheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return;

  var row = range.getRow();
  var col = range.getColumn();
  var currentId = ss.getId();

  // Caso 1: Se editó la celda C7 (escribió o pegó la clave)
  if (row === 7 && col === 3) {
    // Restaurar automáticamente el diseño visual de la celda C7 (evita que se pegue el formato de WhatsApp/Mail)
    try {
      range
        .setFontFamily("Plus Jakarta Sans")
        .setFontSize(11)
        .setFontWeight("bold")
        .setFontColor("#1E3A5F")
        .setBackground("#FFFFFF")
        .setHorizontalAlignment("center")
        .setVerticalAlignment("middle");
    } catch(err) {}

    var valorCrudo = (range.getValue() || "").toString();
    var claveIngresada = valorCrudo.trim().toUpperCase();
    if (valorCrudo !== claveIngresada) {
      range.setValue(claveIngresada);
    }
    sheet.getRange("C8").clearContent();

    if (!claveIngresada) {
      asegurarFormulasVinculacion(ss);
      return;
    }

    // Bypass para claves maestras de desarrollo/admin
    if (claveIngresada === "FM-ADMIN-MASTER" || claveIngresada === "FM-DEV-MASTER") {
      completarActivacionExitosa(ss, currentId, claveIngresada, "Administrador");
      return;
    }

    // 1. Verificación matemática previa
    if (!validarClaveLicencia(claveIngresada)) {
      sheet.getRange("D7").setValue("❌ Clave no válida. Revisá el código.").setFontColor("#DC2626").setFontWeight("bold");
      ss.toast("La clave ingresada no es válida.", "❌ Error", 4);
      bloquearHojasOperativas(ss);
      return;
    }

    // 2. Clave con formato válido: aseguramos fórmulas
    asegurarFormulasVinculacion(ss);

    // 3. Esperamos la respuesta de IMPORTDATA (hasta 3.5 segundos)
    for (var i = 0; i < 7; i++) {
      Utilities.sleep(500);
      SpreadsheetApp.flush();
      var z20 = (db.getRange("Z20").getValue() || "").toString().trim();
      if (z20 === "OK") {
        var customer = (db.getRange("AB20").getValue() || "").toString().trim() || "Cliente Oficial";
        completarActivacionExitosa(ss, currentId, claveIngresada, customer);
        return;
      } else if (z20 === "ERROR") {
        var errMsg = (db.getRange("AB20").getValue() || "").toString().trim() || "Esta clave ya fue activada en otra copia.";
        sheet.getRange("D7").setValue("❌ " + errMsg).setFontColor("#DC2626").setFontWeight("bold");
        ss.toast(errMsg, "❌ Licencia Rechazada", 6);
        bloquearHojasOperativas(ss);
        return;
      }
    }

    // Si la conexión tardó un instante más, la fórmula D7 mostrará el estado
    return;
  }

  // Caso 2: Se tocó la celda C8
  if (row === 8 && col === 3) {
    var z20Check = (db.getRange("Z20").getValue() || "").toString().trim();
    if (z20Check === "OK") {
      var key = (sheet.getRange("C7").getValue() || "").toString().trim().toUpperCase();
      var cust = (db.getRange("AB20").getValue() || "").toString().trim() || "Cliente Oficial";
      completarActivacionExitosa(ss, currentId, key, cust);
    }
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
    portada.getRange("D7").setValue("✅ ¡Licencia Oficial Activada!").setFontColor("#15803D").setFontWeight("bold");
    portada.getRange("C8").clearContent();
  }

  try {
    var actual = ss.getName();
    if (actual.indexOf("Copia de ") === 0 || actual.indexOf("Copy of ") === 0) {
      ss.rename(actual.replace(/^(Copia de|Copy of)\s*/i, "").trim() || "Finanzas en Orden - Flor Martínez");
    }
  } catch (err) {}

  desbloquearTodasLasHojas(ss);
  ss.toast("¡Bienvenido/a " + customerName + "! Planilla lista para usar.", "✅ Licencia Activada", 5);
}

/**
 * Función manual por botón o menú (no requiere OAuth externo)
 */
function activarPlanillaBoton() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  var portada = obtenerHojaActivacion(ss) || ss.getSheets()[0];
  var currentId = ss.getId();

  var claveIngresada = (portada.getRange("C7").getValue() || "").toString().trim().toUpperCase();
  if (!claveIngresada) {
    var ui = SpreadsheetApp.getUi();
    var resp = ui.prompt("Activar Planilla Finanzas en Orden", "Ingresá tu clave oficial (ej. FM-XXXX-YYYY):", ui.ButtonSet.OK_CANCEL);
    if (resp.getSelectedButton() !== ui.Button.OK) return;
    claveIngresada = (resp.getResponseText() || "").trim().toUpperCase();
    if (!claveIngresada) return;
    portada.getRange("C7").setValue(claveIngresada);
  }

  asegurarFormulasVinculacion(ss);
  SpreadsheetApp.flush();

  var z20 = (db ? db.getRange("Z20").getValue() : "").toString().trim();
  if (z20 === "OK") {
    var customer = (db ? db.getRange("AB20").getValue() : "").toString().trim() || "Cliente Oficial";
    completarActivacionExitosa(ss, currentId, claveIngresada, customer);
  } else if (z20 === "ERROR") {
    var err = (db ? db.getRange("AB20").getValue() : "").toString().trim() || "Clave ya utilizada en otra copia.";
    portada.getRange("D7").setValue("❌ " + err).setFontColor("#DC2626").setFontWeight("bold");
    ss.toast(err, "❌ Error de Licencia", 5);
  } else {
    ss.toast("Validando con el servidor... la planilla se abrirá en segundos.", "⏳ Conectando", 4);
  }
}

/**
 * Detecta si la hoja es la de activación
 */
function esHojaDeActivacion(nombre) {
  if (!nombre) return false;
  var n = nombre.toLowerCase();
  return n.indexOf("activaci") !== -1 || n.indexOf("licencia") !== -1;
}

/**
 * Encuentra la hoja de activación del spreadsheet
 */
function obtenerHojaActivacion(ss) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (esHojaDeActivacion(sheets[i].getName())) {
      return sheets[i];
    }
  }
  return null;
}

/**
 * Verifica si el archivo actual está debidamente licenciado
 */
function estaLicenciaActiva() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return true;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  if (!savedId || savedId !== currentId || estado !== "ACTIVO") {
    bloquearHojasOperativas(ss);
    return false;
  }
  return true;
}

/**
 * Desbloquea y muestra todas las hojas operativas
 */
function desbloquearTodasLasHojas(ss) {
  for (var i = 0; i < HOJAS_PRODUCTO.length; i++) {
    var h = ss.getSheetByName(HOJAS_PRODUCTO[i]);
    if (h) {
      try { h.showSheet(); } catch(e) {}
    }
  }

  var dash = ss.getSheetByName("Dashboard") || ss.getSheetByName("dashboard");
  if (dash) {
    try {
      dash.showSheet();
      ss.setActiveSheet(dash);
    } catch(e) {}
  }

  var todas = ss.getSheets();
  for (var j = 0; j < todas.length; j++) {
    var hoja = todas[j];
    var nombreLower = hoja.getName().toLowerCase();
    if (nombreLower.indexOf("config") !== -1 || esHojaDeActivacion(hoja.getName())) {
      try { hoja.hideSheet(); } catch(e) {}
    }
  }

  SpreadsheetApp.flush();
}

/**
 * Oculta todas las hojas operativas de la planilla y muestra solo la de activación
 */
function bloquearHojasOperativas(ss) {
  var hojaActivacion = obtenerHojaActivacion(ss);
  if (hojaActivacion && hojaActivacion.isSheetHidden()) {
    try { hojaActivacion.showSheet(); } catch(e) {}
  }

  for (var i = 0; i < HOJAS_PRODUCTO.length; i++) {
    var h = ss.getSheetByName(HOJAS_PRODUCTO[i]);
    if (h && !h.isSheetHidden()) {
      try { h.hideSheet(); } catch(e) {}
    }
  }

  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (db && !db.isSheetHidden()) {
    try { db.hideSheet(); } catch(e) {}
  }

  SpreadsheetApp.flush();
}

/**
 * Función que ejecuta el creador antes de entregar o publicar la plantilla maestra
 */
function prepararPlantillaParaVender() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (db) {
    db.getRange("Z10").clearContent();
    db.getRange("Z11").clearContent();
    db.getRange("Z12").setValue("PENDIENTE");
  }

  var portada = obtenerHojaActivacion(ss);
  if (portada) {
    var c7 = portada.getRange("C7");
    c7.clearContent();
    try {
      c7.setFontFamily("Plus Jakarta Sans")
        .setFontSize(11)
        .setFontWeight("bold")
        .setFontColor("#1E3A5F")
        .setBackground("#FFFFFF")
        .setHorizontalAlignment("center")
        .setVerticalAlignment("middle");
    } catch(e) {}
    portada.getRange("C8").clearContent();
  }

  bloquearHojasOperativas(ss);
  asegurarFormulasVinculacion(ss);
  SpreadsheetApp.flush();

  ss.toast("Plantilla bloqueada y lista para vender en modo comercial.", "🔒 Modo Ventas", 5);
}

/**
 * Desbloqueo de emergencia del creador
 */
function forzarDesbloqueoManual() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var i = 0; i < HOJAS_PRODUCTO.length; i++) {
    var h = ss.getSheetByName(HOJAS_PRODUCTO[i]);
    if (h) {
      try { h.showSheet(); } catch(e) {}
    }
  }

  var db = ss.getSheetByName("Configuracion");
  if (db) {
    db.getRange("Z10").setValue(ss.getId());
    db.getRange("Z11").setValue("FM-ADMIN-MASTER");
    db.getRange("Z12").setValue("ACTIVO");
    SpreadsheetApp.flush();
  }

  ss.toast("Planilla desbloqueada en modo maestro.", "🔓 Admin", 4);
}

/**
 * Muestra el estado actual de la licencia
 */
function verificarEstadoLicencia() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  var ui = SpreadsheetApp.getUi();
  if (!db) {
    ui.alert("No se encontró la hoja de configuración.");
    return;
  }

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var savedKey = (db.getRange("Z11").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  if (estado === "ACTIVO" && savedId === currentId) {
    ui.alert("✅ Licencia Activa", "Tu planilla está autorizada y vinculada a este archivo.\nClave: " + savedKey, ui.ButtonSet.OK);
  } else {
    ui.alert("🔒 Licencia Pendiente", "Esta copia requiere activación comercial.\nEscribí tu clave oficial en la celda C7.", ui.ButtonSet.OK);
  }
}

/**
 * Valida matemáticamente el formato y checksum de una clave FM-XXXX-YYYY
 */
function validarClaveLicencia(clave) {
  if (!clave) return false;
  var normalizada = clave.toString().trim().toUpperCase().replace(/[\s–—]/g, "-");
  while (normalizada.indexOf("--") !== -1) {
    normalizada = normalizada.replace("--", "-");
  }

  if (normalizada === "FM-ADMIN-MASTER" || normalizada === "FM-DEV-MASTER") {
    return true;
  }

  var partes = normalizada.split("-");
  if (partes.length !== 3 || partes[0] !== "FM") {
    return false;
  }

  var seed = partes[1];
  var checksumEsperado = calcularChecksumLicencia(seed);
  return partes[2] === checksumEsperado;
}

/**
 * Algoritmo criptográfico DJB2 modificado para generar el Checksum
 */
function calcularChecksumLicencia(seed) {
  var hash = 5381;
  var str = seed + SALT_SEGURIDAD;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash * 33) ^ str.charCodeAt(i)) >>> 0;
  }
  var base36 = Math.abs(hash).toString(36).toUpperCase();
  while (base36.length < 4) {
    base36 = "0" + base36;
  }
  return base36.substring(0, 4);
}
