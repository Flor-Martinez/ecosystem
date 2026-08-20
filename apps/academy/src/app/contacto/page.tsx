'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './contacto.module.css';

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: 'cursos',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      {/* 1. HERO */}
      <section className={styles.heroSection}>
        <Container size="wide">
          <div className={styles.heroBadgeWrap}>
            <Badge variant="primary" size="md">
              Atención & Consultas
            </Badge>
          </div>

          <h1 className={styles.heroTitle}>Contacto & Inscripciones</h1>

          <p className={styles.heroSubtitle}>
            ¿Tenés dudas sobre algún programa, necesitás coordinar una capacitación corporativa in-company o querés consultar por mentoría individual? Escribinos.
          </p>
        </Container>
      </section>

      {/* 2. CONTACT GRID & FORM */}
      <section className={styles.formSection}>
        <Container size="wide">
          <div className={styles.contactGrid}>
            {/* Left: Direct Channels & FAQ */}
            <div className={styles.infoCol}>
              <h2 className={styles.infoTitle}>Canales de Comunicación</h2>
              <p className={styles.infoDesc}>
                Respondemos todas las consultas de forma personalizada dentro de las 24 a 48 horas hábiles.
              </p>

              <div className={styles.channelsList}>
                <a href="mailto:contacto@flormartinez.com" className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className={styles.channelLabel}>Email Oficial</span>
                    <span className={styles.channelVal}>contacto@flormartinez.com</span>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelItem}
                >
                  <div className={styles.channelIcon}>
                    <InstagramIcon size={20} />
                  </div>
                  <div>
                    <span className={styles.channelLabel}>Instagram Oficial</span>
                    <span className={styles.channelVal}>@flormartinez.ok</span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelItem}
                >
                  <div className={styles.channelIcon}>
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <span className={styles.channelLabel}>LinkedIn Oficial</span>
                    <span className={styles.channelVal}>Academia Flor Martinez</span>
                  </div>
                </a>
              </div>

              {/* Quick FAQ Box */}
              <div className={styles.faqBox}>
                <div className={styles.faqHeader}>
                  <HelpCircle size={18} className={styles.faqIcon} />
                  <span>Preguntas Frecuentes</span>
                </div>
                <div className={styles.faqItem}>
                  <strong>¿Cómo es el acceso a los cursos?</strong>
                  <p>Una vez completada la inscripción recibís el acceso inmediato a la plataforma con todos los módulos y plantillas.</p>
                </div>
                <div className={styles.faqItem}>
                  <strong>¿Entregan certificado?</strong>
                  <p>Sí, todos los programas incluyen certificado de finalización emitido por Academia Flor Martinez.</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className={styles.formCol}>
              <Card variant="surface" padding="lg" className={styles.formCard}>
                {submitted ? (
                  <div className={styles.successState}>
                    <div className={styles.successIcon}>
                      <CheckCircle2 size={42} />
                    </div>
                    <h3 className={styles.successTitle}>¡Mensaje enviado con éxito!</h3>
                    <p className={styles.successDesc}>
                      Gracias por escribirnos, <strong>{formData.nombre}</strong>. Nos pondremos en contacto a la brevedad a <strong>{formData.email}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ nombre: '', email: '', motivo: 'cursos', mensaje: '' });
                      }}
                      className={styles.resetFormBtn}
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>Envianos tu consulta</h3>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="nombre" className={styles.label}>
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Lucía Fernandez"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tuemail@ejemplo.com"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="motivo" className={styles.label}>
                        Motivo de consulta *
                      </label>
                      <select
                        id="motivo"
                        value={formData.motivo}
                        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                        className={styles.select}
                      >
                        <option value="cursos">Consulta sobre cursos o inscripciones</option>
                        <option value="in-company">Capacitación corporativa / In-company</option>
                        <option value="mentoria">Mentoría 1 a 1 de carrera</option>
                        <option value="otro">Otras consultas o alianzas</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="mensaje" className={styles.label}>
                        Mensaje o consulta *
                      </label>
                      <textarea
                        id="mensaje"
                        required
                        rows={4}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        placeholder="Contanos sobre tu consulta o tu objetivo profesional..."
                        className={styles.textarea}
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
                      <Send size={16} />
                      <span>Enviar consulta</span>
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
