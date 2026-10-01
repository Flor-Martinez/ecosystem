import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GOOGLE_TEMPLATE_PREVIEW_URL =
  'https://docs.google.com/spreadsheets/d/1-8MYVSviA07R0e2Q7XNjCobcVMqGIMEoIUQrUqMvvYM/template/preview';

export async function GET() {
  return NextResponse.redirect(GOOGLE_TEMPLATE_PREVIEW_URL, 307);
}
