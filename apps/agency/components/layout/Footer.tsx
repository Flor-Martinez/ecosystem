export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-semibold text-gray-900">FM.</span>
          <span className="ml-2">Flor Martinez — Agencia</span>
        </div>

        <p>© {new Date().getFullYear()} Flor Martinez. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}