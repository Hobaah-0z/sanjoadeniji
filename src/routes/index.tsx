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
  const featured = projects.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-20">
        <div className="max-w-[1600px]">
          <h1 className="font-display text-[16vw] uppercase leading-[0.85] md:text-[11vw]">
            {["An independent", "creative studio", "for the modern brand."].map(
              (line, i) => (
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
              ),
            )}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-end justify-between gap-6 text-xs uppercase tracking-widest"
          >
            <div className="flex flex-col gap-1 opacity-70">
              <span>Based in Lisbon</span>
              <span>Working worldwide</span>
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

        <div className="grid gap-x-6 gap-y-16 md:grid-cols-12">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className={
                i % 4 === 0
                  ? "md:col-span-7"
                  : i % 4 === 1
                    ? "md:col-span-5 md:mt-24"
                    : i % 4 === 2
                      ? "md:col-span-5"
                      : "md:col-span-7 md:mt-24"
              }
            >
              <ProjectCard
                project={p}
                index={i}
                aspect={i % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-y border-black/10 px-6 py-32 md:px-10">
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
