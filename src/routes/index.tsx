import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { RotatingText } from "@/components/site/RotatingText";
import { InteractiveText } from "@/components/site/InteractiveText";
import { About } from "@/components/site/About";
import { Previously } from "@/components/site/Previously";
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
      <Reveal className="mb-8 flex items-end justify-between border-b border-foreground/10 pb-6 md:mb-10">
        <div>
  <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-foreground/40">
    Featured
  </span>

  <h3 className="font-display text-3xl uppercase md:text-5xl">
    {discipline}
  </h3>
</div>
        <span className="text-sm uppercase tracking-[0.2em] text-foreground/40">
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

function Index() {const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const rotateX = useSpring(
  useTransform(mouseY, [-200, 200], [4, -4]),
  {
    stiffness: 120,
    damping: 18,
  }
);

const rotateY = useSpring(
  useTransform(mouseX, [-200, 200], [-4, 4]),
  {
    stiffness: 120,
    damping: 18,
  }
);

const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  mouseX.set(e.clientX - rect.left - rect.width / 2);
  mouseY.set(e.clientY - rect.top - rect.height / 2);
};

const handleLeave = () => {
  mouseX.set(0);
  mouseY.set(0);
};

  // Group projects by discipline (category)
  const featuredCategories = [
  "Branding",
  "Product",
  "Art Direction",
];

const grouped = projects.reduce<Record<string, typeof projects>>((acc, p) => {
  (acc[p.category] ||= []).push(p);
  return acc;
}, {});

const disciplines = featuredCategories.filter(
  (category) => grouped[category]?.length
);

  return (
    <>
      {/* HERO */}
      <section className="relative flex h-screen min-h-[720px] flex-col items-center justify-center overflow-hidden pt-20 md:pt-24">
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

        {/* Centered hero content: roles → name → bio */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Role labels */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-10 font-display text-center uppercase leading-[0.95] text-white mix-blend-difference text-[4vw] md:mb-14 md:text-[2.5vw]"
          >
            <RotatingText
  words={[
    "Creative Director",
    "Brand Strategist",
    "Creative Lead",
    "Art Director",
  ]}
  interval={2500}
/>

<RotatingText
  words={[
    "Digital Designer",
    "Motion Designer",
    "Product Designer",
    "UI Designer",
  ]}
  interval={3200}
/>

<RotatingText
  words={[
    "Art Direction",
    "Illustrator",
    "Logo Designer",
    "Visual Storytelling",
  ]}
  interval={3900}
/>
          </motion.h2>

          {/* Giant name */}
          <div
  className="mb-8 w-full overflow-hidden md:mb-10"
  onMouseMove={handleMove}
  onMouseLeave={handleLeave}
>
            <motion.h1
  style={{
  rotateX,
  rotateY,
  scale: 1.01,
  transformPerspective: 1200,
}}
              initial={{ y: "20%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="font-display flex w-full items-start justify-center gap-[1vw] whitespace-nowrap px-4 uppercase leading-[0.85] text-[10.8vw] text-white md:px-6"
            >
              <InteractiveText
  text="OBASANJO ADENIJI"
/>
              <span className="mt-[0.5vw] text-[2.6vw]">®</span>
            </motion.h1>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mx-auto max-w-4xl px-6 text-center text-sm leading-relaxed text-white/80 md:px-10 md:text-base"
          >
            Obasanjo Adeniji works at the intersection of design, engineering, and
            visual culture — balancing roles as a full-stack designer, art
            director, and researcher. His practice blends clarity with
            experimentation, shaping identities and interfaces that resonate
            across cultural and commercial landscapes.
          </motion.p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 pb-24 md:px-10">
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-foreground/50">
    Portfolio
  </p>

  <h2 className="font-display text-4xl uppercase md:text-6xl">
    Selected Work
  </h2>
</div>
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
      <About />
      <Previously />

      {/* STATEMENT */}
      {/* PHILOSOPHY */}
<section className="border-y border-foreground/10 px-6 py-36 md:px-10">
  <Reveal>

    <p className="mb-6 text-xs uppercase tracking-[0.3em] text-foreground/50">
      Philosophy
    </p>

    <h2 className="font-display max-w-6xl text-5xl uppercase leading-[0.95] md:text-8xl">
      Great design isn't decoration.
      <br />
      It's how people understand,
      trust and remember a brand.
    </h2>

    <p className="mt-10 max-w-3xl text-lg leading-relaxed text-foreground/70">
      Every project starts with understanding people before pixels.
      My goal is to create work that feels timeless, communicates
      clearly and solves real business problems, not just looks good.
    </p>

  </Reveal>
</section>
    </>
  );
}
