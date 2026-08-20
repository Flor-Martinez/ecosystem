'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './ContactSection.module.css';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: 'consultoria',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.section} id="contacto">
      <Container size="wide">
        {/* Header */}
        <div className={styles.headerArea}>
          <div className={styles.badgeWrap}>
            <Badge variant="primary" size="md">
              Canales de Conexión
            </Badge>
          </div>

          <h2 className={styles.sectionTitle}>Hablemos de tu próximo paso</h2>
          <p className={styles.sectionSubtitle}>
            ¿Querés consultar por servicios de consultoría estratégica, programas en la Academia o explorar una alianza profesional? Escribime directamente.
          </p>
        </div>

        {/* Content Grid */}
        <div className={styles.contactGrid}>
          {/* Direct Channels Column */}
          <div className={styles.channelsCol}>
            <h3 className={styles.colTitle}>Canales Directos</h3>
            <p className={styles.colDesc}>
              Priorizo la comunicación clara y directa. Podés conectar a través de las siguientes vías:
            </p>

            <div className={styles.channelsList}>
              <a
                href="mailto:contacto@flormartinez.com"
                className={styles.channelItem}
              >
                <div className={`${styles.channelIcon} ${styles.iconMail}`}>
                  <Mail size={20} />
                </div>
                <div>
                  <div className={styles.channelLabel}>Email Profesional</div>
                  <div className={styles.channelValue}>contacto@flormartinez.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelItem}
              >
                <div className={`${styles.channelIcon} ${styles.iconLinkedin}`}>
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div className={styles.channelLabel}>LinkedIn Profesional</div>
                  <div className={styles.channelValue}>Flor Martinez</div>
                </div>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelItem}
              >
                <div className={`${styles.channelIcon} ${styles.iconInstagram}`}>
                  <InstagramIcon size={20} />
                </div>
                <div>
                  <div className={styles.channelLabel}>Instagram Oficial</div>
                  <div className={styles.channelValue}>@flormartinez.ok</div>
                </div>
              </a>
            </div>

            {/* Advisory note */}
            <div className={styles.advisoryBox}>
              <h4 className={styles.advisoryTitle}>¿Buscás formación o cursos de empleabilidad?</h4>
              <p className={styles.advisoryText}>
                Si tu interés está centrado en optimizar tu CV, potenciar tu perfil de LinkedIn o preparar entrevistas, podés ingresar directamente a la plataforma educativa.
              </p>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.advisoryLink}
              >
                <span>Ir al portal de la Academia Flor Martinez</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className={styles.formCol}>
            <Card variant="default" padding="lg" className={styles.formCard}>
              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <CheckCircle2 size={48} color="#1E6B43" />
                  </div>
                  <h3 className={styles.successTitle}>¡Mensaje enviado con éxito!</h3>
                  <p className={styles.successText}>
                    Gracias por comunicarte. Me pondré en contacto a la brevedad al correo indicado (<strong>{formData.email}</strong>).
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ nombre: '', email: '', motivo: 'consultoria', mensaje: '' });
                    }}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Enviar Consulta Directa</h3>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="nombre" className={styles.label}>
                      Nombre completo <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      required
                      placeholder="Ej. María González"
                      className={styles.input}
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Correo electrónico <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="motivo" className={styles.label}>
                      Área de interés / Motivo <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="motivo"
                      className={styles.select}
                      value={formData.motivo}
                      onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                    >
                      <option value="consultoria">Consultoría en Comercio Exterior</option>
                      <option value="agencia">Estrategia Digital & Agencia</option>
                      <option value="academia">Academia & Cursos de Empleabilidad</option>
                      <option value="tienda">Kits Corporativos & Tienda</option>
                      <option value="otro">Propuesta de Conferencia / Alianza</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="mensaje" className={styles.label}>
                      Mensaje <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      required
                      rows={4}
                      placeholder="Contame brevemente sobre tu proyecto, consulta o requerimiento..."
                      className={styles.textarea}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    rightIcon={<Send size={16} />}
                    className={styles.submitBtn}
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
