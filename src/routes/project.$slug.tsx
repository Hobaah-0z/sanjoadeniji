import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProject, nextProject } from "@/lib/projects";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Objet Studio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — ${project.client}`;
    return {
      meta: [
        { title: `${title} · Objet Studio` },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:image", content: project.image },
        { name: "twitter:image", content: project.image },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="font-display text-4xl uppercase">Project not found</p>
    </div>
  ),
});

function ProjectPage() {
  const { project, next } = Route.useLoaderData();

  return (
    <>
      <section className="relative h-[92vh] w-full overflow-hidden bg-muted">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            muted
            autoPlay
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        )}
      </section>

      <section className="px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <h1 className="font-display text-[14vw] uppercase leading-[0.85] md:text-[9vw]">
                {project.title}
              </h1>
            </Reveal>
          </div>
          <div className="space-y-6 md:col-span-4">
            <Meta label="Client" value={project.client} />
            <Meta label="Discipline" value={project.category} />
            <Meta label="Year" value={String(project.year)} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest opacity-60">
              Overview
            </p>
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.05}>
            <p className="text-2xl leading-snug md:text-3xl">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      {project.gallery.map((src: string, i: number) => (
        <section key={src + i} className={i % 2 === 0 ? "" : "px-6 md:px-10"}>
          {i % 2 === 0 ? (
            <Reveal>
              <img src={src} alt="" className="h-[80vh] w-full object-cover" />
            </Reveal>
          ) : (
            <div className="grid gap-8 pb-24 md:grid-cols-12">
              <Reveal className="md:col-span-7">
                <img
                  src={src}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </Reveal>
              <Reveal className="md:col-span-5 md:pt-24" delay={0.05}>
                <p className="text-lg leading-relaxed opacity-80">
                  A note on the work. Objet approaches each brief as a series
                  of small decisions — grid, weight, gesture — that add up to
                  a coherent whole.
                </p>
              </Reveal>
            </div>
          )}
        </section>
      ))}

      {/* Next */}
      <section className="border-t border-foreground/10 px-6 py-24 md:px-10">
        <Reveal className="mb-8 flex items-end justify-between">
          <span className="text-xs uppercase tracking-widest opacity-60">
            Next Project
          </span>
          <span className="text-xs uppercase tracking-widest opacity-60">
            {next.category} — {next.year}
          </span>
        </Reveal>
        <ProjectCard project={next} aspect="aspect-[16/9]" />
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-foreground pt-3">
      <p className="text-xs uppercase tracking-widest opacity-60">{label}</p>
      <p className="mt-1 text-lg">{value}</p>
    </div>
  );
}