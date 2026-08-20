import { Container } from '@repo/ui';

const projects = [
  {
    category: 'Desarrollo web',
    title: 'Proyecto 01',
  },
  {
    category: 'Marketing',
    title: 'Proyecto 02',
  },
  {
    category: 'Estrategia digital',
    title: 'Proyecto 03',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-gray-50 py-24 md:py-32">
      <Container>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Portfolio
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Algunos de nuestros proyectos.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-violet-100 transition duration-500 group-hover:scale-[1.02]" />

              <div className="p-6">
                <span className="text-sm text-[var(--primary)]">
                  {project.category}
                </span>

                <h3 className="mt-2 text-xl font-semibold">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}