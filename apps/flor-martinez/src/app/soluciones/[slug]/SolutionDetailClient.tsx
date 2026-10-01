'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
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
  Send,
  FileSpreadsheet,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SolutionItem } from '@/data/solutions';
import { useAuth } from '@/context/AuthContext';
import { TEMPLATE_COPY_URL } from '@/lib/licensing-types';
import { createContactSubmissionAction } from '@/actions/contactSubmissions';
import { createCvOrderAction } from '@/actions/cvOrders';
import SolutionReviewsSection from '@/components/solutions/SolutionReviewsSection';
import styles from './SolutionDetail.module.css';

interface SolutionDetailClientProps {
  solution: SolutionItem;
}

const spreadsheetSheets = [
  {
    id: 'dashboard',
    title: '📊 Dashboard (Tablero General)',
    shortName: '1. Dashboard',
    badge: 'Vista Principal',
    image: '/images/finanzas-en-orden/dashboard-preview.png',
    description:
      'Resumen visual de tus finanzas con gráficos automáticos de ingresos, gastos y porcentaje de ahorro.',
    features: [
      'Gráficos de ingresos vs. gastos',
      'Ahorro en tiempo real',
      'Distribución por categorías',
    ],
  },
  {
    id: 'movimientos',
    title: '💳 Movimientos (Registro Diario)',
    shortName: '2. Movimientos',
    badge: 'Carga Inteligente',
    image: '/images/finanzas-en-orden/movimientos-preview.png',
    description:
      'Carga tus ingresos y gastos diarios seleccionando categorías desplegables de forma rápida.',
    features: [
      'Menús desplegables de categorías',
      'Suma automática de saldos',
      'Registro rápido diario',
    ],
  },
  {
    id: 'metas',
    title: '🎯 Metas (Presupuesto y Objetivos)',
    shortName: '3. Metas',
    badge: 'Planificación',
    image: '/images/finanzas-en-orden/metas-preview.png',
    description:
      'Definí presupuestos máximos y seguí el avance de tus metas de ahorro mes a mes.',
    features: [
      'Límites de gasto por rubro',
      'Control de objetivos de ahorro',
      'Presupuesto vs. gasto real',
    ],
  },
  {
    id: 'gastos-hormiga',
    title: '🐜 Gastos Hormiga (Tracker de Pequeños Consumos)',
    shortName: '4. Gastos Hormiga',
    badge: 'Control Fino',
    image: '/images/finanzas-en-orden/gastos-hormiga-preview.png',
    description:
      'Detectá microgastos diarios (café, delivery, suscripciones) para evitar fugas de dinero.',
    features: [
      'Control de consumos diarios',
      'Detección de fugas de dinero',
      'Total acumulado mensual',
    ],
  },
  {
    id: 'informe-detallado',
    title: '📈 Informe Detallado (Reporte Anual)',
    shortName: '5. Informe Detallado',
    badge: 'Análisis Pro',
    image: '/images/finanzas-en-orden/informe-detallado-preview.png',
    description:
      'Reporte consolidado para analizar la evolución de tus finanzas mes a mes.',
    features: [
      'Histórico mes a mes',
      'Comparativas anuales',
      'Balance total consolidado',
    ],
  },
];

export default function SolutionDetailClient({ solution }: SolutionDetailClientProps) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentCurrency, setPaymentCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
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
  const [isInternationalSuccess, setIsInternationalSuccess] = useState(false);
  const [issuedLicense, setIssuedLicense] = useState<{
    licenseKey: string;
    copyUrl: string;
  } | null>(null);
  const [createdCvOrder, setCreatedCvOrder] = useState<{
    orderNumber: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const [cvFileName, setCvFileName] = useState<string>('');
  const [cvFileData, setCvFileData] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setCvFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCvFileName('');
      setCvFileData('');
    }
  };

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
            copyUrl: TEMPLATE_COPY_URL,
          });
        }
        if (isCv && ref) {
          setCreatedCvOrder({
            orderNumber: ref,
          });
        }
      }
    }
  }, [isExcel, isCv]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setIsInternationalSuccess(false);
    setIssuedLicense(null);
    setCreatedCvOrder(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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

    if (paymentCurrency === 'USD' && !formData.country.trim()) {
      setErrorMessage('Tu País de Residencia es obligatorio para gestionar tu pedido internacional.');
      setIsSubmitting(false);
      return;
    }

    if (isCv && !cvFileData && paymentCurrency === 'ARS') {
      setErrorMessage('Adjuntar tu CV actual en formato PDF, Word o Imagen es obligatorio.');
      setIsSubmitting(false);
      return;
    }

    // SI ES PAGO INTERNACIONAL (USD) -> Registrar solicitud y notificar por WhatsApp
    if (paymentCurrency === 'USD') {
      try {
        const fullMessage = `Solicitud de compra internacional desde ${formData.country.trim()}.
Producto/Servicio: ${solution.title} (USD $${solution.priceUSD}).
Cliente: ${formData.name.trim()} (${formData.email.trim()}).
WhatsApp: ${formData.whatsapp.trim()}.
${formData.cvDetails ? 'Notas: ' + formData.cvDetails.trim() : ''}
${cvFileName ? 'CV Adjunto: ' + cvFileName : ''}`;

        // 1. Guardar en consultas de contacto para el Superadmin
        await createContactSubmissionAction({
          name: formData.name.trim(),
          email: formData.email.trim(),
          motivo: `Pedido Internacional (${formData.country.trim()})`,
          mensaje: fullMessage,
        });

        // 2. Si es CV, registrar el orden en cvOrders como PENDIENTE canal WHATSAPP
        if (isCv) {
          await createCvOrderAction({
            customerName: formData.name.trim(),
            customerEmail: formData.email.trim(),
            customerPhone: formData.whatsapp.trim(),
            channel: 'WHATSAPP',
            priceARS: solution.priceARS,
            status: 'PENDIENTE',
            notes: `[INTERNACIONAL - ${formData.country.trim()}] ${formData.cvDetails || ''}`,
            cvFileName,
            cvFileData,
          });
        }

        setIsInternationalSuccess(true);
      } catch (err) {
        console.error('Error al registrar pedido internacional:', err);
        setErrorMessage('Ocurrió un error al registrar tu solicitud. Por favor intenta nuevamente.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // SI ES PAGO NACIONAL (ARS) -> Mercado Pago checkout
    try {
      const response = await fetch('/api/checkout/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solutionSlug: solution.slug,
          customerName: formData.name,
          customerEmail: formData.email,
          customerWhatsapp: formData.whatsapp,
          customerCvDetails: formData.cvDetails,
          cvFileName,
          cvFileData,
          currency: 'ARS',
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

              {/* Prominent PC Recommendation Card */}
              {isExcel && (
                <div style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>💡</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#92400E', lineHeight: 1.4 }}>
                    Se recomienda utilizar la planilla desde una computadora (PC o Mac) para una visualización y uso óptimo de gráficos y tableros.
                  </span>
                </div>
              )}
            </div>

            {/* Video Explainer Section */}
            {solution.videoUrl ? (
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
            ) : isExcel ? (
              <div className={styles.heroPreviewCard} style={{
                marginBottom: '2rem',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #CBD5E1',
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
                backgroundColor: '#0F172A',
              }}>
                <div style={{
                  padding: '10px 16px',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #1E293B',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                      <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                      <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
                    </div>
                    <span style={{ color: '#E2E8F0', fontSize: '0.8rem' }}>Google Sheets &bull; Finanzas en Orden</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700 }}>5 Solapas Automatizadas</span>
                </div>
                <img
                  src="/images/finanzas-en-orden/dashboard.png"
                  alt="Vista previa oficial del Dashboard Finanzas en Orden"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            ) : null}

            {/* Detailed Description */}
            <div className={styles.descriptionSection}>
              <h3 className={styles.sectionHeading}>
                <Sparkles size={20} className={styles.sectionHeadingIcon} />
                <span>Sobre esta solución</span>
              </h3>
              <p className={styles.fullDescriptionText}>{solution.fullDescription}</p>
            </div>

            {/* SPREADSHEET FEATURING TOUR (FOR FINANZAS EN ORDEN) */}
            {isExcel && (
              <div className={`${styles.descriptionSection} ${styles.tourSection}`} style={{ marginTop: '2.5rem' }}>
                <h3 className={styles.sectionHeading}>
                  <FileSpreadsheet size={20} className={styles.sectionHeadingIcon} />
                  <span>Recorrido por las Hojas de la Planilla</span>
                </h3>
                <p className={styles.fullDescriptionText} style={{ marginBottom: '1.25rem' }}>
                  Conocé en detalle la estructura de cada pestaña diseñada para darte claridad absoluta sobre tu dinero:
                </p>

                {/* Sheet Selector Tabs */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
                  {spreadsheetSheets.map((sheet, idx) => (
                    <button
                      key={sheet.id}
                      type="button"
                      onClick={() => setActiveSheetIndex(idx)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: '1px solid',
                        borderColor: activeSheetIndex === idx ? '#1C4D37' : '#CBD5E1',
                        backgroundColor: activeSheetIndex === idx ? '#1C4D37' : '#F8FAFC',
                        color: activeSheetIndex === idx ? '#FFFFFF' : '#475569',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {sheet.shortName}
                    </button>
                  ))}
                </div>

                {/* Active Sheet Card */}
                {(() => {
                  const activeSheet = spreadsheetSheets[activeSheetIndex] || spreadsheetSheets[0]!;
                  return (
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #C2E0D1',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 4px 16px rgba(28, 77, 55, 0.05)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1C4D37', margin: 0 }}>
                          {activeSheet.title}
                        </h4>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          backgroundColor: '#F0F7F4',
                          color: '#1C4D37',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          border: '1px solid #C2E0D1',
                        }}>
                          {activeSheet.badge}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                        {activeSheet.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {activeSheet.features.map((feat, fIdx) => (
                          <span key={fIdx} style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1C4D37',
                            backgroundColor: '#F0F7F4',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}>
                            ✓ {feat}
                          </span>
                        ))}
                      </div>

                      {/* Real Sheet HD Screenshot */}
                      <div style={{
                        width: '100%',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #CBD5E1',
                        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                        backgroundColor: '#0F172A',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 14px',
                          backgroundColor: '#0F172A',
                          borderBottom: '1px solid #1E293B',
                          color: '#94A3B8',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                            <span style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                            <span style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#10B981' }} />
                            <span style={{ marginLeft: 6, color: '#E2E8F0' }}>{activeSheet.title}</span>
                          </div>
                          <span style={{ color: '#38BDF8', fontSize: '0.72rem', letterSpacing: '0.02em' }}>
                            Captura HD Oficial
                          </span>
                        </div>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <img
                            src={activeSheet.image}
                            alt={activeSheet.title}
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              backgroundColor: '#FFFFFF',
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            backgroundColor: 'rgba(15, 23, 42, 0.82)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            color: '#F8FAFC',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            pointerEvents: 'none',
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38BDF8' }} />
                            Vista previa
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

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
            <div className={styles.reviewsSection}>
              <SolutionReviewsSection solutionSlug={solution.slug} initialUser={user} />
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar & Buy CTA */}
          <div className={styles.sidebarColumn}>
            <div className={`${styles.stickySidebarCard} ${isExcel ? styles.sidebarCardExcel : styles.sidebarCardCv}`}>
              <div className={styles.sidebarPriceBlock}>
                {solution.originalPriceARS && (
                  <div className={styles.originalPriceRow}>
                    <span className={styles.originalPriceLine}>
                      ${solution.originalPriceARS.toLocaleString('es-AR')} ARS
                    </span>
                    <span className={styles.discountBadge}>50% OFF ESTRENO</span>
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
                <span>Mercado Pago</span> • <span>Tarjetas</span> • <span>Transferencia / Pago Internacional</span>
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

            {isInternationalSuccess ? (
              /* International Order Request Success View */
              <div className={styles.successModalBox}>
                <div className={styles.successIconWrapper} style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                  <Check size={32} />
                </div>
                <h3 className={styles.successTitle}>¡Solicitud Internacional Recibida!</h3>
                <p className={styles.successText}>
                  ¡Muchas gracias <strong>{formData.name}</strong>! Recibimos tu solicitud para adquirir{' '}
                  <strong>{solution.title}</strong> desde <strong>{formData.country}</strong>.
                </p>

                <div style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginTop: '1.25rem',
                  textAlign: 'left',
                  fontSize: '0.88rem',
                  color: '#1E40AF'
                }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>📱 Coordinación por WhatsApp Business:</strong>
                  <p style={{ color: '#1E3A8A', lineHeight: 1.55, margin: 0 }}>
                    Nos contactaremos a tu número <strong>{formData.whatsapp}</strong> para enviarte los medios de pago internacionales acordes a tu país ({formData.country}) y habilitar tu acceso o servicio de inmediato.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.closeSuccessBtn}
                  style={{ backgroundColor: '#0D1B2A', marginTop: '1.5rem' }}
                >
                  Entendido, volver a la página
                </button>
              </div>
            ) : !isSuccess ? (
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
                    <span className={styles.tabTitle}>¿No sos de Argentina?</span>
                    <span className={styles.tabSub}>Solicitar por WhatsApp</span>
                  </button>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmitOrder} className={styles.checkoutForm}>
                  {paymentCurrency === 'USD' && (
                    <div style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '0.75rem',
                      fontSize: '0.84rem',
                      color: '#1E40AF',
                      lineHeight: 1.5,
                      marginBottom: '0.5rem'
                    }}>
                      🌐 <strong>Pedido Internacional:</strong> Dejanos tu WhatsApp con código de país y tu País de Residencia. Te contactaremos por <strong>WhatsApp Business</strong> para indicarte las formas de pago en tu moneda local y entregarte tu pedido.
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
                    <label htmlFor="customerEmail">Correo Electrónico *</label>
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
                    <label htmlFor="customerWhatsapp">WhatsApp *</label>
                    <input
                      id="customerWhatsapp"
                      type="tel"
                      required
                      placeholder={paymentCurrency === 'USD' ? '+598 99 123 456' : '+54 9 11 1234-5678'}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  {paymentCurrency === 'USD' && (
                    <div className={styles.formGroup}>
                      <label htmlFor="customerCountry">País de Residencia *</label>
                      <input
                        id="customerCountry"
                        type="text"
                        required
                        placeholder="Ej. Uruguay, Chile, España, EE.UU..."
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                  )}

                  {isCv && (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="customerCvFile">CV Actual (PDF, Word o Imagen) {paymentCurrency === 'ARS' ? '*' : '(Opcional)'}</label>
                        <input
                          id="customerCvFile"
                          type="file"
                          required={paymentCurrency === 'ARS'}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="customerCvDetails">
                          Aclaraciones o notas adicionales (opcional)
                        </label>
                        <textarea
                          id="customerCvDetails"
                          rows={3}
                          placeholder="Aclaraciones, aspiraciones o detalles que quieras sumar a tu CV..."
                          value={formData.cvDetails}
                          onChange={(e) => setFormData({ ...formData, cvDetails: e.target.value })}
                          className={styles.formInput}
                          style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        />
                      </div>
                    </>
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
                    {isSubmitting ? (
                      <>
                        <span className={styles.btnSpinner} />
                        <span>Procesando solicitud...</span>
                      </>
                    ) : paymentCurrency === 'USD' ? (
                      <>
                        <Send size={16} />
                        <span>Solicitar Pedido Internacional por WhatsApp</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Pagar ${solution.priceARS.toLocaleString('es-AR')} ARS</span>
                      </>
                    )}
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
                    href={issuedLicense?.copyUrl || TEMPLATE_COPY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openTemplateCtaBtn}
                  >
                    <span>Abrir y Copiar mi Planilla en Google Sheets</span>
                    <ExternalLink size={16} />
                  </a>

                  <a
                    href="/api/download/curso-practico"
                    download="Finanzas_en_Orden_Curso_Practico.pdf"
                    className={styles.openTemplateCtaBtn}
                    style={{ marginTop: '0.75rem', backgroundColor: '#0D1B2A', borderColor: '#0D1B2A' }}
                  >
                    <span>Descargar E-Book & Curso Práctico (PDF)</span>
                    <Download size={16} />
                  </a>

                  <ol className={styles.licenseStepsList}>
                    <li>
                      Hacé clic en el botón superior y presioná el botón azul{' '}
                      <strong>&apos;Usar plantilla&apos;</strong> (o &apos;Crear una copia&apos;).
                    </li>
                    <li>
                      En la barra amarilla superior, hacé clic en{' '}
                      <strong>&apos;Permitir acceso&apos;</strong>.
                    </li>
                    <li>
                      Escribí tu clave oficial en la celda{' '}
                      <strong>C7</strong> y presioná Enter para activar.
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
