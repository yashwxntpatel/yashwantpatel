import { useState, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const Nav = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen(p => !p), []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="container-luxe">
        <nav className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}>

          {/* LOGO / AVATAR */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="relative flex h-8 w-8 rounded-full overflow-hidden ring-1 ring-accent/40 shadow-glow flex-shrink-0">
              <img
                src="/avatar.jpg"
                alt="Yashwant Patel"
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
              />
            </span>
            <span className="font-medium tracking-tight hidden sm:inline">Yashwant Patel</span>
          </a>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA BUTTON */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Let's talk <span className="text-xs" aria-hidden="true">→</span>
          </a>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-px bg-foreground origin-center block" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-px bg-foreground block" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-px bg-foreground origin-center block" />
            </div>
          </button>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl hover:bg-foreground/5 text-sm"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
});

Nav.displayName = "Nav";
