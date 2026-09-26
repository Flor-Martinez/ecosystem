import { NextResponse } from 'next/server';
import { getSolutionBySlug } from '@/data/solutions';
import { issueLicenseAction } from '@/actions/licenses';
import { createCvOrderAction } from '@/actions/cvOrders';

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

    const isCv = solution.slug === 'te-hago-tu-cv';

    let orderData: any = null;

    if (isCv) {
      const cvResult = await createCvOrderAction({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerWhatsapp ? customerWhatsapp.trim() : null,
        channel: 'WEB',
        priceARS: solution.priceARS,
        status: 'PENDIENTE',
        notes: `Compra web Mercado Pago — ${solution.title}`,
      });
      orderData = cvResult;
    } else {
      const licenseResult = await issueLicenseAction({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerWhatsapp ? customerWhatsapp.trim() : null,
        channel: 'WEB',
        notes: `Compra web Mercado Pago — ${solution.title}`,
      });
      orderData = licenseResult;
    }

    if (!orderData || !orderData.success) {
      return NextResponse.json(
        { success: false, error: orderData?.error || 'Error al procesar el pedido.' },
        { status: 500 }
      );
    }

    const mpAccessToken = process.env.MP_ACCESS_TOKEN;
    const origin = request.headers.get('origin') || 'https://flor-martinez-ecosystem.vercel.app';
    const refCode = isCv ? orderData.order?.orderNumber : orderData.license?.licenseKey;

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
          success: `${origin}/soluciones/${solution.slug}?payment=success&ref=${refCode}`,
          failure: `${origin}/soluciones/${solution.slug}?payment=failure`,
          pending: `${origin}/soluciones/${solution.slug}?payment=pending`,
        },
        auto_return: 'approved',
        external_reference: refCode,
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
          license: isCv ? null : orderData.license,
          cvOrder: isCv ? orderData.order : null,
          copyUrl: isCv ? null : orderData.copyUrl,
        });
      }
    }

    // 3. Fallback en desarrollo/sin credenciales cargadas aún
    return NextResponse.json({
      success: true,
      initPoint: null,
      license: isCv ? null : orderData.license,
      cvOrder: isCv ? orderData.order : null,
      copyUrl: isCv ? null : orderData.copyUrl,
    });
  } catch (error: any) {
    console.error('Error en /api/checkout/mercadopago:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error inesperado al procesar el pedido.' },
      { status: 500 }
    );
  }
}
