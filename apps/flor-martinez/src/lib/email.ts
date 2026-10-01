import fs from 'node:fs';
import path from 'node:path';
import { TEMPLATE_COPY_URL, EBOOK_PDF_URL } from './licensing-types';

interface SpreadsheetDeliveryEmailParams {
  to: string;
  customerName: string;
  licenseKey: string;
}

interface CvOrderConfirmationEmailParams {
  to: string;
  customerName: string;
  orderNumber: string;
  customerWhatsapp?: string | null;
}

/**
 * Lee el archivo PDF del curso práctico si existe para adjuntarlo en base64
 */
function getEbookPdfBase64(): string | null {
  try {
    const candidatePaths = [
      path.join(process.cwd(), 'public', 'docs', 'Finanzas_en_Orden_Curso_Practico.pdf'),
      path.join(process.cwd(), 'apps', 'flor-martinez', 'public', 'docs', 'Finanzas_en_Orden_Curso_Practico.pdf'),
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
        const buffer = fs.readFileSync(/*turbopackIgnore: true*/ p);
        return buffer.toString('base64');
      }
    }
  } catch (err) {
    console.warn('No se pudo leer el archivo PDF local para adjuntar:', err);
  }
  return null;
}

/**
 * Genera el HTML enriquecido del correo para la entrega de la Planilla Finanzas en Orden
 */
export function generateSpreadsheetEmailHtml(params: {
  customerName: string;
  licenseKey: string;
}): { html: string; text: string } {
  const firstName = params.customerName.split(' ')[0] || 'Hola';
  const copyUrl = TEMPLATE_COPY_URL;
  const pdfUrl = EBOOK_PDF_URL;

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Planilla Finanzas en Orden + E-Book y Curso Práctico</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F6F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F4F6F8;padding:24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;box-shadow:0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#1C4D37,#133827);padding:36px 32px;text-align:center;">
              <div style="font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#FDE68A;margin-bottom:8px;">
                FLOR MARTÍNEZ &bull; ECOSISTEMA DIGITAL
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.2;">
                ¡Tu Planilla y Curso Práctico están listos! 📊📚
              </h1>
              <p style="margin:10px 0 0 0;font-size:14px;color:#C2E0D1;line-height:1.5;">
                Finanzas en Orden &bull; Herramienta interactiva y E-Book oficial
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:32px 28px;">
              <p style="margin:0 0 16px 0;font-size:16px;color:#1E293B;line-height:1.6;">
                ¡Hola <strong>${firstName}</strong>! 🙌
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;color:#475569;line-height:1.6;">
                Muchísimas gracias por tu compra. Ya tenés todo a tu disposición para tomar el control absoluto de tus números, proyectar tus metas y organizar tu economía personal sin complicaciones.
              </p>

              <!-- License Key Callout Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F0FDF4;border:2px solid #86EFAC;border-radius:14px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <div style="font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#166534;margin-bottom:6px;">
                      🔑 Tu Clave de Activación Oficial (Uso de por vida)
                    </div>
                    <div style="font-family:'Courier New',Courier,monospace;font-size:24px;font-weight:800;color:#14532D;letter-spacing:0.08em;background-color:#FFFFFF;padding:10px 18px;border-radius:8px;display:inline-block;border:1px dashed #86EFAC;margin:6px 0;">
                      ${params.licenseKey}
                    </div>
                    <div style="font-size:12px;color:#15803D;margin-top:6px;">
                      Guardá esta clave. La vas a ingresar en la celda <strong>C7</strong> de tu planilla.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Main Action: Google Sheets Link -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${copyUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#276749,#1C4D37);color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;box-shadow:0 6px 18px rgba(39,103,73,0.3);text-align:center;">
                      📊 Abrir y Copiar mi Planilla en Google Sheets &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Practical Course E-Book Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FAF7F2;border:1px solid #E2E8F0;border-radius:14px;margin-bottom:28px;">
                <tr>
                  <td style="padding:22px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="top" style="width:40px;padding-right:12px;">
                          <div style="font-size:28px;line-height:1;">📚</div>
                        </td>
                        <td valign="top">
                          <h3 style="margin:0 0 6px 0;font-size:16px;font-weight:750;color:#0F172A;">
                            E-Book & Curso Práctico Completo (PDF)
                          </h3>
                          <p style="margin:0 0 14px 0;font-size:13.5px;color:#475569;line-height:1.55;">
                            El libro digital redactado por Florencia Martínez con las 12 claves esenciales para ordenar tus gastos, liquidar deudas, detectar gastos hormiga y crear fondos de emergencia.
                          </p>
                          <a href="${pdfUrl}" target="_blank" style="display:inline-block;background-color:#0D1B2A;color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;padding:10px 20px;border-radius:8px;">
                            ⬇️ Descargar E-Book en PDF &rarr;
                          </a>
                          <div style="font-size:11.5px;color:#64748B;margin-top:8px;font-style:italic;">
                            * También te adjuntamos el archivo PDF directamente a este correo para que lo tengas siempre guardado.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Step-by-Step Instructions -->
              <div style="margin-bottom:28px;">
                <h3 style="margin:0 0 14px 0;font-size:15px;font-weight:750;color:#0F172A;text-transform:uppercase;letter-spacing:0.04em;">
                  📌 Paso a paso para activar tu planilla:
                </h3>
                <ol style="margin:0;padding-left:20px;font-size:14px;color:#334155;line-height:1.7;">
                  <li style="margin-bottom:8px;">
                    Hacé clic en el botón superior <strong>'Abrir y Copiar mi Planilla'</strong> y presioná el botón azul <strong>'Crear una copia'</strong> en Google Sheets.
                  </li>
                  <li style="margin-bottom:8px;">
                    Si te aparece una barra amarilla arriba, hacé clic en <strong>'Permitir acceso'</strong> para que las fórmulas automatizadas funcionen.
                  </li>
                  <li style="margin-bottom:8px;">
                    En la pestaña <em>Dashboard / Activación</em>, escribí tu clave <strong style="font-family:monospace;background:#F1F5F9;padding:2px 6px;border-radius:4px;">${params.licenseKey}</strong> en la celda <strong>C7</strong> y presioná <strong>Enter</strong>.
                  </li>
                  <li>
                    ¡Listo! Las 5 pestañas quedarán activadas y desbloqueadas de por vida.
                  </li>
                </ol>
              </div>

              <!-- PC Recommendation Notice -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FEF3C7;border:1px solid #FDE68A;border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <div style="font-size:13px;font-weight:600;color:#92400E;line-height:1.5;">
                      💡 <strong>Recomendación:</strong> Te sugerimos utilizar la planilla desde una computadora (PC o Mac) para disfrutar de una visualización mucho más cómoda y completa de todos los tableros y gráficos interactivos.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Support Section -->
              <div style="border-top:1px solid #E2E8F0;padding-top:20px;font-size:13.5px;color:#64748B;line-height:1.6;">
                <p style="margin:0 0 8px 0;">
                  ¿Tenés alguna duda o necesitás asistencia con tu clave? Podés responder directamente a este correo o escribirnos a nuestro WhatsApp Business oficial.
                </p>
                <p style="margin:12px 0 0 0;font-weight:700;color:#0F172A;">
                  Florencia Martínez<br>
                  <span style="font-weight:400;color:#64748B;">Lic. Florencia Martínez &bull; <a href="https://flormartinezok.com" target="_blank" style="color:#276749;text-decoration:none;">flormartinezok.com</a></span>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;padding:20px 28px;text-align:center;border-top:1px solid #E2E8F0;font-size:11.5px;color:#94A3B8;line-height:1.5;">
              Recibiste este correo porque realizaste una compra en Florencia Martínez Ecosistema Digital.<br>
              &copy; ${new Date().getFullYear()} Flor Martínez. Todos los derechos reservados.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
¡Hola ${firstName}! Muchas gracias por tu compra. 🙌

Acá tenés el enlace oficial para abrir tu copia de la Planilla Financiera Flor Martínez:
👉 ${copyUrl}

📚 Descargá tu E-Book & Curso Práctico en PDF acá:
👉 ${pdfUrl}

🔑 Tu Clave de Activación Oficial (Uso de por vida) es:
${params.licenseKey}

📌 Instrucciones de activación:
1. Abrí el enlace de la planilla y hacé clic en el botón azul 'Crear una copia'.
2. Si arriba te aparece una barra amarilla de Google, hacé clic en 'Permitir acceso' para habilitar las funciones.
3. Escribí tu clave en la celda C7 de la solapa Dashboard/Activación y presioná Enter.
4. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.

💡 Recomendación: Te sugerimos utilizar la planilla desde una computadora para disfrutar de una visualización mucho más cómoda y completa de todos los tableros y gráficos.

Guardá este correo. ¡Cualquier duda que tengas estoy a tu entera disposición!

Florencia Martínez
flormartinezok.com
  `.trim();

  return { html, text };
}

/**
 * Envía el correo de entrega de la Planilla + Curso Práctico
 */
export async function sendSpreadsheetDeliveryEmail(params: SpreadsheetDeliveryEmailParams): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
  simulated?: boolean;
}> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const fromEmail = (process.env.EMAIL_FROM || 'Flor Martínez <onboarding@resend.dev>').trim();
  const { html, text } = generateSpreadsheetEmailHtml(params);

  // 1. Si no hay API Key de Resend configurada aún, registrar simulación sin fallar la compra
  if (!apiKey) {
    console.log(`[EMAIL SIMULADO] Enviar a: ${params.to}`);
    console.log(`[EMAIL SIMULADO] Asunto: ¡Tu Planilla Finanzas en Orden + E-Book y Curso Práctico están listos! 📊📚`);
    console.log(`[EMAIL SIMULADO] Clave: ${params.licenseKey}`);
    return {
      success: true,
      simulated: true,
      messageId: `sim_${Date.now()}`,
    };
  }

  // 2. Preparar el adjunto PDF del E-Book si está disponible
  const pdfBase64 = getEbookPdfBase64();
  const attachments: Array<{ filename: string; content: string }> = [];

  if (pdfBase64) {
    attachments.push({
      filename: 'Finanzas_en_Orden_Curso_Practico.pdf',
      content: pdfBase64,
    });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [params.to],
        subject: '¡Tu Planilla Finanzas en Orden + E-Book y Curso Práctico están listos! 📊📚',
        html,
        text,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error('[Resend Error]', errData);
      return {
        success: false,
        error: errData?.message || `HTTP ${res.status} al enviar correo con Resend`,
      };
    }

    const data = await res.json();
    console.log('[Email Enviado]', data);
    return {
      success: true,
      messageId: data.id,
    };
  } catch (err: any) {
    console.error('Error al conectar con el servicio de correo:', err);
    return {
      success: false,
      error: err?.message || 'Error de conexión al enviar correo',
    };
  }
}

/**
 * Envía el correo de confirmación de pedido de CV
 */
export async function sendCvOrderConfirmationEmail(params: CvOrderConfirmationEmailParams): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
  simulated?: boolean;
}> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const fromEmail = (process.env.EMAIL_FROM || 'Flor Martínez <onboarding@resend.dev>').trim();
  const firstName = params.customerName.split(' ')[0] || 'Hola';

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>¡Recibimos tu pedido de CV!</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F6F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
          <tr>
            <td style="background:linear-gradient(135deg,#8C2D38,#6B1D25);padding:32px;text-align:center;">
              <h1 style="margin:0;font-size:24px;color:#FFFFFF;">¡Recibimos tu Pedido de CV! 📄✨</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="font-size:16px;">¡Hola <strong>${firstName}</strong>! 🙌</p>
              <p style="font-size:14px;color:#475569;line-height:1.6;">
                Tu orden <strong>${params.orderNumber}</strong> ha sido ingresada en nuestro sistema. Recibimos correctamente tu información.
              </p>
              <div style="background-color:#FAF0F2;border:1px solid #E8C4C8;border-radius:12px;padding:16px;margin:20px 0;">
                <strong style="color:#6B1D25;display:block;margin-bottom:6px;">📱 Coordinación por WhatsApp Business:</strong>
                <span style="font-size:13.5px;color:#4A1218;line-height:1.5;">
                  Nos comunicaremos a tu número ${params.customerWhatsapp ? `<strong>${params.customerWhatsapp}</strong>` : 'registrado'} para coordinar la entrega de tu nuevo CV en formato PDF de alto impacto en 48 a 72hs hábiles.
                </span>
              </div>
              <p style="font-size:13px;color:#64748B;">¡Muchas gracias por confiar en Florencia Martínez!</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  if (!apiKey) {
    return { success: true, simulated: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [params.to],
        subject: `¡Recibimos tu pedido de CV (${params.orderNumber})! 📄✨`,
        html,
      }),
    });

    const data = await res.json().catch(() => ({}));
    return { success: res.ok, messageId: data?.id };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}
