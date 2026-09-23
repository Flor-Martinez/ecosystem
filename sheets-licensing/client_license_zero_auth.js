/**
 * ====================================================================
 * SISTEMA DE SEGURIDAD ZERO-AUTH (CON AUTO-BLOQUEO ON-OPEN)
 * ====================================================================
 * Flor Martínez Signature - Sistema de Licencias Comerciales
 */

const SALT_SEGURIDAD = "FLOR_MARTINEZ_2026_SECRET";

// Lista oficial de hojas que deben mostrarse al cliente:
const HOJAS_PRODUCTO = ["Dashboard", "Movimientos", "Metas", "Informe Detallado", "Gastos Hormiga"];

/**
 * onOpen: Se ejecuta automáticamente al abrir el archivo (o al abrir una copia).
 * Si detecta que el ID del archivo no coincide con el autorizado, LO BLOQUEA AL INSTANTE.
 */
function onOpen(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  // Si el archivo fue copiado/duplicado, o no está activado
  if (!savedId || savedId !== currentId || estado !== "ACTIVO") {
    bloquearHojasOperativas(ss);
    ss.toast("Esta copia requiere su propia clave de licencia comercial.", "🔒 Archivo No Autorizado", 6);
  }
}

/**
 * Función que procesa la activación en la celda C7
 */
function procesarActivacionCelda(e) {
  var range = e.range;
  var ss = e.source || SpreadsheetApp.getActiveSpreadsheet();
  var sheet = range.getSheet();
  
  // Verificamos que sea la celda C7 (Fila 7, Columna 3)
  if (range.getRow() !== 7 || range.getColumn() !== 3) {
    return;
  }

  var claveIngresada = (range.getValue() || "").toString().trim().toUpperCase();
  var celdaRespuesta = sheet.getRange("C8");

  if (!claveIngresada) {
    celdaRespuesta.setValue("👈 Ingresá tu clave arriba y presioná Enter").setFontColor("#64748B").setFontWeight("normal");
    return;
  }

  ss.toast("Comprobando clave: " + claveIngresada + "...", "🔒 Seguridad", 3);

  // 1. Validamos la clave con el algoritmo criptográfico
  if (validarClaveLicencia(claveIngresada)) {
    var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
    var currentId = ss.getId();

    if (db) {
      db.getRange("Z10").setValue(currentId);       // ID del archivo autorizado
      db.getRange("Z11").setValue(claveIngresada);  // Clave activada
      db.getRange("Z12").setValue("ACTIVO");        // Estado
      SpreadsheetApp.flush();
    }

    celdaRespuesta
      .setValue("✅ ¡Licencia Activada con Éxito! Abriendo tu planilla...")
      .setFontColor("#16A34A")
      .setFontWeight("bold");

    SpreadsheetApp.flush();

    // 2. Desbloqueamos ÚNICAMENTE las hojas oficiales
    desbloquearTodasLasHojas(ss);

    ss.toast("¡Plantilla desbloqueada con éxito! Bienvenida/o.", "✅ Éxito", 5);

  } else {
    // Clave incorrecta
    celdaRespuesta
      .setValue("❌ Clave no válida. Verificá tu código de compra.")
      .setFontColor("#DC2626")
      .setFontWeight("bold");

    ss.toast("La clave ingresada no es válida.", "❌ Error", 4);
    bloquearHojasOperativas(ss);
  }
}

/**
 * Detecta si la hoja es la de activación (con o sin emoji)
 */
function esHojaDeActivacion(nombreHoja) {
  if (!nombreHoja) return false;
  var n = nombreHoja.toLowerCase();
  return n.indexOf("activar") !== -1 || n.indexOf("licencia") !== -1;
}

/**
 * Verifica si el archivo cuenta con licencia activa (para onEdit)
 */
function estaLicenciaActiva() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  if (!db) return true;

  var currentId = ss.getId();
  var savedId = (db.getRange("Z10").getValue() || "").toString().trim();
  var estado = (db.getRange("Z12").getValue() || "").toString().trim();

  // Si no tiene ID guardado o no coincide con este archivo (copia clonada)
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
  // PASO 1: Mostramos estrictamente las hojas oficiales
  for (var i = 0; i < HOJAS_PRODUCTO.length; i++) {
    var sh = ss.getSheetByName(HOJAS_PRODUCTO[i]);
    if (sh) {
      try {
        sh.showSheet();
      } catch (err) {}
    }
  }

  // PASO 2: Ponemos Dashboard como hoja activa
  var dash = ss.getSheetByName("Dashboard") || ss.getSheetByName("dashboard");
  if (dash) {
    try {
      dash.showSheet();
      ss.setActiveSheet(dash);
    } catch (err) {}
  }

  // PASO 3: Ocultamos hoja de activación y configuración
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
 * Oculta las hojas oficiales si no está activada
 */
function bloquearHojasOperativas(ss) {
  var hojas = ss.getSheets();
  var hojaLic = null;

  for (var i = 0; i < hojas.length; i++) {
    if (esHojaDeActivacion(hojas[i].getName())) {
      hojaLic = hojas[i];
      break;
    }
  }

  if (hojaLic) {
    try {
      hojaLic.showSheet();
      ss.setActiveSheet(hojaLic);
    } catch (err) {}
  }

  // Ocultamos únicamente las oficiales
  for (var j = 0; j < HOJAS_PRODUCTO.length; j++) {
    var sh = ss.getSheetByName(HOJAS_PRODUCTO[j]);
    if (sh) {
      try {
        sh.hideSheet();
      } catch (err) {}
    }
  }
}

/**
 * FUNCIÓN PARA PREPARAR LA PLANTILLA ANTES DE VENDERLA:
 * Ejecutala en Apps Script cuando quieras dejar la plantilla limpia y bloqueada,
 * lista para entregarle el enlace a tus compradores.
 */
function prepararPlantillaParaVender() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion") || ss.getSheetByName("configuracion");
  
  if (db) {
    db.getRange("Z10").clearContent(); // Borra el ID
    db.getRange("Z11").clearContent(); // Borra la clave
    db.getRange("Z12").setValue("PENDIENTE");
  }

  var hojas = ss.getSheets();
  var hojaLic = null;
  for (var i = 0; i < hojas.length; i++) {
    if (esHojaDeActivacion(hojas[i].getName())) {
      hojaLic = hojas[i];
      break;
    }
  }

  if (hojaLic) {
    hojaLic.getRange("C7").clearContent();
    hojaLic.getRange("C8").setValue("👈 Ingresá tu clave aquí y presioná Enter").setFontColor("#64748B");
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
 * ALGORITMO CRIPTOGRÁFICO DE VALIDACIÓN
 */
function validarClaveLicencia(clave) {
  if (!clave) return false;
  var limpia = clave.toString().trim().toUpperCase();
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
