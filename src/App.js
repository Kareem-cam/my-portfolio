// App.js
import { motion } from "framer-motion";

/* ---------- tiny animation helpers ---------- */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true },
});
const hoverTap = { whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 } };

/* ---------- smooth-scroll (with header offset) ---------- */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72; // ~nav height
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
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-2.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
    </svg>
  ),
  Discord: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 4a16 16 0 0 0-4-.93l-.2.4A13 13 0 0 1 12 4c-1.28 0-2.54-.18-3.8-.53l-.2-.4A16 16 0 0 0 4 4C2.38 6.41 1.57 8.73 1.34 11.02c.37 4.13 2.77 6.6 5.62 8l.45-.78c-.92-.35-1.75-.87-2.47-1.54.2.15.41.29.63.42 2.3 1.35 4.6 1.64 6.43 1.64s4.12-.29 6.43-1.64c.22-.13.43-.27.63-.42-.72.67-1.55 1.19-2.47 1.54l.45.78c2.85-1.4 5.25-3.87 5.62-8C22.43 8.73 21.62 6.41 20 4ZM9.35 14.5c-.66 0-1.2-.66-1.2-1.47 0-.81.53-1.47 1.2-1.47.66 0 1.2.66 1.2 1.47 0 .81-.53 1.47-1.2 1.47Zm5.3 0c-.66 0-1.2-.66-1.2-1.47 0-.81.54-1.47 1.2-1.47.67 0 1.2.66 1.2 1.47 0 .81-.53 1.47-1.2 1.47Z" />
    </svg>
  ),
};

const Card = ({ children, className = "" }) => (
  <div className={"rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-sm p-6 " + className}>
    {children}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="#hero"
            className="font-semibold tracking-wide"
            onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}
          >
            <span className="text-rose-500">Kareem</span>
            <span className="text-white/60">.dev</span>
          </a>
          <ul className="flex gap-6 text-sm">
            {[
              ["About", "about"],
              ["Skills", "skills"],
              ["Languages", "languages"],
              ["Projects", "projects"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <motion.li key={id} {...hoverTap}>
                <a
                  href={`#${id}`}
                  className="hover:text-rose-400 transition"
                  onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO (text + GIF) */}
      <section id="hero" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-rose-500 to-red-400">
                  Hi,
                </span>
                {/* wave */}
                <motion.span
                  role="img"
                  aria-label="wave"
                  className="text-4xl md:text-5xl"
                  animate={{ rotate: [0, 14, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  👋
                </motion.span>
              </span>
              <br />
              I’m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-rose-500 to-red-400">
                Kareem (cam)
              </span>
            </motion.h1>

            <motion.p className="mt-4 text-base md:text-lg text-white/80" {...fade(0.1)}>
              17-year-old software engineer into <span className="text-white">reverse engineering</span> and clean,
              fast product experiences. Aspiring <span className="text-white">full-stack developer</span>.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap md:justify-start justify-center gap-3" {...fade(0.2)}>
              <motion.button
                onClick={() => scrollToId("projects")}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-800 shadow-lg"
                {...hoverTap}
              >
                View Projects
              </motion.button>
              <motion.button
                onClick={() => scrollToId("contact")}
                className="px-5 py-3 rounded-xl border border-white/15 hover:border-rose-400/60 hover:text-rose-300 transition"
                {...hoverTap}
              >
                Contact Me
              </motion.button>
            </motion.div>

            <motion.div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start text-xs" {...fade(0.3)}>
              {["C++", "JavaScript", "React", "Tailwind", "Node", "Python"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: GIF (from public/images) */}
          <motion.div {...fade(0.15)} className="w-full">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/60">
              <img
                src="/images/kareem-hero.gif"
                alt="Kareem hero"
                className="w-full h-[360px] object-cover"
              />
            </div>
            <p className="mt-2 text-center md:text-right text-xs text-white/40">
              
            </p>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-8" {...fade(0)}>
          Skills
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Reverse Engineering", desc: "Understanding internals, protocols, and behavior to rebuild cleaner, faster versions." },
            { title: "Backend & Automation", desc: "Node tooling, API design, data flow, scraping/automation with sane rate limits." },
            { title: "Frontend & UI/UX", desc: "React + Tailwind + Motion for fast, smooth experiences with consistent design." },
            { title: "Reliability", desc: "Persistence, logging, rate limiting, error handling, resilience patterns." },
            { title: "Collab & Git", desc: "Readable commits, PRs, branching strategies, and clean repos." },
            { title: "Performance", desc: "Measuring bottlenecks, improving latency, and optimizing hot paths." },
          ].map((s, i) => (
            <Card key={s.title}>
              <motion.div {...fade(0.05 + i * 0.05)}>
                <h3 className="text-lg font-semibold text-rose-300">{s.title}</h3>
                <p className="text-white/75 mt-1">{s.desc}</p>
              </motion.div>
            </Card>
          ))}
        </div>
      </section>

      {/* MOST USED LANGUAGES */}
      <section id="languages" className="border-y border-white/10 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-8" {...fade(0)}>
            Most Used Languages
          </motion.h2>

          <Card>
            <div className="space-y-5">
              {[
                { name: "C++", color: "bg-rose-600", pct: 35 },
                { name: "JavaScript", color: "bg-red-700", pct: 25 },
                { name: "Python", color: "bg-rose-500", pct: 25 },
                { name: "HTML/CSS", color: "bg-red-800", pct: 15 },
              ].map((l, i) => (
                <motion.div key={l.name} {...fade(0.05 + i * 0.05)}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/85">{l.name}</span>
                    <span className="text-white/60">{l.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-3 ${l.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
              <p className="text-xs text-white/40">*Approximate usage for now.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-b border-white/10 bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-10" {...fade(0)}>
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 — Count Bot */}
            <Card>
              <motion.div {...fade(0.05)} className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <motion.img
                    src="/images/count-bot-avatar.png"
                    alt="Discord Count Bot"
                    className="w-full h-52 object-cover"
                    {...hoverTap}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/count-bot-avatar.png"
                    alt="Count Bot avatar"
                    className="w-10 h-10 rounded-full ring-1 ring-rose-500/40"
                  />
                  <h3 className="text-2xl font-semibold text-rose-400">Discord Count Bot</h3>
                </div>
                <p className="text-white/75">
                  Tracks counting games, enforces order + anti-spam, records streaks, and includes admin tools & slash commands.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Node", "Discord API", "JSON", "Rate limiting"].map((t) => (
                    <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-white/75">
                      {t}
                    </span>
                  ))}
                </div>
                <motion.a
                  href="https://github.com/Kareem-cam"
                  className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 underline underline-offset-4"
                  {...hoverTap}
                >
                  <Icon.Github className="w-4 h-4" />
                  GitHub
                </motion.a>
              </motion.div>
            </Card>

            {/* Project 2 — Estimation Bot */}
            <Card>
              <motion.div {...fade(0.1)} className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <motion.img
                    src="/images/estimator-bot-avatar.svg"
                    alt="Uber Eats Estimation Bot"
                    className="w-full h-52 object-cover"
                    {...hoverTap}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/estimator-bot-avatar.svg"
                    alt="Estimator Bot avatar"
                    className="w-10 h-10 rounded-full ring-1 ring-rose-500/40"
                  />
                  <h3 className="text-2xl font-semibold text-red-400">Uber Eats Estimation Bot</h3>
                </div>
                <p className="text-white/75">
                  Parses group-order links, detects locked carts, and estimates totals with taxes/fees & promos.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Automation", "Playwright/Puppeteer", "Promo logic", "Node"].map((t) => (
                    <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-white/75">
                      {t}
                    </span>
                  ))}
                </div>
                <motion.a
                  href="https://github.com/Kareem-cam"
                  className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 underline underline-offset-4"
                  {...hoverTap}
                >
                  <Icon.Github className="w-4 h-4" />
                  GitHub
                </motion.a>
              </motion.div>
            </Card>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" {...fade(0)}>
          About Me
        </motion.h2>
        <Card>
          <motion.p className="text-white/85 leading-relaxed" {...fade(0.05)}>
            17-year-old software engineer exploring reverse engineering and full-stack development. I like understanding
            system internals, improving reliability, and crafting thoughtful UI/UX. I learn by building and shipping.
          </motion.p>
        </Card>
      </section>

      {/* CONTACT (links only) */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" {...fade(0)}>
          Contact
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <motion.div className="space-y-4" {...fade(0.05)}>
              <p className="text-white/90">Let’s build something together.</p>
              <div className="grid gap-3">
                <a
                  href="mailto:kareem12345h@gmail.com"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Icon.Mail className="w-5 h-5 text-rose-300" />
                  kareem12345h@gmail.com
                </a>

                <a
                  href="https://github.com/Kareem-cam"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Icon.Github className="w-5 h-5 text-rose-300" />
                  github.com/Kareem-cam
                </a>

                <a
                  href="https://www.linkedin.com/in/kareem-haddad-4136a3287/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Icon.Linkedin className="w-5 h-5 text-rose-300" />
                  linkedin.com/in/kareem-haddad
                </a>

                <a
                  href="https://www.instagram.com/kareemmmm___/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Icon.Instagram className="w-5 h-5 text-rose-300" />
                  @kareemmmm___
                </a>

                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
                  <Icon.Discord className="w-5 h-5 text-rose-300" />
                  cam1p
                </div>

                {/* Optional resume link if you add /public/resume.pdf */}
                {/* <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mt-2 inline-flex w-fit items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-red-800 hover:opacity-90 transition">Download Résumé</a> */}
              </div>
            </motion.div>
          </Card>

          <Card>
            <motion.div className="space-y-2" {...fade(0.1)}>
              <h3 className="text-lg font-semibold text-rose-300">Availability</h3>
              <p className="text-white/75">
                Open to part-time projects, internships, and collabs. Reverse engineering, tooling, and full-stack builds.
              </p>
            </motion.div>
          </Card>
        </div>
      </section>

      <footer className="py-8 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Kareem Haddad • Built with React, Tailwind & Framer Motion
      </footer>
    </div>
  );
}
