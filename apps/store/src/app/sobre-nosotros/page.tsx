'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle2, Mail, MapPin, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function SobreNosotrosPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      <Container size="default">
        {/* Back Link */}
        <div className={styles.backWrap}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Volver al Catálogo</span>
          </Link>
        </div>

        {/* Content Box */}
        <div className={styles.contentGrid}>
          {/* Left Column: Brief About */}
          <div className={styles.aboutCol}>
            <div className={styles.brandPill}>
              <Sparkles size={13} />
              <span>TIENDA FLOR MARTINEZ</span>
            </div>

            <h1 className={styles.title}>
              Elegancia, confección y atención al detalle
            </h1>

            <div className={styles.storyText}>
              <p>
                <strong>Tienda Flor Martinez</strong> es el espacio del ecosistema dedicado a la
                selección de prendas de vestir formales, indumentaria institucional y objetos de distinción.
              </p>
              <p>
                Nos enfocamos en materiales nobles —algodón egipcio, lanas frías de moldería sastrera, cueros legítimos
                argentinos y acabados metálicos duraderos— pensados para acompañar la presencia diaria de profesionales
                y equipos con sobriedad y prestancia.
              </p>
              <p>
                Cada producto es testeado para garantizar una durabilidad real, caída impecable y la coherencia estética
                que identifica a la marca Flor Martinez.
              </p>
            </div>

            {/* Direct Contact info */}
            <div className={styles.directContact}>
              <div className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <div>
                  <strong>Correo Electrónico</strong>
                  <span>tienda@flormartinez.com</span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <div>
                  <strong>Ubicación</strong>
                  <span>Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Contact Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>
                    <CheckCircle2 size={42} />
                  </div>
                  <h3>¡Mensaje enviado!</h3>
                  <p>
                    Muchas gracias por contactarte, <strong>{form.name}</strong>. Te responderemos a la brevedad a tu correo <strong>{form.email}</strong>.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', subject: 'Consulta General', message: '' });
                    }}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.formTitle}>Contacto</h2>
                  <p className={styles.formSubtitle}>
                    ¿Tienes dudas sobre algún artículo o consulta? Escríbenos y te responderemos en breve.
                  </p>

                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nombre completo *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Correo electrónico *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>Motivo *</label>
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={styles.input}
                    >
                      <option value="Consulta sobre un producto">Consulta sobre un producto</option>
                      <option value="Talles y medidas">Talles y medidas</option>
                      <option value="Tiempos de entrega">Tiempos de entrega</option>
                      <option value="Otro motivo">Otro motivo</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Mensaje *</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Escribe aquí tu consulta..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={styles.textarea}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    iconLeft={<Send size={16} />}
                  >
                    <span>Enviar Mensaje</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
