import { NextRequest, NextResponse } from 'next/server';
import { validarClaveLicencia, getAllLicenses } from '@/lib/licensing';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawClave = searchParams.get('clave') || searchParams.get('key') || searchParams.get('licenseKey') || '';
    const clave = rawClave.trim().toUpperCase().replace(/[\s–—]/g, '');

    if (!clave) {
      return new Response('🔑 Ingresá tu clave en la celda C7', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Claves maestras
    if (clave === 'FM-ADMIN-MASTER' || clave === 'FM-DEV-MASTER') {
      return new Response('✅ LICENCIA VERIFICADA', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Validar formato criptográfico
    const esValidaAlgoritmo = validarClaveLicencia(clave);
    if (!esValidaAlgoritmo) {
      return new Response('❌ CLAVE INCORRECTA', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Verificar en la Base de Datos web
    const allLicenses = await getAllLicenses();
    const found = allLicenses.find((l) => l.licenseKey.trim().toUpperCase().replace(/[\s–—]/g, '') === clave);

    if (found) {
      if (found.status === 'REVOCADA') {
        return new Response('❌ LICENCIA REVOCADA', {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });
      }

      return new Response('✅ LICENCIA VERIFICADA', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Si cumple el algoritmo matemático (por si se generó fuera de la DB sincronizada)
    return new Response('✅ LICENCIA VERIFICADA', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Error en /api/validar-licencia:', err);
    return new Response('❌ ERROR EN SERVIDOR', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
