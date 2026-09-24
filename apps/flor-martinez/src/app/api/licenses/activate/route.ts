import { NextRequest, NextResponse } from 'next/server';
import { activateLicenseOnDocument, unlinkLicenseDocument } from '@/lib/licensing';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const licenseKey = (body.licenseKey || body.key || body.clave || '').toString().trim();
    const spreadsheetId = (body.spreadsheetId || body.id || '').toString().trim();
    const reset = body.reset === true || body.action === 'reset';

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, code: 'MISSING_KEY', error: 'Falta la clave de licencia.' },
        { status: 400 }
      );
    }

    if (reset) {
      await unlinkLicenseDocument(licenseKey);
      return NextResponse.json({ success: true, message: 'Licencia desvinculada exitosamente.' });
    }

    if (!spreadsheetId) {
      return NextResponse.json(
        { success: false, code: 'MISSING_ID', error: 'Falta el ID del documento de Google Sheets.' },
        { status: 400 }
      );
    }

    const result = await activateLicenseOnDocument(licenseKey, spreadsheetId);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    console.error('Error en /api/licenses/activate POST:', err);
    return NextResponse.json(
      { success: false, code: 'SERVER_ERROR', error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const licenseKey = (searchParams.get('licenseKey') || searchParams.get('key') || searchParams.get('clave') || '').trim();
    const spreadsheetId = (searchParams.get('spreadsheetId') || searchParams.get('id') || '').trim();
    const reset = searchParams.get('reset') === 'true' || searchParams.get('action') === 'reset';
    const format = searchParams.get('format') || 'json';

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, code: 'MISSING_KEY', error: 'Falta la clave de licencia.' },
        { status: 400 }
      );
    }

    if (reset) {
      await unlinkLicenseDocument(licenseKey);
      return NextResponse.json({ success: true, message: 'Licencia desvinculada exitosamente.' });
    }

    if (!spreadsheetId) {
      return NextResponse.json(
        { success: false, code: 'MISSING_ID', error: 'Falta el ID del documento de Google Sheets.' },
        { status: 400 }
      );
    }

    const result = await activateLicenseOnDocument(licenseKey, spreadsheetId);

    if (format === 'csv' || format === 'text') {
      if (result.success) {
        return new Response(`OK,${result.code},${result.customerName || ''}`, {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      } else {
        return new Response(`ERROR,${result.code},${result.message}`, {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    }

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    console.error('Error en /api/licenses/activate GET:', err);
    return NextResponse.json(
      { success: false, code: 'SERVER_ERROR', error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
