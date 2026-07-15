import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-foreground/50">
          Let's Connect
        </p>

        <h2 className="font-display max-w-5xl text-5xl uppercase leading-[0.95] md:text-8xl">
          Let's build something meaningful.
        </h2>

        <a
          href="mailto:obasanja4@gmail.com"
          className="mt-12 inline-block text-xl underline underline-offset-8 transition-opacity hover:opacity-60 md:text-3xl"
        >
          obasanja4@gmail.com
        </a>

        <div className="mt-24 grid gap-12 border-t border-foreground/10 pt-10 md:grid-cols-2">
          <div>
            <Link
              to="/"
              className="font-display text-4xl uppercase leading-none"
            >
              Obasanjo
              <br />
              Adeniji
            </Link>

            <p className="mt-4 max-w-sm text-foreground/60">
              Brand Identity, Product Design, Motion Design and Creative
              Direction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
                Elsewhere
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.behance.net/adenijiemmanuel"
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-opacity hover:opacity-60"
                >
                  Behance ↗
                </a>

                <a
                  href="https://x.com/Hobeejay_grafix"
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-opacity hover:opacity-60"
                >
                  X ↗
                </a>

                <a
                  href="https://www.instagram.com/hobeejay_graphics/"
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-opacity hover:opacity-60"
                >
                  Instagram ↗
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
                Services
              </p>

              <div className="space-y-3 text-foreground/70">
                <p>Brand Identity</p>
                <p>Product Design</p>
                <p>Creative Direction</p>
                <p>Motion Design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-foreground/10 pt-6 text-sm text-foreground/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Obasanjo Adeniji</span>

          <span>Designed & Developed by Obasanjo Adeniji</span>
        </div>
      </div>
    </footer>
  );
}