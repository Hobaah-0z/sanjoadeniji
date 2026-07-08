import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { categories, logoMarks, projects } from "@/lib/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Objet Studio" },
      {
        name: "description",
        content:
          "Selected work from Objet Studio — branding, typography, art direction, main titles and product design.",
      },
      { property: "og:title", content: "Projects — Objet Studio" },
      {
        property: "og:description",
        content:
          "Selected work — branding, typography, art direction and moving image.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [caseFilter, setCaseFilter] = useState("All");

  const filtered = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.category === filter),
    [filter],
  );
  const caseStudies = useMemo(
    () =>
      caseFilter === "All"
        ? projects.slice(0, 4)
        : projects.filter((p) => p.category === caseFilter),
    [caseFilter],
  );

  return (
    <>
      <section className="px-6 pt-40 pb-16 md:px-10">
        <h1 className="font-display text-[14vw] uppercase leading-[0.85] md:text-[10vw]">
          Work
        </h1>
        <p className="mt-6 max-w-xl text-sm opacity-70">
          A living index of selected projects — filter by discipline.
        </p>
      </section>

      <FilterBar categories={categories} active={filter} onChange={setFilter} />

      <section className="px-6 pb-32 md:px-10">
        <motion.div layout className="grid gap-x-6 gap-y-16 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                className={
                  i % 5 === 0
                    ? "md:col-span-7"
                    : i % 5 === 1
                      ? "md:col-span-5 md:mt-20"
                      : i % 5 === 2
                        ? "md:col-span-4"
                        : i % 5 === 3
                          ? "md:col-span-8 md:mt-10"
                          : "md:col-span-6"
                }
              >
                <ProjectCard
                  project={p}
                  index={i}
                  aspect={i % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Logo Collection */}
      <section className="border-t border-foreground/10 px-6 py-24 md:px-10">
        <Reveal className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-4xl uppercase md:text-6xl">
            Logo Collection
          </h2>
          <span className="text-xs uppercase tracking-widest opacity-60">
            2018 — 2025
          </span>
        </Reveal>
        <div className="grid grid-cols-3 gap-px bg-foreground/10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {logoMarks.map((m, i) => (
            <div
              key={m.label}
              className="group flex aspect-square flex-col items-center justify-center gap-2 bg-background p-6 transition-colors duration-500 hover:bg-muted"
            >
              <LogoMark index={i} />
              <div className="mt-2 text-center text-[10px] uppercase tracking-widest opacity-60">
                {m.label}
                <br />
                {m.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="border-t border-foreground/10 px-6 pt-24 pb-8 md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl uppercase md:text-6xl">
            Selected Case Studies
          </h2>
        </Reveal>
      </section>
      <FilterBar
        categories={categories}
        active={caseFilter}
        onChange={setCaseFilter}
      />
      <section className="px-6 pb-32 md:px-10">
        <motion.div layout className="grid gap-x-6 gap-y-16 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {caseStudies.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className={i % 2 === 1 ? "md:mt-20" : ""}
              >
                <ProjectCard project={p} index={i} aspect="aspect-[5/4]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}

function FilterBar({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="sticky top-16 z-30 border-y border-foreground/10 bg-background/90 backdrop-blur-md">
      <div className="flex snap-x gap-2 overflow-x-auto px-6 py-4 md:px-10">
        {categories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={`snap-start whitespace-nowrap rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors duration-300 ${
                on
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LogoMark({ index }: { index: number }) {
  const variant = index % 6;
  const common =
    "h-12 w-12 md:h-14 md:w-14 transition-transform duration-500 group-hover:scale-110";
  switch (variant) {
    case 0:
      return (
        <svg viewBox="0 0 40 40" className={common}>
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="4" fill="currentColor" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 40 40" className={common}>
          <rect x="4" y="4" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M4 4 L36 36 M36 4 L4 36" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 40 40" className={common}>
          <path d="M4 32 L20 4 L36 32 Z" fill="currentColor" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 40 40" className={common}>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Anton, Impact, sans-serif"
            fontSize="22"
            fill="currentColor"
          >
            {String.fromCharCode(65 + (index % 26))}
          </text>
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 40 40" className={common}>
          <circle cx="14" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="26" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 40 40" className={common}>
          <path d="M6 6 H34 V14 H14 V26 H34 V34 H6 Z" fill="currentColor" />
        </svg>
      );
  }
}