import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  aspect = "aspect-[4/5]",
  index = 0,
}: {
  project: Project;
  aspect?: string;
  index?: number;
}) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    setHover(true);
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setHover(false);
    videoRef.current?.pause();
  };

  return (
    <Link
      to="/project/$slug"
      params={{ slug: project.slug }}
      data-cursor="view"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group block"
    >
      <div className={`relative overflow-hidden bg-neutral-100 ${aspect}`}>
        <img
          src={project.image}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[600ms] ease-out group-hover:scale-[1.03] ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        />
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-out ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 overflow-hidden md:mt-5 md:gap-4">
        <h3
          className={`font-display text-3xl uppercase transition-transform duration-500 ease-out md:text-4xl ${
            hover ? "-translate-y-0.5" : ""
          }`}
        >
          {project.title}
        </h3>
        <span className="shrink-0 text-xs uppercase tracking-widest opacity-60 md:text-sm">
          {project.category} — {project.year}
        </span>
      </div>
    </Link>
  );
}