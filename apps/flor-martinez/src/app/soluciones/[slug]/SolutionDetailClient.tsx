'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Star,
  ShieldCheck,
  PlayCircle,
  ShoppingBag,
  Briefcase,
  ChevronDown,
  CreditCard,
  Globe,
  Sparkles,
  Lock,
  Check,
  Zap,
  ExternalLink,
  Download,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SolutionItem } from '@/data/solutions';
import { issueLicenseAction } from '@/actions/licenses';
import { useAuth } from '@/context/AuthContext';
import SolutionReviewsSection from '@/components/solutions/SolutionReviewsSection';
import styles from './SolutionDetail.module.css';

interface SolutionDetailClientProps {
  solution: SolutionItem;
}

export default function SolutionDetailClient({ solution }: SolutionDetailClientProps) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentCurrency, setPaymentCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    cvDetails: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [issuedLicense, setIssuedLicense] = useState<{
    licenseKey: string;
    copyUrl: string;
  } | null>(null);
  const [createdCvOrder, setCreatedCvOrder] = useState<{
    orderNumber: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const isProduct = solution.type === 'producto';
  const isExcel = solution.slug === 'organizador-de-finanzas' || solution.slug === 'finanzas-en-orden';
  const isCv = solution.slug === 'te-hago-tu-cv';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const payment = params.get('payment');
      const ref = params.get('ref') || params.get('key');
      if (payment === 'success') {
        setIsModalOpen(true);
        setIsSuccess(true);
        if (isExcel && ref) {
          setIssuedLicense({
            licenseKey: ref,
            copyUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy',
          });
        }
      }
    }
  }, [isExcel]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setIssuedLicense(null);
    setCreatedCvOrder(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setErrorMessage('Nombre, correo electrónico y WhatsApp son requeridos.');
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint =
        paymentCurrency === 'ARS'
          ? '/api/checkout/mercadopago'
          : '/api/checkout/stripe';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solutionSlug: solution.slug,
          customerName: formData.name,
          customerEmail: formData.email,
          customerWhatsapp: formData.whatsapp,
          customerCvDetails: formData.cvDetails,
          currency: paymentCurrency,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.error || 'Ocurrió un error al procesar la orden.');
        setIsSubmitting(false);
        return;
      }

      const redirectUrl = data.initPoint || data.checkoutUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      if (isCv) {
        if (data.cvOrder) {
          setCreatedCvOrder(data.cvOrder);
        }
        setIssuedLicense(null);
        setIsSuccess(true);
      } else {
        if (data.license) {
          setIssuedLicense({
            licenseKey: data.license.licenseKey,
            copyUrl: data.copyUrl,
          });
        }
        setIsSuccess(true);
      }
    } catch (err) {
      console.error('Error al procesar pedido:', err);
      setErrorMessage('Ocurrió un error de conexión al procesar el pago.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* Top Back Nav Bar */}
      <div className={styles.backNavSection}>
        <Container size="wide">
          <Link href="/soluciones" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Volver al Catálogo de Soluciones</span>
          </Link>
        </Container>
      </div>

      <Container size="wide">
        <div className={styles.detailGrid}>
          {/* LEFT COLUMN: Main Solution Specs */}
          <div className={styles.contentColumn}>
            {/* Header Block */}
            <div className={styles.headerBlock}>
              <div className={styles.metaHeaderRow}>
                <span
                  className={`${styles.typeBadge} ${
                    isExcel ? styles.badgeExcel : styles.badgeCv
                  }`}
                >
                  {isProduct ? <ShoppingBag size={13} /> : <Briefcase size={13} />}
                  <span>{solution.badgeText}</span>
                </span>

                <span className={styles.categoryLabel}>{solution.category}</span>
              </div>

              <h1 className={styles.detailTitle}>{solution.title}</h1>
              <p className={styles.detailTagline}>{solution.tagline}</p>
            </div>

            {/* Video Explainer Section */}
            {solution.videoUrl && (
              <div className={styles.videoContainerCard}>
                <div className={styles.videoHeader}>
                  <PlayCircle size={20} className={styles.videoIcon} />
                  <h3 className={styles.videoTitle}>
                    {solution.videoTitle || 'Video Explicativo & Demostración'}
                  </h3>
                </div>

                <div className={styles.responsiveVideoWrapper}>
                  <iframe
                    src={solution.videoUrl}
                    title={solution.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className={styles.videoCaption}>
                  Descubrí en este breve video de 2 minutos exactamente cómo funciona y cómo va a ayudarte.
                </p>
              </div>
            )}

            {/* Detailed Description */}
            <div className={styles.descriptionSection}>
              <h3 className={styles.sectionHeading}>
                <Sparkles size={20} className={styles.sectionHeadingIcon} />
                <span>Sobre esta solución</span>
              </h3>
              <p className={styles.fullDescriptionText}>{solution.fullDescription}</p>
            </div>

            {/* Deliverables List */}
            <div className={styles.deliverablesSection}>
              <h3 className={styles.sectionHeading}>
                <CheckCircle2 size={20} className={styles.sectionHeadingIcon} />
                <span>Qué vas a recibir exactamente</span>
              </h3>

              <div className={styles.deliverablesList}>
                {solution.deliverables.map((item, index) => (
                  <div key={index} className={styles.deliverableCard}>
                    <CheckCircle2 size={18} className={`${styles.deliverableCheckIcon} ${isExcel ? styles.checkExcel : styles.checkCv}`} />
                    <div className={styles.deliverableContent}>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className={styles.processSection}>
              <h3 className={styles.sectionHeading}>
                <Zap size={20} className={styles.sectionHeadingIcon} />
                <span>Cómo es el proceso de entrega</span>
              </h3>

              <div className={styles.processList}>
                {solution.processSteps.map((step) => (
                  <div key={step.stepNumber} className={styles.processStepCard}>
                    <div className={`${styles.stepNumberCircle} ${isExcel ? styles.stepExcel : styles.stepCv}`}>{step.stepNumber}</div>
                    <div className={styles.stepContent}>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {solution.faq && solution.faq.length > 0 && (
              <div className={styles.faqSection}>
                <h3 className={styles.sectionHeading}>
                  <span>Preguntas Frecuentes</span>
                </h3>

                <div className={styles.faqList}>
                  {solution.faq.map((item, index) => (
                    <details key={index} className={styles.faqItem}>
                      <summary className={styles.faqQuestionSummary}>
                        <span>{item.question}</span>
                        <ChevronDown size={18} className={styles.faqChevron} />
                      </summary>
                      <div className={styles.faqAnswerBody}>
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews Section */}
            <SolutionReviewsSection solutionSlug={solution.slug} initialUser={user} />
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar & Buy CTA */}
          <div className={styles.sidebarColumn}>
            <div className={`${styles.stickySidebarCard} ${isExcel ? styles.sidebarCardExcel : styles.sidebarCardCv}`}>
              <div className={styles.sidebarPriceBlock}>
                {solution.originalPriceARS && (
                  <div className={styles.originalPriceLine}>
                    ${solution.originalPriceARS.toLocaleString('es-AR')} ARS
                  </div>
                )}

                <div className={`${styles.mainPriceARS} ${isExcel ? styles.priceExcel : styles.priceCv}`}>
                  ${solution.priceARS.toLocaleString('es-AR')}{' '}
                  <span className={styles.currencySuffix}>ARS</span>
                </div>

                <div className={styles.subPriceUSD}>
                  o USD ${solution.priceUSD} (Pago internacional)
                </div>
              </div>

              <div className={styles.deliveryBadgePill}>
                <Clock size={16} />
                <span>{solution.deliveryTime}</span>
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                className={`${styles.buyNowCtaBtn} ${isExcel ? styles.btnExcel : styles.btnCv}`}
              >
                <span>Adquirir Ahora</span>
                <Sparkles size={18} />
              </button>

              <div className={styles.guaranteesList}>
                <div className={styles.guaranteeItem}>
                  <ShieldCheck size={16} className={styles.guaranteeIcon} />
                  <span>Pago 100% encriptado y seguro</span>
                </div>

                <div className={styles.guaranteeItem}>
                  <CheckCircle2 size={16} className={styles.guaranteeIcon} />
                  <span>{isProduct ? 'Licencia de uso de por vida' : 'Contacto directo 1 a 1'}</span>
                </div>
              </div>

              <div className={styles.paymentBadgesRow}>
                <span>Mercado Pago</span> • <span>Tarjetas</span> • <span>PayPal / Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CHECKOUT MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()} // Prevent click-through closing
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={handleCloseModal}
              title="Cerrar modal"
            >
              ✕
            </button>

            {!isSuccess ? (
              <>
                <h3 className={styles.modalTitle}>Confirmar y Adquirir</h3>
                <p className={styles.modalSubtitle}>
                  Ingresá tus datos para procesar tu pedido de forma segura.
                </p>

                {/* Order Summary */}
                <div className={styles.orderSummaryBox}>
                  <div className={styles.summaryHeader}>Resumen de la orden</div>
                  <div className={styles.summaryItemTitle}>{solution.title}</div>
                  <div className={styles.summaryPriceRow}>
                    <span>Monto a abonar:</span>
                    <strong>
                      {paymentCurrency === 'ARS'
                        ? `$${solution.priceARS.toLocaleString('es-AR')} ARS`
                        : `USD $${solution.priceUSD}`}
                    </strong>
                  </div>
                </div>

                {/* Payment Currency Selection */}
                <div className={styles.paymentTabs}>
                  <button
                    type="button"
                    className={`${styles.paymentTabBtn} ${
                      paymentCurrency === 'ARS' ? styles.paymentTabActive : ''
                    }`}
                    onClick={() => setPaymentCurrency('ARS')}
                  >
                    <CreditCard size={18} />
                    <span className={styles.tabTitle}>Pesos Argentinos</span>
                    <span className={styles.tabSub}>Mercado Pago / Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.paymentTabBtn} ${
                      paymentCurrency === 'USD' ? styles.paymentTabActive : ''
                    }`}
                    onClick={() => setPaymentCurrency('USD')}
                  >
                    <Globe size={18} />
                    <span className={styles.tabTitle}>USD Internacional</span>
                    <span className={styles.tabSub}>PayPal / Stripe</span>
                  </button>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmitOrder} className={styles.checkoutForm}>
                  {user && (
                    <div style={{
                      padding: '0.6rem 0.85rem',
                      backgroundColor: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      color: '#065F46',
                      fontWeight: 600,
                      marginBottom: '0.5rem'
                    }}>
                      ✓ Sesión activa como <strong>{user.name}</strong> ({user.email}). Datos completados automáticamente.
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <label htmlFor="customerName">Nombre Completo *</label>
                    <input
                      id="customerName"
                      type="text"
                      required
                      placeholder="Ej. Sofia Gomez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="customerEmail">Correo Electrónico (para recibir la entrega) *</label>
                    <input
                      id="customerEmail"
                      type="email"
                      required
                      placeholder="sofia@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="customerWhatsapp">WhatsApp (Obligatorio para la entrega) *</label>
                    <input
                      id="customerWhatsapp"
                      type="tel"
                      required
                      placeholder="+54 9 11 1234-5678"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  {isCv && (
                    <div className={styles.formGroup}>
                      <label htmlFor="customerCvDetails">
                        Información para tu CV (Estudios, experiencia o qué querés mejorar) *
                      </label>
                      <textarea
                        id="customerCvDetails"
                        rows={3}
                        required
                        placeholder="Pegá el texto de tu CV actual o detallá tu experiencia laboral, estudios y el puesto al que aspirás postularte..."
                        value={formData.cvDetails}
                        onChange={(e) => setFormData({ ...formData, cvDetails: e.target.value })}
                        className={styles.formInput}
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </div>
                  )}

                  {errorMessage && (
                    <div className={styles.errorAlertBox}>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitOrderBtn}
                  >
                    <Lock size={16} />
                    <span>
                      {isSubmitting
                        ? 'Procesando pedido...'
                        : paymentCurrency === 'ARS'
                        ? `Pagar $${solution.priceARS.toLocaleString('es-AR')} ARS con Mercado Pago`
                        : `Pagar USD $${solution.priceUSD} con Stripe`}
                    </span>
                  </button>
                </form>
              </>
            ) : isCv ? (
              /* CV Order Success View */
              <div className={styles.successModalBox}>
                <div className={styles.successIconWrapper} style={{ backgroundColor: '#FAF0F2', color: '#6B1D25' }}>
                  <Check size={32} />
                </div>
                <h3 className={styles.successTitle}>¡Pedido de CV Registrado!</h3>
                <p className={styles.successText}>
                  ¡Muchas gracias <strong>{formData.name || 'por tu compra'}</strong>! Tu pedido{' '}
                  <strong>{createdCvOrder?.orderNumber || ''}</strong> ha sido ingresado en nuestro sistema en estado{' '}
                  <span style={{ color: '#D97706', fontWeight: 700 }}>PENDIENTE</span>.
                </p>

                <div style={{
                  backgroundColor: '#FAF0F2',
                  border: '1px solid #E8C4C8',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginTop: '1.25rem',
                  textAlign: 'left',
                  fontSize: '0.88rem',
                  color: '#6B1D25'
                }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>📱 Entrega por WhatsApp Business:</strong>
                  <p style={{ color: '#4A1218', lineHeight: 1.55, margin: 0 }}>
                    Recibimos la información de tu experiencia. Nos comunicaremos directamente por <strong>WhatsApp Business</strong> al número <strong style={{ textDecoration: 'underline' }}>{formData.whatsapp}</strong> para coordinar la entrega de tu nuevo CV en PDF (en 48 a 72hs hábiles).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.closeSuccessBtn}
                  style={{ backgroundColor: '#8C2D38', marginTop: '1.5rem' }}
                >
                  Entendido, volver a la página
                </button>
              </div>
            ) : (
              /* Spreadsheet License Success View */
              <div className={styles.successModalBox}>
                <div className={styles.successIconWrapper}>
                  <Check size={32} />
                </div>
                <h3 className={styles.successTitle}>¡Tu Planilla está Lista!</h3>
                <p className={styles.successText}>
                  ¡Gracias <strong>{formData.name || 'por tu compra'}</strong>! Tu clave de activación oficial ha sido generada y registrada en el sistema.
                </p>

                <div className={styles.licenseCard}>
                  <div className={styles.licenseCardHeader}>Tu Clave de Activación Oficial:</div>
                  <div className={styles.licenseKeyRow}>
                    <span className={styles.licenseKeyText}>
                      {issuedLicense?.licenseKey || 'FM-2026-LIVE'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (issuedLicense?.licenseKey) {
                          navigator.clipboard.writeText(issuedLicense.licenseKey);
                          setCopiedKey(true);
                          setTimeout(() => setCopiedKey(false), 2000);
                        }
                      }}
                      className={styles.copyLicenseBtn}
                    >
                      {copiedKey ? '¡Copiada!' : 'Copiar Clave'}
                    </button>
                  </div>

                  <a
                    href={issuedLicense?.copyUrl || 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openTemplateCtaBtn}
                  >
                    <span>Abrir y Copiar mi Planilla en Google Sheets</span>
                    <ExternalLink size={16} />
                  </a>

                  <a
                    href="/docs/Finanzas_en_Orden_Curso_Practico.pdf"
                    download="Finanzas_en_Orden_Curso_Practico.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openTemplateCtaBtn}
                    style={{ marginTop: '0.75rem', backgroundColor: '#0D1B2A', borderColor: '#0D1B2A' }}
                  >
                    <span>Descargar E-Book & Curso Práctico (PDF)</span>
                    <Download size={16} />
                  </a>

                  <ol className={styles.licenseStepsList}>
                    <li>
                      Hacé clic en el botón superior y presioná el botón azul{' '}
                      <strong>&apos;Crear una copia&apos;</strong>.
                    </li>
                    <li>
                      En la portada <em>&apos;Activar Licencia&apos;</em>, escribí tu clave en la celda{' '}
                      <strong>C7</strong> y presioná Enter.
                    </li>
                    <li>
                      ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.
                    </li>
                  </ol>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.closeSuccessBtn}
                >
                  Entendido, volver a la página
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
