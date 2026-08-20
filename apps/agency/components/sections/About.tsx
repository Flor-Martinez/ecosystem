import { Container } from '@repo/ui';

export function About() {
  return (
    <section id="nosotros" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Nosotros
            </span>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Tecnología y estrategia, en un mismo lugar.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              En Flor Martinez ayudamos a empresas y emprendedores a
              convertir sus ideas en proyectos digitales.
            </p>

            <p>
              Combinamos marketing, comunicación y tecnología para
              desarrollar soluciones que no solamente se vean bien,
              sino que tengan un objetivo claro.
            </p>

            <p>
              Este recién es el comienzo.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}