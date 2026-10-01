import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GOOGLE_TEMPLATE_PREVIEW_URL =
  'https://docs.google.com/spreadsheets/d/1-8MYVSviA07R0e2Q7XNjCobcVMqGIMEoIUQrUqMvvYM/template/preview';

export async function GET() {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abrir Planilla - Flor Martínez</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px 16px;
      background-color: #F4F6F8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      color: #1E293B;
    }
    .card {
      background: #FFFFFF;
      padding: 32px 24px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      max-width: 440px;
      width: 100%;
      border: 1px solid #E2E8F0;
      text-align: center;
    }
    .brand {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #1C4D37;
      margin-bottom: 12px;
    }
    .icon { font-size: 44px; margin-bottom: 12px; line-height: 1; }
    h1 { margin: 0 0 10px 0; font-size: 22px; color: #0F172A; font-weight: 800; letter-spacing: -0.02em; }
    p { margin: 0 0 24px 0; font-size: 14.5px; color: #475569; line-height: 1.55; }
    .btn {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, #1C4D37, #133827);
      color: #FFFFFF;
      text-decoration: none;
      font-size: 16px;
      font-weight: 700;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(28,77,55,0.3);
      border: none;
      cursor: pointer;
    }
    .note {
      margin-top: 20px;
      font-size: 12.5px;
      color: #475569;
      background-color: #F1F5F9;
      padding: 14px;
      border-radius: 12px;
      line-height: 1.45;
      text-align: left;
      border: 1px solid #E2E8F0;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">FLOR MARTÍNEZ &bull; ECOSISTEMA DIGITAL</div>
    <div class="icon">📊</div>
    <h1>Planilla Finanzas en Orden</h1>
    <p>¡Tu copia personal está lista! Tocá el botón azul de abajo para abrirla en Google Sheets y presionar <strong>'Utilizar plantilla'</strong>.</p>
    
    <a href="${GOOGLE_TEMPLATE_PREVIEW_URL}" class="btn">
      📊 Abrir mi Planilla en Google Sheets &rarr;
    </a>

    <div class="note">
      💡 <strong>Instrucciones en celular:</strong><br>
      Al abrir el enlace, presiona el botón azul <strong>'Utilizar plantilla'</strong> que aparece arriba para guardar tu copia personal en tu cuenta de Google.
    </div>
  </div>

  <script>
    // Redirección automática suave a los 800ms
    setTimeout(function() {
      window.location.href = "${GOOGLE_TEMPLATE_PREVIEW_URL}";
    }, 800);
  </script>
</body>
</html>
  `.trim();

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
