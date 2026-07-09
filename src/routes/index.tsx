import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Group projects by discipline (category)
  const grouped = projects.reduce<Record<string, typeof projects>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});
  const disciplines = Object.keys(grouped);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-20">
        <div className="max-w-[1600px]">
          <h1 className="font-display text-[16vw] uppercase leading-[0.85] md:text-[11vw]">
            {["OBASANJO", "ADENIJI"].map((line, i) => (
              <motion.span
                key={line}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + i * 0.12,
                }}
                className="block overflow-hidden"
              >
                <span className="block">{line}</span>
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-end justify-between gap-6 text-xs uppercase tracking-widest"
          >
            <div className="flex flex-col gap-1 opacity-70">
              <span>Full-stack Designer</span>
            </div>
            <div className="max-w-md text-sm normal-case tracking-normal opacity-80">
              Objet is a design and art direction practice building identity,
              typographic and moving-image systems for cultural and commercial
              clients since 2018.
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 pb-24 md:px-10">
        <Reveal className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl uppercase md:text-6xl">
            Selected Work
          </h2>
          <Link
            to="/projects"
            className="text-xs uppercase tracking-widest underline underline-offset-4 hover:opacity-60"
          >
            All Projects ↗
          </Link>
        </Reveal>

        <div className="flex flex-col gap-20">
          {disciplines.map((discipline) => {
            const items = grouped[discipline].slice(0, 5);
            return (
              <div key={discipline}>
                <Reveal className="mb-6 flex items-baseline justify-between border-b border-foreground/10 pb-4">
                  <h3 className="font-display text-2xl uppercase md:text-4xl">
                    {discipline}
                  </h3>
                  <span className="text-xs uppercase tracking-widest opacity-60">
                    {items.length} {items.length === 1 ? "Project" : "Projects"}
                  </span>
                </Reveal>
                <div className="-mx-6 overflow-x-auto md:-mx-10">
                  <div className="flex snap-x snap-mandatory gap-6 px-6 pb-4 md:px-10">
                    {items.map((p, i) => (
                      <Reveal
                        key={p.slug}
                        delay={i * 0.06}
                        className="w-[75vw] shrink-0 snap-start sm:w-[45vw] md:w-[30vw] lg:w-[22vw]"
                      >
                        <ProjectCard
                          project={p}
                          index={i}
                          aspect="aspect-[4/5]"
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-y border-foreground/10 px-6 py-32 md:px-10">
        <Reveal>
          <p className="font-display max-w-[1400px] text-4xl uppercase leading-[1.05] md:text-7xl">
            We build identity systems, typefaces and moving image for brands
            that value restraint, craft and the long view.
          </p>
        </Reveal>
      </section>
    </>
  );
}
