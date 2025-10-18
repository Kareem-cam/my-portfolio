// App.js — Brittany-style layout/colors/animations (no resume button)
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- helpers ---------- */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.4 },
});
const hoverTap = { whileHover: { y: -2 }, whileTap: { y: 0 } };

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 32;
  window.scrollTo({ top: y, behavior: "smooth" });
};

/* ---------- icons ---------- */
const Icon = {
  Github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.05-1.61-4.05-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.84 2.8 1.31 3.48 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.55.12-3.23 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.68.24 2.92.12 3.23.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
    </svg>
  ),
  Linkedin: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4.98 3.5C3.87 3.5 3 4.37 3 5.48s.87 1.98 1.98 1.98c1.1 0 1.98-.87 1.98-1.98S6.08 3.5 4.98 3.5zM3.5 8.98h2.96V21H3.5zM9.5 8.98h2.84v1.64h.04c.4-.77 1.38-1.58 2.84-1.58 3.04 0 3.6 2 3.6 4.61V21h-2.96v-4.43c0-1.06-.02-2.41-1.47-2.41-1.48 0-1.71 1.15-1.71 2.33V21H9.5z" />
    </svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-2.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
    </svg>
  ),
  Discord: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20 4a16 16 0 0 0-4-.93l-.2.4A13 13 0 0 1 12 4c-1.28 0-2.54-.18-3.8-.53l-.2-.4A16 16 0 0 0 4 4C2.38 6.41 1.57 8.73 1.34 11.02c.37 4.13 2.77 6.6 5.62 8l.45-.78c-.92-.35-1.75-.87-2.47-1.54.2.15.41.29.63.42 2.3 1.35 4.6 1.64 6.43 1.64s4.12-.29 6.43-1.64c.22-.13.43-.27.63-.42-.72.67-1.55 1.19-2.47 1.54l.45.78c2.85-1.4 5.25-3.87 5.62-8C22.43 8.73 21.62 6.41 20 4ZM9.35 14.5c-.66 0-1.2-.66-1.2-1.47 0-.81.53-1.47 1.2-1.47.66 0 1.2.66 1.2 1.47 0 .81-.53 1.47-1.2 1.47Zm5.3 0c-.66 0-1.2-.66-1.2-1.47 0-.81.54-1.47 1.2-1.47.67 0 1.2.66 1.2 1.47 0 .81-.53 1.47-1.2 1.47Z" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  ),
};

/* ---------- thin card ---------- */
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${className}`}>{children}</div>
);

/* ---------- active section (for left menu underline) ---------- */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
};

/* ============================== */
/* ============ APP ============= */
/* ============================== */
export default function App() {
  const sections = ["about", "experience", "projects", "contact"];
  const active = useActiveSection(sections);

  return (
    <div className="relative min-h-screen text-slate-200">
      {/* background gradient like Brittany */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[#0b1220] via-[#0b1526] to-[#0a111c]" />
      <div className="pointer-events-none fixed -z-10 inset-0">
        <div className="absolute -top-48 -left-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 md:px-8 lg:grid-cols-12">
        {/* LEFT PANEL (sticky) */}
        <aside className="lg:col-span-5 py-16 lg:sticky lg:top-0 lg:h-screen flex flex-col">
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Kareem Haddad
            </motion.h1>
            <motion.h2 className="mt-2 text-xl font-semibold text-slate-300" {...fadeUp(0.05)}>
              Front-End & Automation Engineer
            </motion.h2>
            <motion.p className="mt-3 max-w-md text-slate-400" {...fadeUp(0.1)}>
              I build clean, fast interfaces and Discord automations that make operations calmer and fair. I focus on
              reliability, performance, and small details that make the web feel effortless.
            </motion.p>
          </div>

          {/* Left nav with animated underline */}
          <nav className="mt-10">
            <ul className="space-y-4 text-sm tracking-wider">
              {sections.map((id) => (
                <li key={id} className="relative">
                  <button
                    onClick={() => scrollToId(id)}
                    className={`group inline-flex items-center gap-4 text-left uppercase ${
                      active === id ? "text-emerald-300" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`h-px w-10 transition-all ${
                        active === id ? "bg-emerald-300 w-16" : "bg-slate-500/40 group-hover:w-16"
                      }`}
                    />
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* socials bottom-left */}
          <div className="mt-auto pt-10 flex items-center gap-4 text-slate-400">
            <a href="https://github.com/Kareem-cam" target="_blank" rel="noreferrer" className="hover:text-slate-200">
              <Icon.Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/kareem-haddad-4136a3287/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200"
            >
              <Icon.Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/kareemmmm___/" target="_blank" rel="noreferrer" className="hover:text-slate-200">
              <Icon.Instagram className="h-5 w-5" />
            </a>
            <span className="inline-flex items-center gap-2">
              <Icon.Discord className="h-5 w-5" /> <span className="text-xs">cam1p</span>
            </span>
          </div>
        </aside>

        {/* RIGHT COLUMN (content) */}
        <section className="lg:col-span-7 py-16 space-y-24">
          {/* ABOUT */}
          <motion.section id="about" {...fadeUp(0)}>
            <div className="prose prose-invert max-w-none text-slate-300">
              <p>
                I’m a developer who enjoys the intersection of tidy UI and robust engineering. Recently I’ve been
                building Discord tooling for order operations: queues that feel fair to workers, ticketing that stays
                organized under load, and small dashboards that surface the right info at the right time.
              </p>
              <p>
                When I’m not coding, I’m usually polishing micro-interactions, tuning rate limits, or refactoring for
                reliability. Tools I like: React, Tailwind, Framer Motion, Node, and Python.
              </p>
            </div>
          </motion.section>

          {/* EXPERIENCE */}
          <motion.section id="experience" {...fadeUp(0)}>
            <h3 className="mb-6 text-lg font-semibold text-slate-200">Experience</h3>
            <Card>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h4 className="text-slate-100 font-semibold">Freelance — Full-Stack & Automation</h4>
                  <p className="mt-2 text-slate-400">
                    Built Discord bots and small web apps for order workflows, emphasizing accessibility, performance,
                    and operational calm.
                  </p>
                </div>
                <span className="text-xs text-slate-500">2024 — Present</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "React", "Node", "Tailwind", "Framer Motion"].map((t) => (
                  <span key={t} className="rounded-full bg-emerald-400/10 text-emerald-200/90 border border-emerald-400/20 px-2.5 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* PROJECTS */}
          <motion.section id="projects" {...fadeUp(0)}>
            <h3 className="mb-6 text-lg font-semibold text-slate-200">Projects</h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Ticket Bot */}
              <motion.div {...hoverTap}>
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Ticket Bot — Orders & Mass-Clear</h4>
                  <p className="mt-2 text-slate-400">
                    Ticketing system purpose-built for busy order servers. Staff can{" "}
                    <span className="text-slate-200">mass-clear tickets</span> safely, claim/close with transcripts,
                    and enforce role-based permissions. Designed for high throughput during rushes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Node", "Discord API", "Transcripts", "Role gating", "Rate limits"].map((t) => (
                      <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Queue Bot (workers queue) */}
              <motion.div {...hoverTap}>
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Queue Bot — Fair Worker Routing</h4>
                  <p className="mt-2 text-slate-400">
                    Workers join the queue (not customers). When a new order arrives,{" "}
                    <span className="text-slate-200">the next worker in line</span> automatically gets the ticket,
                    ensuring fair distribution and preventing overload.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Node", "Discord API", "Slash commands", "Redis/JSON store", "Metrics"].map((t) => (
                      <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Count Bot (orders leaderboard) */}
              <motion.div {...hoverTap}>
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Count Bot — Orders Leaderboard</h4>
                  <p className="mt-2 text-slate-400">
                    Tracks how many orders each worker completes and displays a live{" "}
                    <span className="text-slate-200">leaderboard</span>. Prevents spam/doubles and keeps clean audit
                    logs so performance reviews are simple.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Node", "Discord API", "Anti-spam", "Audit logs"].map((t) => (
                      <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Uber Eats Estimator */}
              <motion.div {...hoverTap}>
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Uber Eats Estimator — Cart Lock & Fees</h4>
                  <p className="mt-2 text-slate-400">
                    Parses group-order links, detects locked carts, and estimates totals with taxes, fees, and applied
                    promos. Cuts guesswork before checkout.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Playwright/Puppeteer", "Automation", "Node"].map((t) => (
                      <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* CONTACT */}
          <motion.section id="contact" {...fadeUp(0)}>
            <h3 className="mb-6 text-lg font-semibold text-slate-200">Contact</h3>
            <Card>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:kareem12345h@gmail.com"
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <Icon.Mail className="h-5 w-5 text-emerald-300" />
                  kareem12345h@gmail.com
                </a>
                <a
                  href="https://github.com/Kareem-cam"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <Icon.Github className="h-5 w-5 text-emerald-300" />
                  github.com/Kareem-cam
                </a>
                <a
                  href="https://www.linkedin.com/in/kareem-haddad-4136a3287/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <Icon.Linkedin className="h-5 w-5 text-emerald-300" />
                  linkedin.com/in/kareem-haddad
                </a>
                <div className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3">
                  <Icon.Discord className="h-5 w-5 text-emerald-300" />
                  cam1p
                </div>
              </div>
            </Card>
          </motion.section>

          <p className="pb-10 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Kareem Haddad — Built with React, Tailwind & Framer Motion
          </p>
        </section>
      </main>
    </div>
  );
}
