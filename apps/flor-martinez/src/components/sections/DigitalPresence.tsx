import { Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { socialChannels } from '@/data/social';
import styles from './DigitalPresence.module.css';

export function DigitalPresence() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin':
        return <LinkedinIcon size={24} />;
      case 'instagram':
        return <InstagramIcon size={24} />;
      case 'mail':
        return <Mail size={24} />;
      default:
        return <MessageCircle size={24} />;
    }
  };

  return (
    <section className={styles.digital} id="presencia-digital">
      <Container size="wide">
        <SectionHeader
          badge="Comunidad & Contenidos"
          title="Presencia digital y canales de conexión"
          subtitle="Espacios donde comparto análisis de mercado, consejos prácticos de desarrollo profesional y novedades del ecosistema."
        />

        <div className={styles.channelsGrid}>
          {socialChannels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCardLink}
            >
              <Card variant="surface" padding="lg" className={styles.channelCard}>
                <div className={styles.channelHeader}>
                  <div className={`${styles.iconWrap} ${styles[`icon_${channel.icon}`]}`}>
                    {getIcon(channel.icon)}
                  </div>
                  <div className={styles.badgeWrap}>
                    <span className={styles.channelBadge}>{channel.badge}</span>
                    <ArrowUpRight size={18} className={styles.arrow} />
                  </div>
                </div>

                <h3 className={styles.channelName}>{channel.name}</h3>
                <div className={styles.channelHandle}>{channel.handle}</div>
                <p className={styles.channelDesc}>{channel.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
