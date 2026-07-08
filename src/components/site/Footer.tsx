import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background px-6 py-16 md:px-10">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-5xl uppercase leading-none">
            Objet<span className="align-super text-sm">®</span>
          </Link>
          <p className="mt-4 text-xs uppercase tracking-widest opacity-60">
            Independent creative studio
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest opacity-60">Studio</p>
          <p className="text-sm">
            Rua da Boavista 84<br />
            1200-070 Lisbon, Portugal
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest opacity-60">Contact</p>
          <a href="mailto:studio@objet.co" className="text-sm underline underline-offset-4">
            studio@objet.co
          </a>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest opacity-60">Elsewhere</p>
          <div className="flex flex-col gap-1 text-sm">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href="https://are.na" target="_blank" rel="noreferrer">
              Are.na ↗
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-2 border-t border-foreground/10 pt-6 text-xs uppercase tracking-widest opacity-60 md:flex-row">
        <span>© {new Date().getFullYear()} Objet Studio</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}