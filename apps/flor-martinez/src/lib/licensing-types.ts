export const SALT_SEGURIDAD = 'FLOR_MARTINEZ_2026_SECRET';

export const TEMPLATE_COPY_URL =
  'https://docs.google.com/spreadsheets/d/1-8MYVSviA07R0e2Q7XNjCobcVMqGIMEoIUQrUqMvvYM/copy';

export const ADMIN_EMAILS = [
  'santisose01@gmail.com',
  'licenciadaflormartinez@gmail.com',
];

export interface SpreadsheetLicenseRecord {
  id: string;
  licenseKey: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  channel: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  status: 'ACTIVA' | 'REVOCADA' | 'PRUEBA';
  spreadsheetId?: string | null;
  notes?: string | null;
  syncedToSheets: boolean;
  createdAt: string;
}

export function generarMensajeEntrega(customerName: string, licenseKey: string): string {
  const primerNombre = customerName.split(' ')[0] || 'Hola';
  return `¡Hola ${primerNombre}! Muchas gracias por tu compra. 🙌

Acá tenés el enlace oficial para abrir tu copia de la Planilla Financiera Flor Martínez:
👉 ${TEMPLATE_COPY_URL}

🔑 Tu Clave de Activación Oficial es:
${licenseKey}

📌 Instrucciones de activación:
1. Abrí el enlace desde una computadora (PC o Mac) en Google Chrome.
2. Hacé clic en el botón azul 'Crear una copia'.
3. Escribí tu clave en la celda blanca (C7) y presioná Enter.
4. Si arriba te aparece una barra amarilla de Google, hacé clic en 'Permitir acceso' para validar tu copia única.
5. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.

💻 Nota importante: Es muy conveniente usar la planilla en una computadora en lugar de un celular para visualizar cómodamente todos los tableros, gráficos y cálculos financieros.

Guardá este mensaje. ¡Cualquier duda que tengas estoy a disposición!`;
}
