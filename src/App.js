// App.js — solid navy background + mouse-follow "spotlight" + smooth animations
// - Left menu highlights on click AND on scroll
// - Sections and chips animate in
// - Project cards are fully clickable

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* ---------- animation helpers ---------- */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.4 },
});
const chip = (i) => ({
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay: 0.05 * i, duration: 0.35, ease: "easeOut" },
  viewport: { once: true, amount: 0.6 },
});
const hoverLift = {
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { y: 0, scale: 0.995 },
  transition: { type: "spring", stiffness: 260, damping: 20 },
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
  <motion.div
    className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.45 }}
  >
    {children}
  </motion.div>
);

/* ---------- active-section tracker ---------- */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.3, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return [active, setActive];
};

/* ---------- smooth-scroll with immediate highlight ---------- */
const scrollToId = (id, setActive) => {
  const el = document.getElementById(id);
  if (!el) return;
  setActive(id); // highlight immediately on click
  const y = el.getBoundingClientRect().top + window.pageYOffset - 32;
  window.scrollTo({ top: y, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
};

/* ---------- MOUSE-FOLLOW "SPOTLIGHT" (this is the white spot) ---------- */
const Spotlight = () => {
  // target: where the mouse actually is
  const target = useRef({ x: -500, y: -500 });
  // pos: a smoothed/lerped position for nicer trailing motion
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const onMove = (e) => (target.current = { x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      setPos((p) => {
        const k = 0.12; // smoothing factor (lower = more lag)
        return {
          x: p.x + (target.current.x - p.x) * k,
          y: p.y + (target.current.y - p.y) * k,
        };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // Subtle white glow that fades out; tweak alpha/size to taste
        background: `radial-gradient(220px 220px at ${pos.x}px ${pos.y}px,
          rgba(255,255,255,0.08), rgba(255,255,255,0) 60%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

/* ---------- top progress bar ---------- */
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  return (
    <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-emerald-400/70" />
  );
};

/* ============================== */
/* ============ APP ============= */
/* ============================== */
export default function App() {
  const sections = ["about", "experience", "projects", "contact"];
  const [active, setActive] = useActiveSection(sections);
  const expChips = useMemo(() => ["Power BI", "Data Quality", "Dashboards"], []);

  return (
    <div className="relative min-h-screen bg-[#0b1220] text-slate-200 selection:bg-emerald-300/20">
      <ProgressBar />
      <Spotlight />

      <main className="mx-auto grid max-w-6xl gap-8 px-6 md:px-8 lg:grid-cols-12">
        {/* LEFT (sticky) */}
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
              Aspiring Software Engineer
            </motion.h2>

            <motion.p className="mt-3 max-w-md text-slate-300" {...fadeUp(0.1)}>
              Sophomore Software Engineering student at the University of Michigan – Dearborn, passionate about
              developing efficient and innovative software solutions. Experienced in C++, Python, and web technologies,
              with hands on projects in automation, simulation, and application development. Committed to continuous
              learning and advancing my skills as a future engineer.
            </motion.p>
          </div>

          {/* Left nav (highlights immediately on click and via scroll) */}
          <nav className="mt-10">
            <ul className="space-y-4 text-sm tracking-wider">
              {sections.map((id) => (
                <li key={id} className="relative">
                  <button
                    onClick={() => scrollToId(id, setActive)}
                    className={`group inline-flex items-center gap-4 text-left uppercase focus-visible:outline-none ${
                      active === id ? "text-emerald-300" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`h-px transition-all ${
                        active === id ? "bg-emerald-300 w-16" : "bg-slate-500/40 w-10 group-hover:w-16"
                      }`}
                    />
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* socials */}
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

        {/* RIGHT (content) */}
        <section className="lg:col-span-7 py-16 space-y-24">
          {/* ABOUT anchor target */}
          <div id="about" />

          {/* EXPERIENCE */}
          <motion.section id="experience" {...fadeUp(0)}>
            <h3 className="mb-6 text-lg font-semibold text-slate-200">Experience</h3>
            <Card>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h4 className="text-slate-100 font-semibold">
                    Apprentice — Juvenile & Youth Services, Wayne County, Michigan
                  </h4>
                  <p className="mt-2 text-slate-400">
                    Assisted on projects and helped distribute accurate data using <span className="text-slate-200">Power BI</span>.
                    Supported reporting tasks and quality checks to ensure stakeholders received the correct insights.
                  </p>
                </div>
                <span className="text-xs text-slate-500">2024 — Present</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {expChips.map((t, i) => (
                  <motion.span
                    key={t}
                    className="rounded-full bg-emerald-400/10 text-emerald-200/90 border border-emerald-400/20 px-2.5 py-1 text-xs"
                    {...chip(i)}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* PROJECTS */}
          <motion.section id="projects" {...fadeUp(0)}>
            <h3 className="mb-6 text-lg font-semibold text-slate-200">Projects</h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Ticket Bot */}
              <motion.a
                {...hoverLift}
                href="https://github.com/Kareem-cam" // replace with your repo
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none"
              >
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Ticket Bot — Orders & Mass-Clear</h4>
                  <p className="mt-2 text-slate-400">
                    Ticketing built for rush hours. Staff can <span className="text-slate-200">mass-clear tickets</span>,
                    claim/close with transcripts, and enforce role gating.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Node", "Discord API", "Transcripts", "Role gating", "Rate limits"].map((t, i) => (
                      <motion.span
                        key={t}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300"
                        {...chip(i)}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div className="mt-4 flex items-center gap-2 text-emerald-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <Icon.Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </motion.div>
                </Card>
              </motion.a>

              {/* Queue Bot */}
              <motion.a
                {...hoverLift}
                href="https://github.com/Kareem-cam" // replace with your repo
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none"
              >
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Queue Bot — Fair Worker Routing</h4>
                  <p className="mt-2 text-slate-400">
                    Workers (not customers) join the queue. New orders go to the next worker automatically for{" "}
                    <span className="text-slate-200">fair distribution</span>.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Node", "Discord API", "Slash commands", "Redis/JSON store", "Metrics"].map((t, i) => (
                      <motion.span
                        key={t}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300"
                        {...chip(i)}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div className="mt-4 flex items-center gap-2 text-emerald-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <Icon.Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </motion.div>
                </Card>
              </motion.a>

              {/* Count Bot */}
              <motion.a
                {...hoverLift}
                href="https://github.com/Kareem-cam" // replace with your repo
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none"
              >
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Count Bot — Orders Leaderboard</h4>
                  <p className="mt-2 text-slate-400">
                    Tracks orders per worker and shows a live <span className="text-slate-200">leaderboard</span>. Prevents doubles and keeps audit logs.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Node", "Discord API", "Anti-spam", "Audit logs"].map((t, i) => (
                      <motion.span
                        key={t}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300"
                        {...chip(i)}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div className="mt-4 flex items-center gap-2 text-emerald-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <Icon.Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </motion.div>
                </Card>
              </motion.a>

              {/* Uber Eats Estimator */}
              <motion.a
                {...hoverLift}
                href="https://github.com/Kareem-cam" // replace with your repo
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none"
              >
                <Card className="h-full">
                  <h4 className="text-slate-100 font-semibold">Uber Eats Estimator — Cart Lock & Fees</h4>
                  <p className="mt-2 text-slate-400">
                    Parses group-order links, detects locked carts, and estimates totals with taxes, fees, and promos.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Playwright/Puppeteer", "Automation", "Node"].map((t, i) => (
                      <motion.span
                        key={t}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300"
                        {...chip(i)}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div className="mt-4 flex items-center gap-2 text-emerald-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <Icon.Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </motion.div>
                </Card>
              </motion.a>
            </div>
          </motion.section>

          {/* CONTACT */}
          <motion.section id="contact" {...fadeUp(0)}>
            <h3 className="mb-6 text-lg font-semibold text-slate-200">Contact</h3>
            <Card>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:kareem12345h@gmail.com"
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition focus-visible:outline-none"
                >
                  <Icon.Mail className="h-5 w-5 text-emerald-300" />
                  kareem12345h@gmail.com
                </a>
                <a
                  href="https://github.com/Kareem-cam"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition focus-visible:outline-none"
                >
                  <Icon.Github className="h-5 w-5 text-emerald-300" />
                  github.com/Kareem-cam
                </a>
                <a
                  href="https://www.linkedin.com/in/kareem-haddad-4136a3287/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition focus-visible:outline-none"
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
