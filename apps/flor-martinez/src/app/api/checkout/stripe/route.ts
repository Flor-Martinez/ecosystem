import { NextResponse } from 'next/server';
import { getSolutionBySlug } from '@/data/solutions';
import { issueLicenseAction } from '@/actions/licenses';
import { createCvOrderAction } from '@/actions/cvOrders';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { solutionSlug, customerName, customerEmail, customerWhatsapp, customerCvDetails, cvFileName, cvFileData } = body;

    if (!customerName || !customerEmail || !customerWhatsapp) {
      return NextResponse.json(
        { success: false, error: 'Nombre, correo electrónico y WhatsApp son requeridos.' },
        { status: 400 }
      );
    }

    const solution = getSolutionBySlug(solutionSlug || 'finanzas-en-orden');
    if (!solution) {
      return NextResponse.json(
        { success: false, error: 'Solución no encontrada.' },
        { status: 404 }
      );
    }

    const isCv = solution.slug === 'te-hago-tu-cv';
    let orderData: any = null;

    if (isCv) {
      const cvNotesText = customerCvDetails
        ? `Información de CV: ${customerCvDetails.trim()}`
        : `Compra web Stripe USD — ${solution.title}`;

      orderData = await createCvOrderAction({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerWhatsapp ? customerWhatsapp.trim() : null,
        cvFileName: cvFileName || null,
        cvFileData: cvFileData || null,
        channel: 'WEB',
        priceARS: solution.priceARS,
        status: 'PENDIENTE',
        notes: cvNotesText,
      });
    } else {
      orderData = await issueLicenseAction({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerWhatsapp ? customerWhatsapp.trim() : null,
        channel: 'WEB',
        notes: `Compra web Stripe USD — ${solution.title}`,
      });
    }

    if (!orderData.success) {
      return NextResponse.json(
        { success: false, error: orderData.error || 'Error al procesar el pedido.' },
        { status: 500 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const origin = request.headers.get('origin') || 'https://flor-martinez-ecosystem.vercel.app';

    const refCode = isCv ? orderData.order?.orderNumber : orderData.license?.licenseKey;

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
      params.append('success_url', `${origin}/${solution.slug}?payment=success&ref=${refCode}`);
      params.append('cancel_url', `${origin}/${solution.slug}?payment=cancelled`);
      params.append('client_reference_id', refCode || 'REF');

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
          license: isCv ? null : orderData.license,
          cvOrder: isCv ? orderData.order : null,
          copyUrl: isCv ? null : orderData.copyUrl,
        });
      } else {
        console.warn('Stripe API returned non-OK status, falling back to instant mode.');
      }
    }

    // 3. Fallback en desarrollo/sin credenciales cargadas aún
    return NextResponse.json({
      success: true,
      checkoutUrl: null,
      license: isCv ? null : orderData.license,
      cvOrder: isCv ? orderData.order : null,
      copyUrl: isCv ? null : orderData.copyUrl,
    });
  } catch (error: any) {
    console.error('Error en /api/checkout/stripe:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error inesperado al procesar el pedido.' },
      { status: 500 }
    );
  }
}
