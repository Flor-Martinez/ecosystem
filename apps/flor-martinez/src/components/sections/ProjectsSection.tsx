import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, Briefcase, ShoppingBag, Lock, Sparkles } from 'lucide-react';
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
          
          <h2 className={styles.hubTitle}>Proyectos del Ecosistema</h2>
          <p className={styles.hubSubtitle}>
            Accedé a los tres portales del ecosistema Flor Martinez. La <strong>Academia</strong> se encuentra actualmente activa y en vivo con programas de empleabilidad abiertos:
          </p>
        </div>

        {/* 3-Card Ecosystem Grid (1. Agencia, 2. Academia [Activa], 3. Tienda) */}
        <div className={styles.derivationGrid}>
          {/* 1. AGENCIA FLOR MARTINEZ (INHABILITADO / EN CONSTRUCCIÓN) */}
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
                <Lock size={14} />
                <span>En Construcción · Ver Ficha</span>
              </Link>
            </div>
          </div>

          {/* 2. ACADEMIA FLOR MARTINEZ (RAMA ACTIVA - MÁXIMO PROTAGONISMO CENTRAL) */}
          <div className={`${styles.hubCard} ${styles.cardAcademiaHeroActive}`}>
            <div className={styles.activeSpotlightRibbon}>RAMA PRINCIPAL EN VIVO</div>
            
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconBox} ${styles.iconAcademiaActive}`}>
                <GraduationCap size={32} />
              </div>
              <div className={styles.cardStatusRow}>
                <span className={styles.statusLivePill}>
                  <span className={styles.livePulseGlow} />
                  Rama Activa · Acceso Inmediato
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.cardBranchLabelActive}>PLATAFORMA EDUCATIVA</span>
              <h3 className={styles.cardBranchTitleActive}>Academia Flor Martinez</h3>
              <p className={styles.cardBranchTaglineActive}>
                Empleabilidad, LinkedIn de Alto Impacto, CV & Entrevistas
              </p>
              <p className={styles.cardBranchDescActive}>
                Plataforma formativa práctica para acelerar tu inserción laboral, optimizar tu perfil profesional y destacar ante reclutadores.
              </p>
            </div>

            <div className={styles.cardActionArea}>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.hubActionBtn} ${styles.btnAcademiaHero}`}
              >
                <span>Ingresar a la Academia</span>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>

          {/* 3. TIENDA FLOR MARTINEZ (INHABILITADO / EN CONSTRUCCIÓN) */}
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
                <Lock size={14} />
                <span>En Construcción · Ver Ficha</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
