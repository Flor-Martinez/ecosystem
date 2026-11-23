import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Nombre y correo electrónico son requeridos.' },
        { status: 400 }
      );
    }

    const mpAccessToken = (
      process.env.MP_ACCESS_TOKEN ||
      process.env.MERCADOPAGO_ACCESS_TOKEN ||
      'APP_USR-4644281928495780-101119-14763e1cc4acdf248726e134b1da1279-151307739'
    ).trim();

    const origin = request.headers.get('origin') || 'https://academia.flormartinezok.com';
    const refCode = `EBL-${Date.now()}`;

    let unitPrice = 20000;
    try {
      const { getAdminPricingAction } = await import('@/actions/admin');
      const pricingRes = await getAdminPricingAction();
      if (pricingRes.success && pricingRes.pricing?.ebl?.promoPrice) {
        unitPrice = Number(pricingRes.pricing.ebl.promoPrice);
      }
    } catch {
      // fallback to 20000
    }

    if (mpAccessToken && (mpAccessToken.startsWith('APP_USR-') || mpAccessToken.startsWith('TEST-'))) {
      const preferenceData = {
        items: [
          {
            id: 'ebl-anual',
            title: 'Experiencia Búsqueda Laboral — Pase Anual Completo',
            description: 'Acceso a los 10 módulos (+35 clases en HD), plantillas ATS, Tracker de Postulaciones y Agenda por 1 año.',
            quantity: 1,
            unit_price: unitPrice,
            currency_id: 'ARS',
          },
        ],
        payer: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone ? { number: customerPhone.trim() } : undefined,
        },
        back_urls: {
          success: `${origin}/campus?pago=aprobado&ref=${refCode}`,
          failure: `${origin}/#planes-suscripcion?pago=fallido`,
          pending: `${origin}/campus?pago=pendiente&ref=${refCode}`,
        },
        auto_return: 'approved',
        external_reference: refCode,
        statement_descriptor: 'FLOR MARTINEZ ACADEMIA',
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
        });
      } else {
        const errText = await mpResponse.text();
        console.error('Mercado Pago API error:', errText);
      }
    }

    return NextResponse.json(
      { success: false, error: 'No se pudo generar la preferencia de pago de Mercado Pago.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Error en /api/checkout/mercadopago:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error inesperado al procesar el pago.' },
      { status: 500 }
    );
  }
}
