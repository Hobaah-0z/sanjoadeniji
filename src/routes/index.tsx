import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import heroBg from "@/assets/hero-bg.jpg.asset.json";


export const Route = createFileRoute("/")({
  component: Index,
});

function DisciplineRow({
  discipline,
  items,
}: {
  discipline: string;
  items: (typeof projects)[number][];
}) {
  const scrollRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <div>
      <Reveal className="mb-5 flex items-baseline justify-between border-b border-foreground/10 pb-4 md:mb-6">
        <h3 className="font-display text-3xl uppercase md:text-4xl">
          {discipline}
        </h3>
        <span className="text-xs uppercase tracking-widest opacity-60 md:text-sm">
          {items.length} {items.length === 1 ? "Project" : "Projects"}
        </span>
      </Reveal>
      <div
        ref={scrollRef}
        className="project-row -mx-4 overflow-x-auto scrollbar-hide md:-mx-10"
      >

        <div className="flex snap-x snap-mandatory gap-4 px-4 pb-4 md:gap-8 md:px-10">
          {items.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className="w-[92vw] shrink-0 snap-start sm:w-[65vw] md:w-[45vw] lg:w-[35vw]"
            >
              <ProjectCard project={p} index={i} aspect="aspect-[3/4] md:aspect-[4/5]" />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <section className="relative flex h-screen min-h-[720px] flex-col justify-between overflow-hidden pt-20 md:pt-24">
        {/* Background image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <img
            src={heroBg.url}
            alt="Cinematic portrait of Obasanjo Adeniji"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Subtle overlay for legibility */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/40" />

        {/* Role labels */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 md:px-10">
          <h2 className="font-display text-center uppercase leading-[0.95] text-white mix-blend-difference text-[4vw] md:text-[2.5vw]">
            {["Creative Director", "Digital Designer", "Art Direction"].map(
              (line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ),
            )}
          </h2>
        </div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl px-6 pb-6 text-center text-sm leading-relaxed text-white/80 md:px-10 md:text-base"
        >
          Obasanjo Adeniji works at the intersection of design, engineering, and
          visual culture — balancing roles as a full-stack designer, art
          director, and researcher. His practice blends clarity with
          experimentation, shaping identities and interfaces that resonate
          across cultural and commercial landscapes.
        </motion.p>

        {/* Giant name */}
        <div className="relative z-10 w-full overflow-hidden">
          <motion.h1
            initial={{ y: "20%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="font-display flex w-full items-start justify-center gap-[1vw] whitespace-nowrap px-4 uppercase leading-[0.85] text-[10.8vw] text-white md:px-6"
          >
            <span>Obasanjo Adeniji</span>
            <span className="mt-[0.5vw] text-[2.6vw]">®</span>
          </motion.h1>
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
          {disciplines.map((discipline) => (
            <DisciplineRow
              key={discipline}
              discipline={discipline}
              items={grouped[discipline].slice(0, 6)}
            />
          ))}
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
