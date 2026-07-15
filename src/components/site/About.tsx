
export function About() {
  return (
    <section className="px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-foreground/50">
          About
        </p>

        <div className="aspect-[16/10] w-full rounded-3xl bg-neutral-200 dark:bg-neutral-800" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">

          <h2 className="font-display text-5xl uppercase leading-none md:text-7xl">
            Designing brands,
            products and
            experiences.
          </h2>

          <div>

            <p className="text-lg leading-relaxed text-foreground/75">
              I'm Obasanjo Adeniji, a multidisciplinary designer creating
              visual identities, digital products and creative systems that
              bridge strategy with thoughtful execution.
            </p>

            <p className="mt-8 text-lg leading-relaxed text-foreground/75">
              My work spans fintech, Web3, entertainment and technology,
              partnering with ambitious teams to transform ideas into
              memorable experiences.
            </p>

            <a
              href="#"
              className="mt-10 inline-block uppercase tracking-[0.2em] underline underline-offset-4"
            >
              View Resume ↗
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}