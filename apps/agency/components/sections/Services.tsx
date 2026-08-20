import { Container } from '@repo/ui';

const services = [
  {
    number: '01',
    title: 'Marketing',
    description:
      'Estrategias para posicionar tu marca, llegar a nuevas personas y generar oportunidades.',
  },
  {
    number: '02',
    title: 'Desarrollo web',
    description:
      'Creamos sitios web modernos, rápidos y adaptados a las necesidades de cada negocio.',
  },
  {
    number: '03',
    title: 'Contenido & redes',
    description:
      'Contenido pensado para comunicar mejor tu propuesta y construir una presencia digital sólida.',
  },
  {
    number: '04',
    title: 'Estrategia digital',
    description:
      'Analizamos tu negocio y diseñamos soluciones digitales alineadas con tus objetivos.',
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-gray-50 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Servicios
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            ¿Cómo podemos ayudar a tu empresa?
          </h2>

          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Combinamos estrategia, creatividad y tecnología para crear
            soluciones que tengan un propósito.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="bg-white p-8 transition hover:bg-gray-50 md:p-10"
            >
              <span className="text-sm font-semibold text-[var(--primary)]">
                {service.number}
              </span>

              <h3 className="mt-6 text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-[var(--muted)]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}