import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Objet Studio" },
      { name: "description", content: "Get in touch with Objet Studio about new projects, collaborations and press." },
      { property: "og:title", content: "Contact — Objet Studio" },
      { property: "og:description", content: "New projects, collaborations and press." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 py-40 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest opacity-60">Contact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display mt-6 text-[16vw] uppercase leading-[0.85] md:text-[10vw]">
            Let's talk.
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <a
            href="mailto:studio@objet.co"
            data-cursor="view"
            className="group inline-block text-3xl md:text-5xl"
          >
            studio@objet.co
            <span className="mt-1 block h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
          </a>
        </Reveal>

        <Reveal delay={0.15} className="mt-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-8"
          >
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Message" name="message" textarea />
            <div>
              <motion.button
                type="submit"
                whileHover={{ x: 6 }}
                className="font-display text-3xl uppercase md:text-5xl"
                data-cursor="view"
              >
                {sent ? "Sent →" : "Send →"}
              </motion.button>
            </div>
          </form>
        </Reveal>

        <div className="mt-24 grid gap-8 border-t border-foreground/10 pt-8 text-xs uppercase tracking-widest opacity-60 md:grid-cols-3">
          <div>Rua da Boavista 84<br />1200-070 Lisbon</div>
          <div>Mon — Fri, 09:00 — 18:00 WET</div>
          <div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="group block">
      <span className="text-xs uppercase tracking-widest opacity-60">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          className="mt-2 block w-full border-b border-foreground/30 bg-transparent py-3 text-lg outline-none transition-colors duration-300 focus:border-foreground"
        />
      ) : (
        <input
          type={type}
          name={name}
          required
          className="mt-2 block w-full border-b border-foreground/30 bg-transparent py-3 text-lg outline-none transition-colors duration-300 focus:border-foreground"
        />
      )}
    </label>
  );
}