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

    // 1. Emitir clave de licencia comercial y registrar pedido
    const licenseResult = await issueLicenseAction({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerWhatsapp ? customerWhatsapp.trim() : null,
      channel: 'WEB',
      notes: `Compra web Stripe USD — ${solution.title}`,
    });

    if (!licenseResult.success || !licenseResult.license) {
      return NextResponse.json(
        { success: false, error: licenseResult.error || 'Error al procesar la licencia.' },
        { status: 500 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const origin = request.headers.get('origin') || 'https://flor-martinez-ecosystem.vercel.app';

    // 2. Si las credenciales de Stripe están configuradas, crear la Checkout Session oficial
    if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
      const params = new URLSearchParams();
      params.append('payment_method_types[0]', 'card');
      params.append('line_items[0][price_data][currency]', 'usd');
      params.append('line_items[0][price_data][product_data][name]', solution.title);
      params.append('line_items[0][price_data][product_data][description]', solution.shortDescription);
      params.append('line_items[0][price_data][unit_amount]', String(Math.round(solution.priceUSD * 100)));
      params.append('line_items[0][quantity]', '1');
      params.append('mode', 'payment');
      params.append('customer_email', customerEmail);
      params.append('success_url', `${origin}/soluciones/${solution.slug}?payment=success&key=${licenseResult.license.licenseKey}`);
      params.append('cancel_url', `${origin}/soluciones/${solution.slug}?payment=cancelled`);
      params.append('client_reference_id', licenseResult.license.licenseKey);

      const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${stripeSecretKey}`,
        },
        body: params.toString(),
      });

      if (stripeResponse.ok) {
        const session = await stripeResponse.json();
        return NextResponse.json({
          success: true,
          checkoutUrl: session.url,
          sessionId: session.id,
          license: licenseResult.license,
          copyUrl: licenseResult.copyUrl,
          deliveryMessage: licenseResult.deliveryMessage,
        });
      } else {
        console.warn('Stripe API returned non-OK status, falling back to instant mode.');
      }
    }

    // 3. Fallback en desarrollo/sin credenciales cargadas aún
    return NextResponse.json({
      success: true,
      checkoutUrl: null,
      license: licenseResult.license,
      copyUrl: licenseResult.copyUrl,
      deliveryMessage: licenseResult.deliveryMessage,
    });
  } catch (error: any) {
    console.error('Error en /api/checkout/stripe:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error inesperado al procesar el pedido.' },
      { status: 500 }
    );
  }
}
