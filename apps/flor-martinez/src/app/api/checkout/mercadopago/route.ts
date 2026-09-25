import { NextResponse } from 'next/server';
import { getSolutionBySlug } from '@/data/solutions';
import { issueLicenseAction } from '@/actions/licenses';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { solutionSlug, customerName, customerEmail, customerWhatsapp } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Nombre y correo electrónico son requeridos.' },
        { status: 400 }
      );
    }

    const solution = getSolutionBySlug(solutionSlug || 'organizador-de-finanzas');
    if (!solution) {
      return NextResponse.json(
        { success: false, error: 'Solución no encontrada.' },
        { status: 404 }
      );
    }

    // 1. Emitir la clave de licencia comercial y registrar en DB/local
    const licenseResult = await issueLicenseAction({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerWhatsapp ? customerWhatsapp.trim() : null,
      channel: 'WEB',
      notes: `Compra web Mercado Pago — ${solution.title}`,
    });

    if (!licenseResult.success || !licenseResult.license) {
      return NextResponse.json(
        { success: false, error: licenseResult.error || 'Error al procesar la licencia.' },
        { status: 500 }
      );
    }

    const mpAccessToken = process.env.MP_ACCESS_TOKEN;
    const origin = request.headers.get('origin') || 'https://flor-martinez-ecosystem.vercel.app';

    // 2. Si las credenciales de Mercado Pago están presentes, crear la preferencia de pago oficial
    if (mpAccessToken && mpAccessToken.startsWith('APP_USR-')) {
      const preferenceData = {
        items: [
          {
            id: solution.id,
            title: solution.title,
            description: solution.shortDescription,
            quantity: 1,
            unit_price: Number(solution.priceARS),
            currency_id: 'ARS',
          },
        ],
        payer: {
          name: customerName,
          email: customerEmail,
          phone: customerWhatsapp ? { number: customerWhatsapp } : undefined,
        },
        back_urls: {
          success: `${origin}/soluciones/${solution.slug}?payment=success&key=${licenseResult.license.licenseKey}`,
          failure: `${origin}/soluciones/${solution.slug}?payment=failure`,
          pending: `${origin}/soluciones/${solution.slug}?payment=pending`,
        },
        auto_return: 'approved',
        external_reference: licenseResult.license.licenseKey,
        statement_descriptor: 'FLOR MARTINEZ',
      };

      const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mpAccessToken}`,
        },
        body: JSON.stringify(preferenceData),
      });

      if (mpResponse.ok) {
        const preference = await mpResponse.json();
        return NextResponse.json({
          success: true,
          initPoint: preference.init_point || preference.sandbox_init_point,
          preferenceId: preference.id,
          license: licenseResult.license,
          copyUrl: licenseResult.copyUrl,
          deliveryMessage: licenseResult.deliveryMessage,
        });
      } else {
        console.warn('Mercado Pago API returned non-OK status, falling back to instant mode.');
      }
    }

    // 3. Fallback en desarrollo/sin credenciales cargadas aún
    return NextResponse.json({
      success: true,
      initPoint: null,
      license: licenseResult.license,
      copyUrl: licenseResult.copyUrl,
      deliveryMessage: licenseResult.deliveryMessage,
    });
  } catch (error: any) {
    console.error('Error en /api/checkout/mercadopago:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error inesperado al procesar el pedido.' },
      { status: 500 }
    );
  }
}
