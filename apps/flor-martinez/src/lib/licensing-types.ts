export const SALT_SEGURIDAD = 'FLOR_MARTINEZ_2026_SECRET';

export const TEMPLATE_COPY_URL =
  'https://flormartinezok.com/api/obtener-planilla';

export const ADMIN_EMAILS = [
  'santisose01@gmail.com',
  'licenciadaflormartinez@gmail.com',
  'lucianamartinez0696@gmail.com',
];

export const BANNED_EMAILS = [
  'santiagocastillo98@hotmail.com',
];

export interface SpreadsheetLicenseRecord {
  id: string;
  licenseKey: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  customerInstagram?: string | null;
  channel: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  status: 'ACTIVA' | 'REVOCADA' | 'PRUEBA';
  spreadsheetId?: string | null;
  notes?: string | null;
  syncedToSheets: boolean;
  createdAt: string;
}

export const EBOOK_PDF_URL =
  'https://flormartinezok.com/api/download/curso-practico';

export function generarMensajeEntrega(customerName: string, licenseKey: string): string {
  const primerNombre = customerName.split(' ')[0] || 'Hola';
  return `¡Hola ${primerNombre}! Muchas gracias por tu compra. 🙌

Acá tenés el enlace oficial para abrir tu copia de la Planilla Financiera Flor Martínez:
👉 ${TEMPLATE_COPY_URL}

🔑 Tu Clave de Activación Oficial es:
${licenseKey}

📌 Instrucciones de activación:
💻 Recomendación para la primera vez: Te aconsejamos abrir y activar la plantilla por primera vez desde tu computadora para vincular tu licencia en 1 solo clic. Una vez vinculada, podrás usarla sin problemas tanto desde tu computadora como desde tu celular.

1. Abrí el enlace y presioná el botón azul 'Utilizar plantilla' (o los 3 puntitos arriba ⋮ ➔ 'Crear una copia').
2. Escribí tu clave en la celda C7 y presioná Enter.
3. Si te aparece una barra amarilla arriba, hacé clic en 'Permitir acceso'.
4. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.

📚 Descargá tu E-Book & Curso Práctico en PDF acá:
👉 ${EBOOK_PDF_URL}

Guardá este mensaje. ¡Cualquier duda que tengas estoy a disposición!`;
}
