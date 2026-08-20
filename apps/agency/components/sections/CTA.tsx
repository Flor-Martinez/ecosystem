import { Container } from '@repo/ui';

export function CTA() {
  return (
    <section id="contacto" className="py-24 md:py-32">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gray-950 px-8 py-16 text-white md:px-16 md:py-20">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Hablemos
            </span>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              ¿Tenés un proyecto en mente?
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Contanos qué necesitás y veamos juntos cómo podemos
              ayudarte.
            </p>

            <a
              href="mailto:hola@flormartinez.com"
              className="mt-8 inline-block rounded-[var(--radius-md)] bg-white px-7 py-3.5 font-medium text-gray-950 transition hover:bg-gray-100"
            >
              Contactarnos
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}