import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
// import portrait from "@/assets/about-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About — Obasanjo Adeniji",
      },
      {
        name: "description",
        content:
          "Learn more about Obasanjo Adeniji, a multidisciplinary designer specializing in branding, product design, motion design and creative direction.",
      },
      {
        property: "og:title",
        content: "About — Obasanjo Adeniji",
      },
      {
        property: "og:description",
        content:
          "Designer creating brands, products and digital experiences.",
      },
    ],
  }),
  component: AboutPage,
});

const experience = [
  {
    company: "Polkadot Africa",
    role: "Creative Designer",
  },
  {
    company: "Radius",
    role: "Visual Designer",
  },
  {
    company: "Hyperbridge",
    role: "Visual Designer",
  },
];

const clients = [
  "Polkadot Africa",
  "Radius",
  "Hyperbridge",
  "Lendsqr",
  "Pay4Me",
  "AVMS",
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-36">
        <Reveal>
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-foreground/50">
            About
          </p>

          <h1 className="font-display text-6xl uppercase leading-[0.9] md:text-[9vw]">
            Obasanjo
            <br />
            Adeniji
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
            Multidisciplinary designer creating brands, digital products and
            visual experiences through strategy, storytelling and thoughtful
            execution.
          </p>
        </Reveal>
      </section>

      {/* PORTRAIT */}
      <section className="px-6 pb-32 md:px-10">
        <Reveal>
          <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-200 dark:bg-neutral-800">

            {/* Replace with your portrait */}

            {/*
            <img
              src={portrait}
              alt="Obasanjo Adeniji"
              className="h-full w-full object-cover"
            />
            */}

          </div>
        </Reveal>
      </section>

      {/* BIO */}
      <section className="border-t border-foreground/10 px-6 py-32 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">

          <Reveal className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
              Who I Am
            </p>
          </Reveal>

          <div className="space-y-10 md:col-span-9">

            <Reveal>
              <p className="max-w-5xl text-3xl leading-[1.35] md:text-[2.5rem]">
                I'm Obasanjo Adeniji, a multidisciplinary designer creating
                brands, digital products and visual experiences that balance
                strategy, clarity and craftsmanship.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-3xl text-lg leading-relaxed text-foreground/70">
                Over the past four years I've worked across branding, product
                design, motion design and creative direction, collaborating
                with startups and global teams in fintech, Web3,
                entertainment and technology.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-3xl text-lg leading-relaxed text-foreground/70">
                I enjoy solving complex problems through thoughtful design,
                building systems that not only look beautiful but help
                businesses communicate clearly and grow confidently.
              </p>
            </Reveal>

          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="border-t border-foreground/10 px-6 py-32 md:px-10">

        <div className="grid gap-16 md:grid-cols-12">

          <Reveal className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
              Experience
            </p>
          </Reveal>

          <div className="md:col-span-9">

            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08}>

                <div className="group flex items-center justify-between border-b border-foreground/10 py-8 transition-all duration-500 hover:border-foreground hover:pl-4">

                  <h3 className="font-display text-2xl uppercase md:text-3xl">
                    {job.company}
                  </h3>

                  <div className="flex items-center gap-4">

                    <p className="text-sm uppercase tracking-[0.25em] text-foreground/50 transition-colors duration-300 group-hover:text-foreground">
                      {job.role}
                    </p>

                    <span className="translate-x-[-10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>

                  </div>

                </div>

              </Reveal>
            ))}

          </div>

        </div>

      </section>
            {/* SELECTED CLIENTS */}
      <section className="border-t border-foreground/10 px-6 py-32 md:px-10">

        <div className="grid gap-16 md:grid-cols-12">

          <Reveal className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
              Selected Clients
            </p>
          </Reveal>

          <Reveal className="md:col-span-9">
            <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3">

              {clients.map((client, i) => (
                <div
                  key={client}
                  className="group cursor-default"
                >
                  <h3 className="font-display text-2xl uppercase opacity-60 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 md:text-3xl">
                    {client}
                  </h3>
                </div>
              ))}

            </div>
          </Reveal>

        </div>

      </section>

    </>
  );
}