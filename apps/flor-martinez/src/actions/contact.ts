'use server';

import { db, LeadOrigin, LeadStatus } from '@repo/db';

export interface ContactFormState {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim() || null;
  const company = formData.get('company')?.toString().trim() || null;
  const serviceInterest = formData.get('serviceInterest')?.toString().trim() || 'Consulta General';
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return {
      success: false,
      error: 'Por favor, completá todos los campos obligatorios (Nombre, Email y Mensaje).',
    };
  }

  try {
    // 1. Guardar consulta general
    await db.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        subject: serviceInterest,
        message,
        origin: LeadOrigin.PORTFOLIO,
      },
    });

    // 2. Crear o actualizar Lead en el CRM B2B de Flor Martinez
    await db.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        serviceInterest,
        message,
        origin: LeadOrigin.PORTFOLIO,
        status: LeadStatus.NUEVO,
      },
    });

    return {
      success: true,
      message: '¡Gracias por contactarte con Flor Martinez! Tu mensaje fue recibido y te responderemos a la brevedad.',
    };
  } catch (error) {
    console.error('Error al guardar contacto:', error);
    return {
      success: false,
      error: 'Ocurrió un error al enviar tu consulta. Por favor, intentá nuevamente o escribinos por WhatsApp.',
    };
  }
}
