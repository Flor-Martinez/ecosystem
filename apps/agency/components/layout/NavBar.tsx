import Link from 'next/link';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Portfolio', href: '#portfolio' },
];

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
        <Link
          href="#inicio"
          className="text-xl font-bold tracking-tight"
        >
          FM<span className="text-[var(--primary)]">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-[var(--primary)]"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contacto"
            className="rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Hablemos
          </Link>
        </nav>
      </div>
    </header>
  );
}