export const SALT_SEGURIDAD = 'FLOR_MARTINEZ_2026_SECRET';

export const TEMPLATE_COPY_URL =
  'https://docs.google.com/spreadsheets/d/1-8MYVSviA07R0e2Q7XNjCobcVMqGIMEoIUQrUqMvvYM/copy';

export const ADMIN_EMAILS = [
  'santisose01@gmail.com',
  'licenciadaflormartinez@gmail.com',
  'lucianamartinez0696@gmail.com',
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
1. Abrí el enlace y hacé clic en el botón azul 'Crear una copia'.
2. Si arriba te aparece una barra amarilla de Google, hacé clic en 'Permitir acceso' para habilitar las funciones.
3. Escribí tu clave en la celda blanca (C7) y presioná Enter.
4. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.

💡 Recomendación: Te sugerimos utilizar la planilla desde una computadora para disfrutar de una visualización mucho más cómoda y completa de todos los tableros y gráficos.

Guardá este mensaje. ¡Cualquier duda que tengas estoy a disposición!`;
}
