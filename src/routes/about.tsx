import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Objet Studio" },
      {
        name: "description",
        content:
          "Objet is an independent design and art direction practice based in Lisbon, working on brand systems, typography and moving image.",
      },
      { property: "og:title", content: "About — Objet Studio" },
      {
        property: "og:description",
        content:
          "A small studio building considered brand systems, typography and moving image.",
      },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Ines Marques", role: "Founder, Design Director" },
  { name: "Tomás Reis", role: "Type Designer" },
  { name: "Alma Costa", role: "Art Director" },
  { name: "Bruno Lima", role: "Motion Designer" },
];

const process = [
  { n: "01", t: "Listen", d: "We start with a long conversation and a short brief. Ambition, constraints, timeline." },
  { n: "02", t: "Research", d: "We look at the field, the archive and the object itself. We write before we draw." },
  { n: "03", t: "Design", d: "One direction, deeply resolved. We show fewer options with more confidence." },
  { n: "04", t: "Deliver", d: "Systems, guidelines, and the working files. Built to be handed off and lived with." },
];

function AboutPage() {
  return (
    <>
      <section className="px-6 pt-40 pb-24 md:px-10">
        <Reveal>
          <p className="font-display max-w-[1400px] text-4xl uppercase leading-[1.05] md:text-7xl">
            Objet is a small, independent studio building brand, typographic
            and moving-image systems for clients that value the long view.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-black/10 px-6 py-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="text-xs uppercase tracking-widest opacity-60">
              Practice
            </h2>
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed md:col-span-8">
            <Reveal as="p">
              We were founded in 2018 in Lisbon and now work with cultural
              institutions, publishers, and independent brands across Europe
              and North America.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              Our practice sits between graphic design, type design and art
              direction. We think of every project as an object — something
              that has to hold together in the hand, on the page and on the
              screen.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              We work in small teams, in long relationships, and we say no
              more often than we say yes.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-6 py-24 md:px-10">
        <Reveal className="mb-12">
          <h2 className="font-display text-4xl uppercase md:text-6xl">Process</h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.06}>
              <div className="border-t border-black pt-6">
                <span className="text-xs uppercase tracking-widest opacity-60">
                  {p.n}
                </span>
                <h3 className="font-display mt-3 text-3xl uppercase">{p.t}</h3>
                <p className="mt-3 text-sm opacity-80">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 px-6 py-24 md:px-10">
        <Reveal className="mb-12">
          <h2 className="font-display text-4xl uppercase md:text-6xl">Team</h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.05}>
              <div className="aspect-[4/5] bg-neutral-100" />
              <p className="font-display mt-4 text-2xl uppercase">{m.name}</p>
              <p className="text-xs uppercase tracking-widest opacity-60">
                {m.role}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}