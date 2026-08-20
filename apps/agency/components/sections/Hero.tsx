import { Container } from '@repo/ui';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[var(--primary)]">
              Agencia Flor Martinez
            </span>

            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
              Transformamos ideas en{' '}
              <span className="text-[var(--primary)]">
                soluciones digitales.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Ayudamos a empresas y emprendedores a crecer mediante
              estrategias de marketing, tecnología y desarrollo web.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="rounded-[var(--radius-md)] bg-[var(--primary)] px-7 py-3.5 font-medium text-white transition hover:opacity-90"
              >
                Hablemos de tu proyecto
              </a>

              <a
                href="#servicios"
                className="rounded-[var(--radius-md)] border border-gray-300 px-7 py-3.5 font-medium text-gray-800 transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Ver servicios
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 via-white to-violet-100 p-8">
              <div className="flex h-full items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-xl backdrop-blur">
                <div className="text-center">
                  <div className="text-7xl font-bold tracking-tighter text-gray-900">
                    FM
                  </div>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
                    Agencia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}