import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !onHome;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? -100 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "bg-background/90 backdrop-blur-md border-b border-foreground/10" : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          <Link to="/" className="font-display text-2xl uppercase" data-cursor="view">
            Objet<span className="align-super text-[10px]">®</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm uppercase tracking-wider transition-opacity hover:opacity-60"
                activeProps={{ className: "underline underline-offset-4" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://shop.example.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-wider transition-opacity hover:opacity-60"
            >
              Shop ↗
            </a>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-sm uppercase tracking-wider hover:opacity-60"
            >
              IG
            </a>
            <span className="text-sm uppercase tracking-wider opacity-60">Lisbon, PT</span>
            <ThemeToggle />
          </div>

          <button
            aria-label="Menu"
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${
                open ? "-translate-y-0.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-6 px-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={l.to} className="font-display block text-6xl uppercase">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://shop.example.com"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-display block text-6xl uppercase"
              >
                Shop ↗
              </motion.a>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-10 flex justify-between text-xs uppercase tracking-widest opacity-60"
              >
                <span>Lisbon, PT</span>
                <div className="flex gap-6">
                  <ThemeToggle className="opacity-100" />
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}