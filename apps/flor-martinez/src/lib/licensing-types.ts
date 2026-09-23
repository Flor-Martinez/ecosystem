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
  notes?: string | null;
  syncedToSheets: boolean;
  createdAt: string;
}
