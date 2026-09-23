/**
 * ====================================================================
 * SISTEMA CLIENTE DE SEGURIDAD Y LICENCIAS - FLOR MARTÍNEZ
 * ====================================================================
 * Este código se añade al script de tu plantilla comercial de Google Sheets.
 * 
 * 1. Pega la URL de tu Web App en la variable URL_SERVIDOR_LICENCIAS
 * 2. Si alguien hace "Hacer una copia", el script detecta el cambio de ID
 *    y bloquea las hojas hasta que se ingrese una licencia válida única.
 */

// PEGA AQUÍ LA URL DE TU APLICACIÓN WEB PUBLICADA EN LA PLANILLA MASTER:
const URL_SERVIDOR_LICENCIAS = "PEGA_AQUI_LA_URL_DE_TU_WEB_APP";

/**
 * Disparador onOpen: crea el menú de Licencia y valida integridad de copia
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("🔒 Licencia")
    .addItem("Activar Producto", "mostrarModalActivacion")
    .addItem("Verificar Estado", "verificarEstadoLicenciaManual")
    .addToUi();

  // Verificación silenciosa en segundo plano
  verificarSeguridadCopia();
}

/**
 * Detecta si el archivo es una COPIA CLONADA
 */
function verificarSeguridadCopia() {
  var props = PropertiesService.getDocumentProperties();
  var estado = props.getProperty("LICENSE_STATUS");
  var savedId = props.getProperty("SAVED_SPREADSHEET_ID");
  var currentId = SpreadsheetApp.getActiveSpreadsheet().getId();

  // Si no está activado, o si el ID del archivo no coincide con el guardado (fue copiado)
  if (estado !== "ACTIVE" || savedId !== currentId) {
    if (savedId && savedId !== currentId) {
      // Se detectó una copia: revalidamos con el servidor central
      var clave = props.getProperty("LICENSE_KEY");
      if (clave) {
        validarConServidor(clave, currentId, true);
        return;
      }
    }
    // Si no tiene licencia válida, oculta las hojas principales
    aplicarModoBloqueado();
  }
}

/**
 * Muestra el diálogo emergente para ingresar la clave
 */
function mostrarModalActivacion() {
  var html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_top">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #F8F6F2;
            color: #0D1B2A;
            margin: 0;
            padding: 24px;
          }
          .card {
            background: #FFFFFF;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(13, 27, 42, 0.08);
            border: 1px solid #E2DBD2;
          }
          .badge {
            display: inline-block;
            background: #0D1B2A;
            color: #FFFFFF;
            font-size: 10px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }
          h2 { margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #0D1B2A; }
          p { margin: 0 0 16px 0; font-size: 12px; color: #64748B; line-height: 1.5; }
          label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0D1B2A; display: block; margin-bottom: 6px; }
          input[type="text"] {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 2px;
            box-sizing: border-box;
            outline: none;
            text-transform: uppercase;
            color: #0D1B2A;
          }
          input[type="text"]:focus { border-color: #0D1B2A; }
          .btn {
            width: 100%;
            background: #0D1B2A;
            color: #FFFFFF;
            border: none;
            padding: 14px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 800;
            cursor: pointer;
            margin-top: 16px;
            transition: all 0.2s;
          }
          .btn:hover { background: #1E3A5F; }
          .btn:disabled { background: #94A3B8; cursor: not-allowed; }
          #msg { margin-top: 12px; font-size: 12px; text-align: center; font-weight: 600; display: none; }
          .err { color: #DC2626; }
          .suc { color: #16A34A; }
          .spinner {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
            margin-right: 6px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">Flor Martínez Signature</span>
          <h2>Activar Planilla Financiera</h2>
          <p>Ingresá la clave de licencia que recibiste al momento de tu compra comercial para desbloquear el sistema.</p>
          
          <label for="key">Clave de Licencia</label>
          <input type="text" id="key" placeholder="FM-XXXX-XXXX" autocomplete="off" />
          
          <button id="btnActivar" class="btn" onclick="activar()">Activar Producto</button>
          <div id="msg"></div>
        </div>

        <script>
          function activar() {
            var clave = document.getElementById('key').value.trim();
            var btn = document.getElementById('btnActivar');
            var msg = document.getElementById('msg');
            
            if (!clave) {
              msg.className = 'err';
              msg.style.display = 'block';
              msg.innerText = 'Por favor ingresá una clave de licencia.';
              return;
            }

            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span> Validando licencia...';
            msg.style.display = 'none';

            google.script.run
              .withSuccessHandler(function(res) {
                btn.disabled = false;
                btn.innerText = 'Activar Producto';
                msg.style.display = 'block';
                if (res.success) {
                  msg.className = 'suc';
                  msg.innerText = res.message;
                  setTimeout(function() {
                    google.script.host.close();
                  }, 2000);
                } else {
                  msg.className = 'err';
                  msg.innerText = res.message;
                }
              })
              .withFailureHandler(function(err) {
                btn.disabled = false;
                btn.innerText = 'Activar Producto';
                msg.className = 'err';
                msg.style.display = 'block';
                msg.innerText = 'Error de conexión: ' + err.message;
              })
              .procesarActivacionDesdeModal(clave);
          }
        </script>
      </body>
    </html>
  `)
  .setWidth(420)
  .setHeight(360);

  SpreadsheetApp.getUi().showModalDialog(html, "Activación de Licencia Comercial");
}

/**
 * Función backend llamada desde el diálogo modal
 */
function procesarActivacionDesdeModal(clave) {
  var currentId = SpreadsheetApp.getActiveSpreadsheet().getId();
  return validarConServidor(clave, currentId, false);
}

/**
 * Realiza la llamada HTTP al servidor Master de licencias
 */
function validarConServidor(clave, currentId, esVerificacionAutomatica) {
  if (URL_SERVIDOR_LICENCIAS === "PEGA_AQUI_LA_URL_DE_TU_WEB_APP") {
    return {
      success: false,
      message: "Falta configurar la URL_SERVIDOR_LICENCIAS en el código de Apps Script."
    };
  }

  try {
    var payload = {
      licenseKey: clave,
      spreadsheetId: currentId,
      userEmail: Session.getActiveUser().getEmail()
    };

    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(URL_SERVIDOR_LICENCIAS, options);
    var res = JSON.parse(response.getContentText());

    var props = PropertiesService.getDocumentProperties();

    if (res.success) {
      // Guardamos la activación en el documento
      props.setProperty("LICENSE_STATUS", "ACTIVE");
      props.setProperty("LICENSE_KEY", clave);
      props.setProperty("SAVED_SPREADSHEET_ID", currentId);
      props.setProperty("CLIENT_NAME", res.clientName || "Cliente Autorizado");

      // Desbloqueamos las hojas y estampamos marca de agua
      aplicarModoDesbloqueado(res.clientName);

      return {
        success: true,
        message: res.message || "¡Licencia activada con éxito!"
      };
    } else {
      // Falló la verificación (inválida o clonada)
      props.setProperty("LICENSE_STATUS", "LOCKED");
      aplicarModoBloqueado();

      if (esVerificacionAutomatica) {
        SpreadsheetApp.getUi().alert("⚠️ Aviso de Seguridad:\n\n" + res.message);
      }

      return {
        success: false,
        message: res.message || "No se pudo validar la licencia."
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "No se pudo conectar con el servidor de licencias: " + err.toString()
    };
  }
}

/**
 * Oculta las hojas operativas cuando el archivo no está activado
 */
function aplicarModoBloqueado() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaBloqueo = ss.getSheetByName("🔒 Activar Licencia");

  // Si no existe la hoja de bienvenida bloqueada, la creamos
  if (!hojaBloqueo) {
    hojaBloqueo = ss.insertSheet("🔒 Activar Licencia", 0);
    hojaBloqueo.setTabColor("#DC2626");
    hojaBloqueo.getRange("B3").setValue("🔒 PLANILLA FINANCIERA FLOR MARTÍNEZ");
    hojaBloqueo.getRange("B3").setFontSize(16).setFontWeight("bold").setFontColor("#0D1B2A");
    hojaBloqueo.getRange("B5").setValue("Esta copia requiere activación con su clave de licencia comercial.");
    hojaBloqueo.getRange("B7").setValue("👉 Para activar: Ve al menú superior '🔒 Licencia > Activar Producto'");
  }

  hojaBloqueo.showSheet();

  // Ocultamos las hojas de trabajo para que no puedan usarse
  var hojasOcultar = ["Dashboard", "Movimientos", "Metas", "Informe Detallado", "Gastos Hormiga"];
  hojasOcultar.forEach(function(nombre) {
    var sh = ss.getSheetByName(nombre);
    if (sh && sh.isSheetHidden() === false) {
      sh.hideSheet();
    }
  });

  // La hoja de configuración siempre permanece oculta
  var conf = ss.getSheetByName("Configuracion");
  if (conf && !conf.isSheetHidden()) conf.hideSheet();
}

/**
 * Restaura la visibilidad de todas las hojas operativas y estampa la marca de agua
 */
function aplicarModoDesbloqueado(nombreCliente) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojasMostrar = ["Dashboard", "Movimientos", "Metas", "Informe Detallado", "Gastos Hormiga"];

  hojasMostrar.forEach(function(nombre) {
    var sh = ss.getSheetByName(nombre);
    if (sh) {
      sh.showSheet();
    }
  });

  // Ocultamos la hoja de bloqueo si ya está todo activo
  var hojaBloqueo = ss.getSheetByName("🔒 Activar Licencia");
  if (hojaBloqueo) {
    hojaBloqueo.hideSheet();
  }

  // Ocultamos Configuración
  var conf = ss.getSheetByName("Configuracion");
  if (conf) conf.hideSheet();

  // Marca de agua en Dashboard (opcional pero muy disuasorio)
  var dash = ss.getSheetByName("Dashboard");
  if (dash && nombreCliente) {
    var titular = "Licencia Oficial Flor Martínez • Titular: " + nombreCliente;
    dash.getRange("B30").setValue(titular).setFontSize(8).setFontColor("#94A3B8");
  }
}

/**
 * Consulta manual desde el menú
 */
function verificarEstadoLicenciaManual() {
  var props = PropertiesService.getDocumentProperties();
  var estado = props.getProperty("LICENSE_STATUS");
  var cliente = props.getProperty("CLIENT_NAME") || "Sin registrar";
  var clave = props.getProperty("LICENSE_KEY") || "Ninguna";

  if (estado === "ACTIVE") {
    SpreadsheetApp.getUi().alert("✅ Estado: LICENCIA ACTIVA\n\nTitular: " + cliente + "\nClave: " + clave);
  } else {
    SpreadsheetApp.getUi().alert("⚠️ Estado: NO ACTIVADO\n\nPor favor ve a '🔒 Licencia > Activar Producto' para desbloquear tu plantilla.");
  }
}
