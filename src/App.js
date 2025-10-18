// App.js
import { motion } from "framer-motion";

/* ---------- small animation helpers ---------- */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true },
});
const hoverTap = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } };

/* ---------- smooth scroll with header offset ---------- */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
};

/* ---------- icons ---------- */
const Icon = {
  Github: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.05-1.61-4.05-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.84 2.8 1.31 3.48 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.55.12-3.23 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.68.24 2.92.12 3.23.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
    </svg>
  ),
  Linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C3.87 3.5 3 4.37 3 5.48s.87 1.98 1.98 1.98c1.1 0 1.98-.87 1.98-1.98S6.08 3.5 4.98 3.5zM3.5 8.98h2.96V21H3.5zM9.5 8.98h2.84v1.64h.04c.4-.77 1.38-1.58 2.84-1.58 3.04 0 3.6 2 3.6 4.61V21h-2.96v-4.43c0-1.06-.02-2.41-1.47-2.41-1.48 0-1.71 1.15-1.71 2.33V21H9.5z" />
    </svg>
  ),
  Mail: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  ),
  External: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    </svg>
  ),
};

/* ---------- card ---------- */
const Card = ({ children, className = "" }) => (
  <div className={"rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-sm p-6 " + className}>
    {children}
  </div>
);

/* ============================== */
/* ============ APP ============= */
/* ============================== */

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      {/* NAV — minimal, resume-style (emerald/teal accents) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0f14]/70 border-b border-white/10">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollToId("intro")}
            className="font-semibold tracking-wide hover:text-emerald-300 transition"
          >
            Kareem<span className="text-white/60">.dev</span>
          </button>

          <ul className="flex gap-6 text-sm">
            {[
              ["About", "about"],
              ["Experience", "experience"],
              ["Projects", "projects"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <motion.li key={id} {...hoverTap}>
                <a
                  href={`#${id}`}
                  className="hover:text-emerald-300 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(id);
                  }}
                >
                  {label}
                </a>
              </motion.li>
            ))}
            <li>
              {/* drop a resume.pdf in /public to enable */}
              <a
                className="rounded-lg border border-emerald-500/30 px-3 py-1.5 text-sm hover:bg-emerald-500/10 transition"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Résumé
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* INTRO — text only (removed the image) */}
      <section id="intro" className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-emerald-300">Kareem Haddad</span>
        </motion.h1>

        <motion.p className="mt-4 max-w-2xl text-white/80" {...fade(0.05)}>
          17-year-old software engineer focused on reverse engineering and pragmatic full-stack work.
          I build fast, reliable tools with React, Node, and Python — and I love turning messy workflows
          into clean, automated systems.
        </motion.p>

        <motion.div className="mt-6 flex gap-4" {...fade(0.1)}>
          <a
            href="mailto:kareem12345h@gmail.com"
            className="rounded-xl px-5 py-3 border border-emerald-400/40 hover:bg-emerald-500/10 transition"
          >
            Get in touch
          </a>
          <a
            href="https://github.com/Kareem-cam"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-5 py-3 border border-white/15 hover:bg-white/10 transition inline-flex items-center gap-2"
          >
            <Icon.Github className="h-4 w-4" /> GitHub
          </a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-4 pb-8">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-4" {...fade(0)}>
          About
        </motion.h2>
        <Card>
          <motion.p className="text-white/85 leading-relaxed" {...fade(0.05)}>
            I learn by shipping. Recent work includes Discord automation, order-ops workflows, and
            small UIs with Framer Motion + Tailwind. Interests: protocol spelunking, reliability,
            and making the “happy path” feel obvious.
          </motion.p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["JavaScript", "React", "Tailwind", "Node", "Python", "C++"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                {t}
              </span>
            ))}
          </div>
        </Card>
      </section>

      {/* EXPERIENCE — concise, resume-like blocks */}
      <section id="experience" className="max-w-5xl mx-auto px-4 py-16 border-y border-white/10 bg-[#0b1218]">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-8" {...fade(0)}>
          Experience
        </motion.h2>

        <div className="grid gap-6">
          <Card>
            <motion.div className="flex flex-col gap-2" {...fade(0.05)}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-emerald-300">Freelance — Full-Stack & Automation</h3>
                <span className="text-xs text-white/50">2024 — present</span>
              </div>
              <ul className="list-disc ml-5 text-white/80 space-y-1">
                <li>Built Discord bots for order queues, ticketing, and moderation.</li>
                <li>Designed small React UIs with Tailwind + Framer Motion.</li>
                <li>Shipped reliable Node services with logging, rate limits, and retries.</li>
              </ul>
            </motion.div>
          </Card>
        </div>
      </section>

      {/* PROJECTS — Brittany-style grid with clean tags */}
      <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-8" {...fade(0)}>
          Featured projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ticket Bot for Orders */}
          <Card>
            <motion.div {...fade(0.05)} className="space-y-3">
              <h3 className="text-xl font-semibold">
                <span className="text-emerald-300">Ticket Bot</span> — orders & mass-clear
              </h3>
              <p className="text-white/80">
                Discord ticketing system for food orders. Staff can{" "}
                <span className="text-white">mass-clear tickets safely</span>, claim/close with transcripts,
                and enforce role-based permissions. Built for speed during peak hours.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Node", "Discord API", "Rate limiting", "Transcripts", "Role gating"].map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-white/75">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                  href="https://github.com/Kareem-cam"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon.Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </motion.div>
          </Card>

          {/* Queue Bot */}
          <Card>
            <motion.div {...fade(0.1)} className="space-y-3">
              <h3 className="text-xl font-semibold">
                <span className="text-emerald-300">Queue Bot</span> — first-come ticket assigning
              </h3>
              <p className="text-white/80">
                Customers join a queue and automatically receive a ticket when they reach the front.
                Shows live position, ETA, and staff workload routing. Reduces chaos during rush windows.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Node", "Discord API", "Redis/JSON store", "Slash commands"].map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-white/75">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                  href="https://github.com/Kareem-cam"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon.Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </motion.div>
          </Card>

          {/* Count Bot */}
          <Card>
            <motion.div {...fade(0.15)} className="space-y-3">
              <h3 className="text-xl font-semibold">
                <span className="text-emerald-300">Count Bot</span> — streaks & anti-spam
              </h3>
              <p className="text-white/80">
                Tracks counting games, prevents double posts, and records streaks with admin tools and audit logs.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Node", "Discord API", "Cooldowns", "Metrics"].map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-white/75">
                    {t}
                  </span>
                ))}
              </div>
              <a
                className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                href="https://github.com/Kareem-cam"
                target="_blank"
                rel="noreferrer"
              >
                <Icon.Github className="w-4 h-4" />
                Code
              </a>
            </motion.div>
          </Card>

          {/* Uber Eats Estimator */}
          <Card>
            <motion.div {...fade(0.2)} className="space-y-3">
              <h3 className="text-xl font-semibold">
                <span className="text-emerald-300">Uber Eats Estimator</span> — cart lock & fee math
              </h3>
              <p className="text-white/80">
                Parses group-order links, detects locked carts, and estimates totals with taxes, fees, and promos.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Playwright/Puppeteer", "Automation", "Node"].map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-white/75">
                    {t}
                  </span>
                ))}
              </div>
              <a
                className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
                href="https://github.com/Kareem-cam"
                target="_blank"
                rel="noreferrer"
              >
                <Icon.Github className="w-4 h-4" />
                Code
              </a>
            </motion.div>
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto px-4 pb-20">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-6" {...fade(0)}>
          Contact
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <motion.div className="space-y-3" {...fade(0.05)}>
              <a
                href="mailto:kareem12345h@gmail.com"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <Icon.Mail className="w-5 h-5 text-emerald-300" />
                kareem12345h@gmail.com
              </a>
              <a
                href="https://github.com/Kareem-cam"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <Icon.Github className="w-5 h-5 text-emerald-300" />
                github.com/Kareem-cam
              </a>
              <a
                href="https://www.linkedin.com/in/kareem-haddad-4136a3287/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <Icon.Linkedin className="w-5 h-5 text-emerald-300" />
                linkedin.com/in/kareem-haddad
              </a>
            </motion.div>
          </Card>

          <Card>
            <motion.div className="space-y-2" {...fade(0.1)}>
              <h3 className="text-lg font-semibold text-emerald-300">Availability</h3>
              <p className="text-white/75">
                Open to internships and part-time project work. Happy to collaborate on automation,
                Discord tooling, and React frontends.
              </p>
            </motion.div>
          </Card>
        </div>
      </section>

      <footer className="py-8 text-center text-white/50 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Kareem Haddad — Built with React, Tailwind & Framer Motion
      </footer>
    </div>
  );
}
