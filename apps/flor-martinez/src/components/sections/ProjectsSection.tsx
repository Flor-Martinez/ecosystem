import React from 'react';
import Link from 'next/link';
import { GraduationCap, Briefcase, ShoppingBag, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  return (
    <section className={styles.section} id="proyectos">
      <Container size="wide">
        {/* Header */}
        <div className={styles.hubHeader}>
          <div className={styles.badgeWrap}>
            <Badge variant="primary" size="md">
              <Sparkles size={13} className={styles.badgeIcon} />
              Central de Derivación Estratégica
            </Badge>
          </div>
          
          <h2 className={styles.hubTitle}>Unidades del Ecosistema</h2>
          <p className={styles.hubSubtitle}>
            El Ecosistema Flor Martinez articula tres unidades especializadas interconectadas. Explorá las áreas de desarrollo estratégico:
          </p>
        </div>

        {/* 3-Card Ecosystem Grid (Symmetrical Units: 1. Agencia, 2. Academia, 3. Tienda) */}
        <div className={styles.derivationGrid}>
          {/* 1. AGENCIA FLOR MARTINEZ */}
          <div className={`${styles.hubCard} ${styles.cardDisabled} ${styles.cardAgencia}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconBox} ${styles.iconAgenciaDisabled}`}>
                <Briefcase size={26} />
              </div>
              <div className={styles.cardStatusRow}>
                <span className={styles.statusDisabled}>
                  <Lock size={12} />
                  Próximamente · En Desarrollo
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.cardBranchLabelDisabled}>CONSULTORÍA B2B & TECH</span>
              <h3 className={styles.cardBranchTitleDisabled}>Agencia Flor Martinez</h3>
              <p className={styles.cardBranchTaglineDisabled}>
                Estrategia de Marca, Marketing Digital & Desarrollo Web
              </p>
              <p className={styles.cardBranchDescDisabled}>
                Soluciones de comunicación estratégica, posicionamiento y tecnología comercial para empresas y marcas en expansión.
              </p>
            </div>

            <div className={styles.cardActionArea}>
              <Link
                href="/proyecto/agencia-flor-martinez"
                className={`${styles.hubActionBtn} ${styles.btnDisabledState}`}
              >
                <span>Ver Ficha & Propuesta</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* 2. ACADEMIA FLOR MARTINEZ */}
          <div className={`${styles.hubCard} ${styles.cardDisabled} ${styles.cardAcademia}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconBox} ${styles.iconAcademiaDisabled}`}>
                <GraduationCap size={26} />
              </div>
              <div className={styles.cardStatusRow}>
                <span className={styles.statusDisabled}>
                  <Lock size={12} />
                  Próximamente · En Desarrollo
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.cardBranchLabelDisabled}>PLATAFORMA EDUCATIVA</span>
              <h3 className={styles.cardBranchTitleDisabled}>Academia Flor Martinez</h3>
              <p className={styles.cardBranchTaglineDisabled}>
                Empleabilidad, LinkedIn de Alto Impacto, CV & Entrevistas
              </p>
              <p className={styles.cardBranchDescDisabled}>
                Plataforma formativa práctica para optimizar tu perfil profesional, CV y destacar ante reclutadores e industrias exigentes.
              </p>
            </div>

            <div className={styles.cardActionArea}>
              <Link
                href="/proyecto/academia-flor-martinez"
                className={`${styles.hubActionBtn} ${styles.btnDisabledState}`}
              >
                <span>Ver Ficha & Propuesta</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* 3. TIENDA FLOR MARTINEZ */}
          <div className={`${styles.hubCard} ${styles.cardDisabled} ${styles.cardTienda}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconBox} ${styles.iconTiendaDisabled}`}>
                <ShoppingBag size={26} />
              </div>
              <div className={styles.cardStatusRow}>
                <span className={styles.statusDisabled}>
                  <Lock size={12} />
                  Próximamente · En Desarrollo
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.cardBranchLabelDisabled}>MERCHANDISING CORPORATIVO</span>
              <h3 className={styles.cardBranchTitleDisabled}>Tienda Flor Martinez</h3>
              <p className={styles.cardBranchTaglineDisabled}>
                Kits de Bienvenida, Cuadernos & Papelería Ejecutiva
              </p>
              <p className={styles.cardBranchDescDisabled}>
                Merchandising empresarial premium y kits personalizados por volumen para fidelización de colaboradores y clientes.
              </p>
            </div>

            <div className={styles.cardActionArea}>
              <Link
                href="/proyecto/tienda-flor-martinez"
                className={`${styles.hubActionBtn} ${styles.btnDisabledState}`}
              >
                <span>Ver Ficha & Propuesta</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
