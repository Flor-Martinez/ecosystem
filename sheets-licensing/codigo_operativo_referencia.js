**
 * ====================================================================
 * SISTEMA INTEGRAL: FLOR MARTÍNEZ SIGNATURE (VERSIÓN DEFINITIVA)
 * ====================================================================
 * - Sincronización en tiempo real Movimientos <-> Configuracion
 * - Eliminación de salto a fila 62 (registros ordenados desde fila 2)
 * - Sin flechitas residuales en categorías si no hay tipo elegido
 * - Desplegables dinámicos automáticos (Gasto / Ingreso / Meta)
 * - Auto-limpieza de categoría al alternar Tipo
 * - Reconstructor por lote al cambiar de mes
 * - Gestión histórica de 6 Metas de Ahorro
 */

// Categorías oficiales
const CATEGORIAS_GASTO = [
  "🏠 Vivienda", "🍔 Comida", "🚗 Transporte", "👾 Ocio/Suscripciones",
  "✈️ Viajes", "🎓 Educación", "👜 Compras", "📦 Otros"
];

const CATEGORIAS_INGRESO = [
  "💼 Sueldo", "💻 Freelance / Honorarios", "📈 Inversiones / Rendimientos",
  "🎁 Extra / Regalos", "🔄 Ventas"
];

// Celdas maestras de las 6 Metas en la hoja 'Metas'
const CELDAS_TITULOS_METAS = ["C6", "G6", "C13", "G13", "C20", "G20"];
const CELDAS_OBJETIVOS_METAS = ["C7", "G7", "C14", "G14", "C21", "G21"];

/**
 * Disparador principal de ediciones
 */
function onEdit(e) {
  if (!e || !e.range) return;

  var sheet = e.range.getSheet();
  var sheetName = sheet.getName();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var db = ss.getSheetByName("Configuracion");
  var row = e.range.getRow();
  var col = e.range.getColumn();

  // 1. DASHBOARD: Cambio de Año (G2/H2) o Mes (G3/H3)
  if (sheetName === "Dashboard") {
    if ((col === 7 || col === 8) && (row === 2 || row === 3)) {
      procesarCambioPeriodo(e);
    }
    return;
  }

  // 2. MOVIMIENTOS: Edición dentro de la tabla (Filas 6 a 105, Cols B a G)
  if (sheetName === "Movimientos" && row >= 6 && row <= 105 && col >= 2 && col <= 7) {
    // Si cambió la Columna D (Tipo), actualiza el desplegable de Columna E
    if (col === 4) {
      actualizarDesplegableDinamico(sheet, e.range, e.value);
    }

    // Sincronización en vivo con Configuracion
    var celdaMemoria = db.getRange("Z1");
    var periodoActivo = normalizarPeriodo(celdaMemoria.getDisplayValue());
    if (!periodoActivo) {
      var dash = ss.getSheetByName("Dashboard");
      var ano = dash.getRange("G2").getDisplayValue().toString().trim() || dash.getRange("H2").getDisplayValue().toString().trim();
      var mes = dash.getRange("G3").getDisplayValue().toString().trim() || dash.getRange("H3").getDisplayValue().toString().trim();
      periodoActivo = normalizarPeriodo(mes + "-" + ano);
      celdaMemoria.setValue(periodoActivo);
    }
    guardarDatosPeriodo(sheet, db, periodoActivo);
    return;
  }

  // 3. METAS: Edición de Título u Objetivo
  if (sheetName === "Metas") {
    var a1 = e.range.getA1Notation();
    if (CELDAS_TITULOS_METAS.indexOf(a1) !== -1 || CELDAS_OBJETIVOS_METAS.indexOf(a1) !== -1) {
      if (db) guardarMetasMaestrasEnDB(sheet, db);
    }
  }
}

/**
 * Desplegable dinámico en Movimientos (Columna E según Columna D)
 * Quita la flechita si no hay Tipo y limpia textos incompatibles
 */
function actualizarDesplegableDinamico(sheet, cell, tipoSeleccionado) {
  var celdaDestino = cell.offset(0, 1); // Columna E
  var tipoValor = (tipoSeleccionado || cell.getDisplayValue()).toString().trim();

  // Si se vacía el tipo, quita validación (sin flechitas) y limpia la celda
  if (!tipoValor || tipoValor === "") {
    celdaDestino.clearDataValidations();
    celdaDestino.setValue("");
    return;
  }

  var listaOpciones = [];
  var tipoNorm = tipoValor.toLowerCase();

  if (tipoNorm.indexOf("gasto") !== -1) {
    listaOpciones = CATEGORIAS_GASTO;
  } else if (tipoNorm.indexOf("ingreso") !== -1) {
    listaOpciones = CATEGORIAS_INGRESO;
  } else if (tipoNorm.indexOf("meta") !== -1) {
    listaOpciones = obtenerNombresMetasActivas();
    if (listaOpciones.length === 0) {
      listaOpciones = ["(Carga títulos en la hoja Metas)"];
    }
  }

  if (listaOpciones.length > 0) {
    var regla = SpreadsheetApp.newDataValidation()
      .requireValueInList(listaOpciones, true)
      .setAllowInvalid(true)
      .build();
    celdaDestino.setDataValidation(regla);

    // Si lo que ya estaba escrito no pertenece a las nuevas opciones, se vacía
    var catActual = celdaDestino.getDisplayValue().toString().trim();
    if (catActual !== "" && listaOpciones.indexOf(catActual) === -1) {
      celdaDestino.setValue("");
    }
  } else {
    celdaDestino.clearDataValidations();
  }
}

/**
 * Procesa el cambio de Mes o Año desde el Dashboard
 */
function procesarCambioPeriodo(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dash = ss.getSheetByName("Dashboard");
  var mov = ss.getSheetByName("Movimientos");
  var db = ss.getSheetByName("Configuracion");

  if (!dash || !mov || !db) return;

  var ano = dash.getRange("G2").getDisplayValue().toString().trim() || 
            dash.getRange("H2").getDisplayValue().toString().trim();
  var mes = dash.getRange("G3").getDisplayValue().toString().trim() || 
            dash.getRange("H3").getDisplayValue().toString().trim();

  if (!ano || !mes) return;

  var nuevoPeriodo = normalizarPeriodo(mes + "-" + ano);
  var celdaMemoria = db.getRange("Z1");
  var periodoAnterior = normalizarPeriodo(celdaMemoria.getDisplayValue());

  if (!periodoAnterior && e && e.oldValue) {
    if (e.range.getRow() === 3) {
      periodoAnterior = normalizarPeriodo(e.oldValue + "-" + ano);
    } else if (e.range.getRow() === 2) {
      periodoAnterior = normalizarPeriodo(mes + "-" + e.oldValue);
    }
  }

  if (!periodoAnterior) {
    mov.getRange("B6:G105").clearContent();
    mov.getRange("E6:E105").clearDataValidations();
    cargarDatosPeriodo(mov, db, nuevoPeriodo);
    celdaMemoria.setValue(nuevoPeriodo);
    return;
  }

  if (periodoAnterior === nuevoPeriodo) return;

  // 1. Guardar período anterior
  guardarDatosPeriodo(mov, db, periodoAnterior);

  // 2. Limpiar pantalla de Movimientos y QUITAR TODAS LAS VALIDACIONES RESIDUALES
  mov.getRange("B6:G105").clearContent();
  mov.getRange("E6:E105").clearDataValidations();

  // 3. Cargar nuevo período
  cargarDatosPeriodo(mov, db, nuevoPeriodo);

  // 4. Actualizar memoria
  celdaMemoria.setValue(nuevoPeriodo);
  ss.toast("Datos de " + nuevoPeriodo + " cargados.", "Período actualizado", 3);
}

/**
 * Guarda los movimientos del período activo en Configuracion (Filas 2 en adelante)
 */
function guardarDatosPeriodo(mov, db, periodo) {
  var datosPantalla = mov.getRange("B6:G105").getValues();
  var target = normalizarPeriodo(periodo);
  
  var filasNuevas = [];
  for (var i = 0; i < datosPantalla.length; i++) {
    var fila = datosPantalla[i];
    var tieneDatos = fila.some(function(celda) {
      return celda !== "" && celda !== null && celda !== undefined;
    });
    if (tieneDatos) {
      filasNuevas.push([target, fila[0], fila[1], fila[2], fila[3], fila[4], fila[5]]);
    }
  }

  var ultFilaDB = db.getLastRow();
  var registrosConservados = [];

  if (ultFilaDB > 1) {
    var datosExistentes = db.getRange(2, 1, ultFilaDB - 1, 7).getValues();
    var displayA = db.getRange(2, 1, ultFilaDB - 1, 1).getDisplayValues();

    for (var j = 0; j < datosExistentes.length; j++) {
      var perVal = normalizarPeriodo(datosExistentes[j][0]);
      var perDisp = normalizarPeriodo(displayA[j][0]);

      // DESCARTAR FILAS VACÍAS (Evita empujar los datos a la fila 62)
      var tienePeriodo = (perVal !== "" || perDisp !== "");
      if (tienePeriodo && perVal !== target && perDisp !== target) {
        registrosConservados.push(datosExistentes[j]);
      }
    }

    // Limpieza amplia para borrar cualquier residuo en filas inferiores
    var filasALimpiar = Math.max(ultFilaDB, 200);
    db.getRange(2, 1, filasALimpiar, 7).clearContent();
  }

  var datosFinales = registrosConservados.concat(filasNuevas);

  if (datosFinales.length > 0) {
    db.getRange(2, 1, datosFinales.length, 7).setValues(datosFinales);
  }
}

/**
 * Carga los movimientos del período seleccionado desde Configuracion hacia Movimientos
 */
function cargarDatosPeriodo(mov, db, periodo) {
  var ultFilaDB = db.getLastRow();
  if (ultFilaDB <= 1) return;

  var datosDB = db.getRange(2, 1, ultFilaDB - 1, 7).getValues();
  var displayA = db.getRange(2, 1, ultFilaDB - 1, 1).getDisplayValues();
  var target = normalizarPeriodo(periodo);

  var filasEncontradas = [];

  for (var i = 0; i < datosDB.length; i++) {
    var perVal = normalizarPeriodo(datosDB[i][0]);
    var perDisp = normalizarPeriodo(displayA[i][0]);

    if (perVal === target || perDisp === target) {
      filasEncontradas.push(datosDB[i].slice(1, 7));
    }
  }

  if (filasEncontradas.length > 0) {
    var total = Math.min(filasEncontradas.length, 100);
    mov.getRange(6, 2, total, 6).setValues(filasEncontradas.slice(0, total));
    repararValidacionesLote(mov, filasEncontradas.slice(0, total));
  }
}

/**
 * Asigna validaciones exactas únicamente a las filas cargadas
 */
function repararValidacionesLote(mov, filas) {
  var metasActivas = obtenerNombresMetasActivas();
  if (metasActivas.length === 0) metasActivas = ["(Sin metas definidas)"];

  var reglaGasto = SpreadsheetApp.newDataValidation()
    .requireValueInList(CATEGORIAS_GASTO, true)
    .setAllowInvalid(true)
    .build();

  var reglaIngreso = SpreadsheetApp.newDataValidation()
    .requireValueInList(CATEGORIAS_INGRESO, true)
    .setAllowInvalid(true)
    .build();

  var reglaMeta = SpreadsheetApp.newDataValidation()
    .requireValueInList(metasActivas, true)
    .setAllowInvalid(true)
    .build();

  var matrizReglas = [];
  for (var i = 0; i < filas.length; i++) {
    var tipo = (filas[i][2] || "").toString().toLowerCase().trim(); // Col D (Tipo)
    if (tipo.indexOf("gasto") !== -1) {
      matrizReglas.push([reglaGasto]);
    } else if (tipo.indexOf("ingreso") !== -1) {
      matrizReglas.push([reglaIngreso]);
    } else if (tipo.indexOf("meta") !== -1) {
      matrizReglas.push([reglaMeta]);
    } else {
      matrizReglas.push([null]);
    }
  }

  if (matrizReglas.length > 0) {
    mov.getRange(6, 5, matrizReglas.length, 1).setDataValidations(matrizReglas);
  }
}

/**
 * Lee las metas activas desde la hoja 'Metas'
 */
function obtenerNombresMetasActivas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var metaSheet = ss.getSheetByName("Metas");
  if (!metaSheet) return [];

  var nombres = [];
  for (var i = 0; i < CELDAS_TITULOS_METAS.length; i++) {
    var val = metaSheet.getRange(CELDAS_TITULOS_METAS[i]).getDisplayValue().toString().trim();
    if (val !== "" && val !== "Título:" && val !== "$0") {
      nombres.push(val);
    }
  }
  return nombres;
}

/**
 * Guarda las 6 metas maestras en Configuracion (Columnas I, J, K)
 */
function guardarMetasMaestrasEnDB(metaSheet, db) {
  if (db.getRange("I1").getValue() === "") {
    db.getRange("I1:K1").setValues([["ID_Meta", "Titulo_Meta", "Objetivo_Meta"]]);
  }

  var filas = [];
  for (var i = 0; i < 6; i++) {
    var tit = metaSheet.getRange(CELDAS_TITULOS_METAS[i]).getDisplayValue().toString().trim();
    var obj = metaSheet.getRange(CELDAS_OBJETIVOS_METAS[i]).getValue();
    filas.push(["Meta " + (i + 1), tit, obj]);
  }

  db.getRange(2, 9, 6, 3).setValues(filas);
}

/**
 * Normaliza textos de períodos para comparación consistente
 */
function normalizarPeriodo(val) {
  if (val === null || val === undefined || val === "") return "";

  if (val instanceof Date) {
    var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
    var mesNum = parseInt(Utilities.formatDate(val, tz, "M"), 10);
    var ano = Utilities.formatDate(val, tz, "yyyy");
    var nombresMeses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return nombresMeses[mesNum - 1] + "-" + ano;
  }

  var str = val.toString().trim().toLowerCase();
  return str.replace(/\s*-\s*/g, "-");
}

/**
 * Utilidad rápida (ejecución manual opcional de 1 clic)
 * Limpia cualquier flechita huérfana en Movimientos si la celda de Tipo está vacía
 */
function limpiarFlechitasVacias() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mov = ss.getSheetByName("Movimientos");
  if (!mov) return;

  var tipos = mov.getRange("D6:D105").getValues();
  for (var i = 0; i < tipos.length; i++) {
    var val = (tipos[i][0] || "").toString().trim();
    if (val === "") {
      mov.getRange(6 + i, 5).clearDataValidations();
    }
  }
  ss.toast("Flechitas residuales eliminadas.", "Listo", 3);
}