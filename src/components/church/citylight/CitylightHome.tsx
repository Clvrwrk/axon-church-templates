import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Star,
  X,
} from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";

/* Literary asset map + church photography */
const A = {
  profile:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f59b84ca-1848-4b79-954a-fab4fed151e2_1600w.png",
  book1:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dd2b7cc4-b191-41fb-bc2d-77c3ec98efa0_3840w.png",
  book2:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b2a71b4a-3a83-408e-9542-64e2bd8b2114_3840w.png",
  book3:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/86f3165f-3fb4-4573-906a-6d816f7b7a09_3840w.png",
  detail:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c00a893d-007e-41ef-88e9-f99469b13d3a_3840w.png",
  monolith:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2ef84b35-6f41-4e21-b9d2-ad54ad740085_3840w.png",
  architecture:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ef35cc34-b859-4a06-aead-1a23ed29140e_3840w.png",
  event:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c81b2af1-393a-4ee6-8b2e-8c5d8e1d63f5_3840w.png",
  worship:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80&auto=format&fit=crop",
  community:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80&auto=format&fit=crop",
  stage:
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80&auto=format&fit=crop",
  kids: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80&auto=format&fit=crop",
};

const TICKER =
  "* NEW SERIES ‘LIGHT IN THE CITY’ STARTS THIS WEEKEND — FIND A CAMPUS * ";

const CAMPUSES = [
  {
    name: "Downtown",
    times: "Sat 4 & 6 · Sun 9 & 11",
    image: A.city,
    note: "Arena District",
  },
  {
    name: "Highlands",
    times: "Sun 9 & 11",
    image: A.community,
    note: "West neighborhood",
  },
  {
    name: "South",
    times: "Sun 10 & Online",
    image: A.stage,
    note: "Family campus",
  },
];

const SERMONS = [
  {
    title: "Light in the City",
    series: "Weekend",
    speaker: "Pastor Maya Chen",
    image: A.worship,
    meta: "32 min",
  },
  {
    title: "Tables Across Town",
    series: "Neighborhoods",
    speaker: "James Okonkwo",
    image: A.community,
    meta: "28 min",
  },
  {
    title: "One Mission",
    series: "Citylight DNA",
    speaker: "Elena Brooks",
    image: A.stage,
    meta: "35 min",
  },
  {
    title: "Kids & Next Gen",
    series: "Family",
    speaker: "Priya Shah",
    image: A.kids,
    meta: "24 min",
  },
];

const VALUES = [
  {
    title: "One Church",
    body: "Shared vision, teaching, and generosity across every neighborhood.",
  },
  {
    title: "Many Rooms",
    body: "Local campuses with their own hosts, teams, and street-level mission.",
  },
  {
    title: "Shared Mission",
    body: "Serve the city together—mercy, justice, and invitation for all.",
  },
];

const ACCLAIM = [
  {
    quote:
      "Citylight feels like one family stretched across the map. We found a campus and a calling.",
    name: "Alicia R.",
    campus: "Highlands",
  },
  {
    quote:
      "Production without pretension. Clear next steps for our kids and our marriage.",
    name: "Devon & Kim",
    campus: "South",
  },
  {
    quote:
      "The teaching is unified, the welcome is local. That combination kept us coming back.",
    name: "Marcus T.",
    campus: "Downtown",
  },
];

const FAQ = [
  {
    q: "Which campus should I visit first?",
    a: "Start with the neighborhood closest to you. Every campus shares the same message and kids environments—only the room and hosts change.",
  },
  {
    q: "Is online the same as in person?",
    a: "Online carries the weekend message live. We still encourage an in-person campus for connection, communion, and community.",
  },
  {
    q: "How do I get my kids checked in?",
    a: "Arrive 15 minutes early. Each campus has dedicated check-in and age-graded environments from nursery through students.",
  },
  {
    q: "Can I serve at a different campus than I attend?",
    a: "Yes. City teams and local teams both welcome volunteers—start with a conversation at Guest Services.",
  },
];

function NoiseCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.008;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const img = ctx.createImageData(Math.ceil(w / 3), Math.ceil(h / 3));
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const n = Math.random() * 40 + Math.sin(i * 0.001 + t) * 8;
        data[i] = 44 + n;
        data[i + 1] = 40 + n * 0.9;
        data[i + 2] = 37 + n * 0.7;
        data[i + 3] = 28;
      }
      ctx.clearRect(0, 0, w, h);
      const tmp = document.createElement("canvas");
      tmp.width = img.width;
      tmp.height = img.height;
      const tctx = tmp.getContext("2d");
      if (tctx) {
        tctx.putImageData(img, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(tmp, 0, 0, w, h);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      id="webgl-canvas"
      className="pointer-events-none fixed inset-0 -z-10 opacity-40"
      aria-hidden
    />
  );
}

function KineticTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".lit-char");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      chars.forEach((c) => c.classList.add("in"));
      return;
    }
    chars.forEach((c, i) => {
      c.style.transitionDelay = `${i * 15}ms`;
    });
    requestAnimationFrame(() => {
      chars.forEach((c) => c.classList.add("in"));
    });
  }, [text]);

  return (
    <h1 ref={ref} className={className} aria-label={text.trim()}>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="lit-char">{ch === " " ? "\u00A0" : ch}</span>
        </span>
      ))}
    </h1>
  );
}

function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = el.querySelectorAll<HTMLElement>(
      ".lit-scroll-up, .lit-scroll-fade",
    );
    if (reduce) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n, i) => {
      n.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(n);
    });
    return () => io.disconnect();
  }, [root]);
}

export function CitylightHome({ template }: { template: TemplateConfig }) {
  const slug = template.slug;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useScrollReveal(rootRef);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#F7F5F0] font-light text-[#2C2825] antialiased"
    >
      <NoiseCanvas />

      {/* Soft aura band */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-[800px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(194,122,99,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 60%, rgba(44,40,37,0.06), transparent 50%)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
          filter: "invert(0) saturate(1.05)",
        }}
        aria-hidden
      />

      {/* ── TICKER ─────────────────────────────────────────── */}
      <div className="relative z-30 h-8 overflow-hidden bg-[#2C2825] text-[#F7F5F0]">
        <div className="lit-ticker-track flex w-max whitespace-nowrap py-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="px-4 text-[11px] font-normal uppercase tracking-[0.2rem]"
            >
              {TICKER}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAV ────────────────────────────────────────────── */}
      <header className="nav-bar sticky top-[var(--grok-banner-h,0px)] z-20 border-b border-[rgba(44,40,37,0.1)] bg-[rgba(247,245,240,0.8)] backdrop-blur-[12px]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="text-xl font-normal uppercase tracking-tighter"
          >
            Citylight
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {[
              { label: "Campuses", href: "#campuses" },
              { label: "Messages", href: "#messages" },
              { label: "About", href: "#about" },
              { label: "Events", href: "#events" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-normal uppercase tracking-[0.2rem] text-[#2C2825]/70 transition-colors hover:text-[#C27A63]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/templates/$slug/give"
              params={{ slug }}
              className="hidden text-xs font-normal uppercase tracking-[0.2rem] text-[#2C2825]/70 transition-colors hover:text-[#C27A63] sm:inline"
            >
              Give
            </Link>
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="hidden bg-[#C27A63] px-8 py-3 text-xs font-normal uppercase tracking-[0.2rem] text-white transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Plan Visit
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center border border-[rgba(44,40,37,0.1)] md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] px-6 pt-24 md:hidden">
          <button
            type="button"
            className="absolute right-6 top-[calc(var(--grok-banner-h,0px)+3rem)] flex size-10 items-center justify-center border border-[rgba(44,40,37,0.1)]"
            aria-label="Close"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" />
          </button>
          <nav className="flex flex-col gap-1">
            {[
              { label: "Campuses", href: "#campuses" },
              { label: "Messages", href: "#messages" },
              { label: "About", href: "#about" },
              { label: "Events", href: "#events" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-normal uppercase tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-[#C27A63] py-4 text-center text-xs uppercase tracking-[0.2rem] text-white"
            >
              Plan Visit
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center text-sm text-[#2C2825]/50"
            >
              ← Axon templates
            </Link>
          </nav>
        </div>
      ) : null}

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="top" className="relative mx-auto max-w-[1600px] px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-6 text-xs font-normal uppercase tracking-[0.2rem] text-[#C27A63]">
              Denver · Multi-campus
            </p>
            <KineticTitle
              text={"ONE CHURCH.  MANY NEIGHBORHOODS.  "}
              className="max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-normal uppercase leading-[1.0] tracking-tight text-[#2C2825]"
            />
            <p className="mt-8 max-w-md text-sm font-light leading-[1.6] text-[#2C2825]/70">
              {template.tagline} Gather downtown, in the Highlands, or South—same
              message, local family, shared mission across the city.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
            <div className="group relative">
              <div className="size-36 overflow-hidden rounded-full border border-[rgba(44,40,37,0.1)] bg-[#EBE9E4] sm:size-44">
                <img
                  src={A.profile}
                  alt="Citylight pastoral team"
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
                />
              </div>
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                className="absolute -bottom-2 -right-2 flex size-14 items-center justify-center rounded-full bg-[#C27A63] text-white shadow-lg transition hover:scale-105"
                aria-label="Plan your visit"
              >
                <ArrowUpRight className="size-5" />
              </Link>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-xs uppercase tracking-[0.2rem] text-[#2C2825]/50">
                This weekend
              </p>
              <p className="mt-1 text-sm font-normal">
                Light in the City · All campuses
              </p>
            </div>
          </div>
        </div>

        {/* Hero campus cards — sharp 4:5 */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {CAMPUSES.map((c, i) => (
            <Link
              key={c.name}
              to="/templates/$slug/locations"
              params={{ slug }}
              className="lit-scroll-up group relative block aspect-[4/5] overflow-hidden bg-[#EBE9E4]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={c.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/80 via-[#2C2825]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-[#F7F5F0]">
                <p className="text-xs uppercase tracking-[0.2rem] text-[#F7F5F0]/70">
                  {c.note}
                </p>
                <p className="mt-1 text-xl font-normal uppercase tracking-tight">
                  {c.name}
                </p>
                <p className="mt-1 text-xs font-light">{c.times}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MESSAGES GRID ──────────────────────────────────── */}
      <section id="messages" className="mx-auto max-w-[1600px] px-6 py-24">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              Messages
            </p>
            <h2 className="mt-3 text-3xl font-normal uppercase tracking-tight sm:text-4xl">
              Featured works
            </h2>
          </div>
          <Link
            to="/templates/$slug/sermons"
            params={{ slug }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2rem] transition-colors hover:text-[#C27A63]"
          >
            Full archive <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERMONS.map((s, i) => (
            <article
              key={s.title}
              className="lit-scroll-up group flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={s.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <p className="text-[11px] uppercase tracking-[0.2rem] text-[#2C2825]/45">
                  {s.series}
                </p>
                <h3 className="mt-1 text-base font-normal uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-[#2C2825]/55">{s.speaker}</p>
                <div className="mt-auto flex items-center justify-between border-t border-[rgba(44,40,37,0.1)] pt-3 text-xs text-[#2C2825]/55">
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3 fill-[#C27A63] text-[#C27A63]" />
                    Featured
                  </span>
                  <span>{s.meta}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── VALUE PROP ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#2C2825] py-20 text-[#F7F5F0]">
        <div className="lit-shimmer pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="lit-scroll-up">
              <div className="mb-5 flex size-12 items-center justify-center border border-white/15">
                <ArrowUpRight className="size-5 text-[#C27A63]" />
              </div>
              <h3 className="text-lg font-normal uppercase tracking-tight">
                {v.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-[#F7F5F0]/60">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHIVES / EXCERPT ─────────────────────────────── */}
      <section id="about" className="mx-auto max-w-[1600px] px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lit-scroll-up lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              Our story
            </p>
            <h2 className="mt-4 text-3xl font-normal uppercase leading-[1.15] tracking-tight sm:text-4xl">
              Built for the whole city
            </h2>
            <p className="mt-6 text-sm font-light leading-[1.7] text-[#2C2825]/70">
              Citylight began as a single downtown gathering and grew into
              neighborhoods that still share one pulpit rhythm, one kids
              standard, and one city-wide mission. We believe every zip code
              deserves a warm room and a clear invitation to Jesus.
            </p>
            <Link
              to="/templates/$slug/about"
              params={{ slug }}
              className="mt-8 inline-flex border-b border-[#2C2825] pb-1 text-xs uppercase tracking-[0.2rem] transition-colors hover:border-[#C27A63] hover:text-[#C27A63]"
            >
              Read our story
            </Link>
          </div>
          <div className="relative lit-scroll-fade lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden bg-[#EBE9E4]">
              <img
                src={A.monolith}
                alt=""
                className="h-full w-full object-cover mix-blend-multiply grayscale"
              />
            </div>
            <div className="absolute left-6 top-6 max-w-[220px] border border-[rgba(44,40,37,0.1)] bg-[#F7F5F0]/95 p-5 shadow-[0_24px_48px_rgba(44,40,37,0.08)] backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.2rem] text-[#C27A63]">
                Series
              </p>
              <p className="mt-2 text-base font-normal uppercase tracking-tight">
                Light in the City
              </p>
              <p className="mt-2 text-xs font-light text-[#2C2825]/55">
                Week 1 · All campuses this weekend
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCLAIM ────────────────────────────────────────── */}
      <section className="bg-[#EBE9E4] py-24">
        <div className="mx-auto max-w-[1600px] px-6">
          <p className="text-center text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
            Acclaim
          </p>
          <h2 className="mt-3 text-center text-3xl font-normal uppercase tracking-tight">
            From the family
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ACCLAIM.map((t) => (
              <blockquote
                key={t.name}
                className="lit-scroll-fade border border-[rgba(44,40,37,0.1)] bg-[#F7F5F0] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex gap-0.5 text-[#C27A63]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-light leading-relaxed text-[#2C2825]/80">
                  “{t.quote}”
                </p>
                <footer className="mt-6 text-xs uppercase tracking-[0.15rem] text-[#2C2825]/50">
                  {t.name} · {t.campus}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS + FAQ ───────────────────────────────────── */}
      <section id="events" className="mx-auto max-w-[1600px] px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lit-scroll-up lg:col-span-5">
            <div className="group relative aspect-[4/5] overflow-hidden bg-[#EBE9E4]">
              <img
                src={A.event}
                alt=""
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/80 to-transparent" />
              <div className="absolute bottom-0 p-6 text-[#F7F5F0]">
                <p className="text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
                  Upcoming
                </p>
                <p className="mt-2 text-2xl font-normal uppercase tracking-tight">
                  City Serve Day
                </p>
                <p className="mt-1 text-sm font-light">Sep 14 · All campuses</p>
                <Link
                  to="/templates/$slug/events"
                  params={{ slug }}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2rem] hover:text-[#C27A63]"
                >
                  All events <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div id="faq" className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-normal uppercase tracking-tight">
              Before you come
            </h2>
            <div className="mt-10">
              {FAQ.map((item, i) => {
                const open = faqOpen === i;
                return (
                  <div
                    key={item.q}
                    className="border-b border-[rgba(44,40,37,0.1)]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#C27A63]"
                      aria-expanded={open}
                      onClick={() => setFaqOpen(open ? null : i)}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-xs text-[#2C2825]/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-normal uppercase tracking-tight sm:text-base">
                          {item.q}
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 transition-transform duration-500 ease-in-out",
                          open && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: open ? 200 : 0,
                        opacity: open ? 1 : 0,
                      }}
                    >
                      <p className="pb-5 pl-10 text-sm font-light leading-relaxed text-[#2C2825]/65">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="border-t border-[rgba(44,40,37,0.1)] py-24">
        <div className="mx-auto max-w-[1600px] px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
            Next Sunday
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-normal uppercase tracking-tight">
            Find your campus
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light text-[#2C2825]/60">
            {template.address} · and neighborhoods across {template.city}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/templates/$slug/locations"
              params={{ slug }}
              className="bg-[#C27A63] px-8 py-3 text-xs font-normal uppercase tracking-[0.2rem] text-white transition-opacity hover:opacity-90"
            >
              Campuses
            </Link>
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="border border-[#2C2825] px-8 py-3 text-xs font-normal uppercase tracking-[0.2rem] transition-colors hover:bg-[#2C2825] hover:text-[#F7F5F0]"
            >
              Plan a visit
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#2C2825] text-[#F7F5F0]">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <p className="text-xl font-normal uppercase tracking-tighter">
              Citylight Church
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-[#F7F5F0]/55">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              Jump
            </p>
            <ul className="space-y-2 text-sm font-light text-[#F7F5F0]/55">
              {["#campuses", "#messages", "#about", "#faq"].map((h) => (
                <li key={h}>
                  <a href={h} className="hover:text-white">
                    {h.replace("#", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              Contact
            </p>
            <p className="text-sm font-light text-[#F7F5F0]/55">
              {template.address}
            </p>
            <p className="mt-2 text-sm font-light text-[#F7F5F0]/55">
              {template.phone}
            </p>
            <p className="mt-1 text-sm font-light text-[#F7F5F0]/55">
              {template.email}
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-4 text-xs text-[#F7F5F0]/35 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Citylight Church</p>
            <p>
              Template by{" "}
              <Link to="/" className="text-[#C27A63] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
