import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Menu,
  Minus,
  Plus,
  X,
} from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";
import { RootedMark } from "./RootedShell";

const A = {
  heroBg:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b1ac30ce-f293-4de8-a7ea-49edd87f02a2_1600w.webp",
  mood: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4a2c1e2d-29c8-47f4-a3c2-0f9def27514f_800w.png",
  fragment:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a8327983-6f3a-43a8-b98f-0b7664e8ff5c_800w.webp",
  testimonial:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d6a64160-bd6b-4f47-b96e-13a823168f6d_1600w.webp",
  show1:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1378116b-7d3d-4053-a18a-eda2bbd4414c_800w.webp",
  show2:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c84b7f97-eae3-47f2-b1c9-b368ba61f05f_800w.webp",
  show3:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/91126dae-53d0-49d3-b421-2b3d436408b8_800w.png",
  ctaBg:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2d1e1a85-a813-4d6d-92b4-b85127b934d3_1600w.webp",
  bible:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80&auto=format&fit=crop",
  community:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
  hands:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
};

const MARQUEE_TOP = [
  "HOUSE CHURCHES",
  "FORMATION CLASSES",
  "MENTORING",
  "HEALING CIRCLES",
  "EVERYDAY OBEDIENCE",
  "DEEP ROOTS",
];

const MARQUEE_BOT = [
  "ASHEVILLE · NC",
  "SUNDAY 10AM",
  "TUESDAY HOUSE CHURCHES",
  "THURSDAY FORMATION",
  "ALL ARE WELCOME",
];

const STACK_CARDS = [
  {
    id: "houses",
    kicker: "01 · Community",
    title: "House Churches",
    blurb:
      "Neighborhood tables where Scripture, prayer, and real friendship take root every week.",
    gradient:
      "radial-gradient(ellipse at 50% 130%, #8a2d14 0%, #2a0e06 35%, #0a0a0a 70%)",
    image: A.community,
    tags: ["Meals", "Prayer", "Open homes"],
  },
  {
    id: "formation",
    kicker: "02 · Depth",
    title: "Formation Classes",
    blurb:
      "Semester courses on prayer, theology, and spiritual practices—slow, sturdy growth.",
    gradient:
      "radial-gradient(ellipse at 50% 130%, #1a3a2a 0%, #0b1a12 40%, #080c09 75%)",
    image: A.bible,
    tags: ["Prayer", "Theology", "Practices"],
  },
  {
    id: "mentor",
    kicker: "03 · Care",
    title: "Mentoring & Healing",
    blurb:
      "One-to-one discipleship and safe circles for grief, recovery, and emotional health.",
    gradient:
      "radial-gradient(ellipse at 50% 130%, #1a2040 0%, #0b0d12 40%, #0a0a0a 75%)",
    image: A.hands,
    tags: ["Mentors", "Recovery", "Support"],
  },
];

const STEPS = [
  {
    n: "01",
    title: "Visit a Sunday",
    body: "Gathered worship at 10am—coffee early, kids welcome, no pressure.",
  },
  {
    n: "02",
    title: "Join a house church",
    body: "Meet hosts, share a meal, and find a circle that fits your season.",
  },
  {
    n: "03",
    title: "Start formation",
    body: "Pick a class or mentoring match for the next semester of growth.",
  },
  {
    n: "04",
    title: "Live it out",
    body: "Serve neighbors, practice the way of Jesus in ordinary days.",
  },
];

const FAQ = [
  {
    q: "What should I expect on Sunday?",
    a: "Simple worship, Scripture teaching, and a warm room. Services last about 75 minutes. Kids environments open 15 minutes early.",
  },
  {
    q: "Do I have to join a house church?",
    a: "No—but most people who stick around say house church is where Rooted becomes family. You can visit a few before committing.",
  },
  {
    q: "Is Rooted for people who still have questions?",
    a: "Yes. Doubt is welcome at the table. Formation is for apprentices, not finished products.",
  },
  {
    q: "How do I get involved in care or recovery?",
    a: "Start with a conversation—our healing circles and mentoring matches are confidential and paced with care.",
  },
];

function WordReveal({
  text,
  className,
  as: Tag = "h1",
  delayBase = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delayBase?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spans = el.querySelectorAll<HTMLElement>(".aura-word");
    if (reduce) {
      spans.forEach((s) => s.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting || (entry && entry.boundingClientRect.top < 0)) {
          spans.forEach((s) => s.classList.add("in"));
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span
            className="aura-word"
            style={{ animationDelay: `${delayBase + i * 70}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = el.querySelectorAll<HTMLElement>(".aura-reveal");
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [root]);
}

function DesignStamp({ className }: { className?: string }) {
  return (
    <div className={cn("relative size-28", className)}>
      <svg viewBox="0 0 100 100" className="aura-spin size-full" aria-hidden>
        <defs>
          <path
            id="circ"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            fill="none"
          />
        </defs>
        <text
          fill="#ff5a3d"
          fontSize="7.5"
          fontFamily="Urbanist, sans-serif"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          <textPath href="#circ">DEEP ROOTS FIRST • ROOTED • FORMATION • </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="size-3 rounded-full bg-[#ff5a3d] shadow-[0_0_16px_#ff5a3d]" />
      </div>
    </div>
  );
}

function CountUp({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setVal(end);
        return;
      }
      const t0 = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <div ref={ref}>
      <p className="font-[Urbanist,sans-serif] text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">
        {val}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-[#6f6f6f]">{label}</p>
    </div>
  );
}

export function RootedHome({ template }: { template: TemplateConfig }) {
  const slug = template.slug;
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useReveal(rootRef);

  /* Sticky stack scroll effect */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const root = stackRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>("[data-stack]")];

    const onScroll = () => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) {
          card.style.transform = "scale(1)";
          card.style.filter = "blur(0)";
          card.style.opacity = "1";
          return;
        }
        const r = card.getBoundingClientRect();
        const denom = Math.max(1, r.height - window.innerHeight * 0.8);
        const p = Math.min(1, Math.max(0, -r.top / denom));
        const scale = 1 - p * 0.08;
        const blur = p * 4;
        const opacity = 1 - p * 0.35;
        card.style.transform = `scale(${scale})`;
        card.style.filter = `blur(${blur}px)`;
        card.style.opacity = String(opacity);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero parallax */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const plate = heroParallaxRef.current;
    if (!plate) return;
    const onScroll = () => {
      const y = window.scrollY * 0.04;
      plate.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div ref={rootRef} className="bg-[#ececea] text-[#111] antialiased">
      {/* ── NAV ───────────────────────────────────────────── */}
      <header className="relative z-40 sticky top-[var(--grok-banner-h,0px)] border-b border-[#e4e4e1]/70 bg-[#ececea]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <RootedMark />
            <span className="font-[Urbanist,sans-serif] text-lg font-bold tracking-tight">
              Rooted
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {[
              { label: "Pathways", href: "#pathways" },
              { label: "Formation", href: "#formation" },
              { label: "Visit", href: "#visit-cta" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#6f6f6f] transition-colors hover:text-[#111]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="hidden rounded-full bg-[#0a0a0a] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,90,61,0.28)] transition-all duration-300 hover:bg-[#ff5a3d] sm:inline-flex"
            >
              Find a Group
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-[#e4e4e1] lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#ececea] px-6 pt-24 lg:hidden">
          <button
            type="button"
            className="absolute right-5 top-[calc(var(--grok-banner-h,0px)+0.75rem)] flex size-10 items-center justify-center rounded-full border border-[#e4e4e1]"
            aria-label="Close"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" />
          </button>
          <nav className="flex flex-col gap-1">
            {[
              { label: "Pathways", href: "#pathways" },
              { label: "Formation", href: "#formation" },
              { label: "Visit", href: "#visit-cta" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-3 py-4 font-[Urbanist,sans-serif] text-2xl font-bold tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-full bg-[#ff5a3d] py-4 text-center text-sm font-semibold text-white"
            >
              Find a Group
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="mt-3 text-center text-sm text-[#6f6f6f]"
            >
              ← Axon templates
            </Link>
          </nav>
        </div>
      ) : null}

      {/* ── HERO ──────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden px-5 pb-8 pt-10 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-[1240px] text-center">
          <div className="aura-reveal inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-medium text-white">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            Asheville · Gathering Sundays at 10am
          </div>

          <WordReveal
            as="h1"
            text="Deep roots. Real tables. Everyday faith."
            className="mx-auto mt-7 max-w-4xl font-[Urbanist,sans-serif] text-[clamp(2.4rem,6.5vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-[#111]"
          />

          <div className="aura-reveal mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="font-[Urbanist,sans-serif] text-lg font-semibold text-[#6f6f6f] sm:text-xl">
              Built for
            </span>
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[12px] font-medium uppercase tracking-wider text-white"
              style={{
                background: "linear-gradient(135deg,#ff5a3d,#c22f16)",
              }}
            >
              formation.md
            </span>
            <span className="font-[Urbanist,sans-serif] text-lg font-semibold text-[#6f6f6f] sm:text-xl">
              churches
            </span>
          </div>

          <p className="aura-reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#6f6f6f] sm:text-lg">
            {template.tagline} House churches, formation pathways, and mentoring
            for people who want more than a weekend seat.
          </p>

          <div className="aura-reveal mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(255,90,61,0.35)] transition-all duration-300 hover:bg-[#ff5a3d] hover:shadow-[0_14px_32px_rgba(255,90,61,0.45)]"
            >
              Plan your visit
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#pathways"
              className="inline-flex items-center gap-2 rounded-full border border-[#111]/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#111] backdrop-blur transition hover:border-[#111]/30"
            >
              See pathways
            </a>
          </div>
          <p className="aura-reveal mt-4 font-[Caveat,cursive] text-xl text-[#ff5a3d]">
            no production required — just presence
          </p>
        </div>

        {/* Hero collage */}
        <div className="aura-reveal relative mx-auto mt-14 max-w-[1240px]">
          <div
            className="relative mx-auto overflow-hidden rounded-[28px] h-[380px] sm:h-[480px] lg:h-[560px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, #3a1810 0%, #1a0c08 40%, #0a0a0a 75%)",
            }}
          >
            <div
              ref={heroParallaxRef}
              className="absolute inset-0 will-change-transform"
              data-parallax
            >
              <img
                src={A.heroBg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-luminosity"
                aria-hidden
              />
            </div>

            {/* Floating fragments */}
            <div className="absolute left-[6%] top-[12%] z-10 w-[38%] max-w-[280px] -rotate-[4deg] overflow-hidden rounded-[20px] border border-white/12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <img src={A.community} alt="" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute right-[8%] top-[18%] z-20 w-[32%] max-w-[240px] rotate-[3deg] overflow-hidden rounded-[20px] border border-white/12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <img src={A.bible} alt="" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute bottom-[14%] left-[22%] z-30 w-[28%] max-w-[200px] -rotate-[2deg] overflow-hidden rounded-[16px] border border-white/12 bg-[#0a0a0a]/80 p-3 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#ff5a3d]">
                This week
              </p>
              <p className="mt-1 font-[Urbanist,sans-serif] text-sm font-bold text-white">
                Tue · House Churches
              </p>
              <p className="text-xs text-white/60">7:00 PM · Open homes</p>
            </div>
            <div className="absolute bottom-[18%] right-[12%] z-20 w-[30%] max-w-[220px] rotate-[4deg] overflow-hidden rounded-[20px] border border-white/12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <img src={A.coffee} alt="" className="aspect-[5/4] w-full object-cover" />
            </div>
            <img
              src={A.mood}
              alt=""
              className="pointer-events-none absolute right-[2%] top-[4%] z-10 w-24 opacity-90 sm:w-32"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* ── MARQUEES ──────────────────────────────────────── */}
      <section className="relative z-10 -mt-4 overflow-hidden py-16" aria-hidden="true">
        <div className="relative h-28">
          <div className="absolute left-1/2 top-2 w-[140%] -translate-x-1/2 -rotate-[6deg] overflow-hidden bg-[#ff5a3d] py-3">
            <div className="aura-marquee-track flex w-max gap-10 whitespace-nowrap px-4">
              {[...MARQUEE_TOP, ...MARQUEE_TOP].map((t, i) => (
                <span
                  key={`t-${i}`}
                  className="font-[Urbanist,sans-serif] text-lg font-bold tracking-tight text-white sm:text-xl"
                >
                  {t} ·
                </span>
              ))}
            </div>
          </div>
          <div className="absolute left-1/2 top-14 w-[140%] -translate-x-1/2 rotate-[5deg] overflow-hidden bg-[#0a0a0a] py-3">
            <div className="aura-marquee-track-slow flex w-max gap-10 whitespace-nowrap px-4">
              {[...MARQUEE_BOT, ...MARQUEE_BOT].map((t, i) => (
                <span
                  key={`b-${i}`}
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF STATS ───────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-8">
        <div className="aura-reveal mx-auto grid max-w-[1240px] grid-cols-2 gap-8 border-y border-[#e4e4e1] py-12 sm:grid-cols-4">
          <CountUp end={42} suffix="+" label="Open house churches" />
          <CountUp end={18} label="Formation classes / year" />
          <CountUp end={120} suffix="+" label="Active mentors" />
          <CountUp end={14} label="Years of slow growth" />
        </div>
      </section>

      {/* ── STACKED PATHWAYS ──────────────────────────────── */}
      <section id="pathways" className="relative px-5 pb-8 sm:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            <p className="aura-reveal font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-[#ff5a3d]">
              Pathways
            </p>
            <WordReveal
              as="h2"
              text="Three ways to take root"
              className="aura-reveal mt-3 font-[Urbanist,sans-serif] text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-[-0.025em]"
            />
            <p className="aura-reveal mx-auto mt-4 max-w-lg text-[#6f6f6f]">
              Sticky depth cards—scroll to stack the deck. Each pathway is a full
              life with Jesus, not a program checkbox.
            </p>
          </div>

          <div ref={stackRef} className="relative space-y-6 pb-[20vh]">
            {/* watermark */}
            <p
              className="pointer-events-none absolute left-0 top-0 z-0 select-none font-[Urbanist,sans-serif] text-[clamp(4rem,12vw,9rem)] font-extrabold leading-none text-[#111]/[0.04]"
              aria-hidden
            >
              Context
            </p>

            {STACK_CARDS.map((card, i) => (
              <div
                key={card.id}
                data-stack
                className="sticky top-24 z-10 origin-top will-change-transform"
                style={{ zIndex: 10 + i }}
              >
                <div
                  className="overflow-hidden rounded-[28px] border border-white/12 p-6 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] sm:p-10"
                  style={{ background: card.gradient }}
                >
                  <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ff5a3d]">
                        {card.kicker}
                      </p>
                      <h3 className="mt-3 font-[Urbanist,sans-serif] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        {card.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-white/70">
                        {card.blurb}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {card.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[20px] bg-gradient-to-br from-white/20 to-white/5 p-[1px]">
                      <div className="overflow-hidden rounded-[19px] bg-[#0a0a0a]">
                        <img
                          src={card.image}
                          alt=""
                          className="aspect-[16/11] w-full object-cover opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATION LOOP ────────────────────────────────── */}
      <section id="formation" className="px-5 py-[112px] sm:px-8">
        <div className="relative mx-auto max-w-[1240px]">
          <p
            className="pointer-events-none absolute -top-8 right-0 z-0 select-none font-[Urbanist,sans-serif] text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none text-[#111]/[0.04]"
            aria-hidden
          >
            Build Loop
          </p>

          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            <div
              className="aura-reveal relative overflow-hidden rounded-[28px] p-8 sm:p-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 130%, #8a2d14 0%, #2a0e06 35%, #0a0a0a 70%)",
              }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 font-mono text-[11px] text-white/50">
                <span className="size-2.5 rounded-full bg-[#ff5a3d]" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-2">formation — rooted.sh</span>
              </div>
              <pre className="mt-6 overflow-x-auto font-mono text-[12px] leading-relaxed text-white/80">
{`$ open sunday
→ worship · teaching · kids
$ join house_church
→ meal · scripture · prayer
$ enroll formation
→ practices for ordinary days
$ mentor.match --season=6mo
→ walk with someone ahead`}
              </pre>
              <div className="absolute bottom-6 right-6">
                <DesignStamp />
              </div>
            </div>

            <div className="aura-reveal flex flex-col justify-center">
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-[#ff5a3d]">
                Inside Rooted
              </p>
              <WordReveal
                as="h2"
                text="The formation loop"
                className="mt-3 font-[Urbanist,sans-serif] text-3xl font-extrabold tracking-tight sm:text-4xl"
              />
              <p className="mt-2 font-[Caveat,cursive] text-2xl text-[#ff5a3d]">
                apprentices, not consumers
              </p>
              <ul className="mt-8 divide-y divide-[#111]/10">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-5 py-5">
                    <span className="font-[Urbanist,sans-serif] text-2xl font-extrabold text-[#ff5a3d]">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-[Urbanist,sans-serif] text-lg font-bold tracking-tight">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#6f6f6f]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────── */}
      <section className="px-5 pb-8 sm:px-8">
        <div
          className="aura-reveal relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] px-8 py-16 sm:px-14 sm:py-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, #3a1810 0%, #0a0a0a 65%)",
          }}
        >
          <img
            src={A.testimonial}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
            aria-hidden
          />
          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ff5a3d]">
              From the family
            </p>
            <blockquote className="mt-5 font-[Urbanist,sans-serif] text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
              “House church is where I stopped performing and started being known.
              Rooted gave me a table, a mentor, and a faith that fits Tuesday.”
            </blockquote>
            <p className="mt-6 text-sm text-white/60">
              Priya S. · Formation class · 2025
            </p>
          </div>
        </div>
      </section>

      {/* ── PATHWAYS / “PRICING” ───────────────────────────── */}
      <section className="px-5 py-[112px] sm:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            <p className="aura-reveal font-mono text-[12px] uppercase tracking-[0.16em] text-[#ff5a3d]">
              Next steps
            </p>
            <WordReveal
              as="h2"
              text="Pick your pace"
              className="mt-3 font-[Urbanist,sans-serif] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Light card */}
            <div className="aura-reveal rounded-[28px] border border-[#e4e4e1] bg-white p-8 shadow-sm sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6f6f6f]">
                Guest
              </p>
              <h3 className="mt-2 font-[Urbanist,sans-serif] text-3xl font-extrabold tracking-tight">
                Come & see
              </h3>
              <p className="mt-3 text-[#6f6f6f]">
                Perfect if you're exploring. No commitment—just a warm
                Sunday and a host.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Sunday gathering seat",
                  "Kids check-in ready",
                  "Coffee & connect",
                  "Optional house church visit",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="size-4 text-[#ff5a3d]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-[#111] py-3.5 text-sm font-semibold transition hover:bg-[#111] hover:text-white"
              >
                Plan a visit
              </Link>
            </div>

            {/* Dark studio card */}
            <div
              className="aura-reveal rounded-[28px] border border-white/10 p-8 text-white shadow-[0_30px_60px_-12px_rgba(255,90,61,0.35)] sm:p-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 130%, #8a2d14 0%, #2a0e06 40%, #0a0a0a 75%)",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ff5a3d]">
                  Family
                </p>
                <span className="rounded-full bg-[#ff5a3d] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <h3 className="mt-2 font-[Urbanist,sans-serif] text-3xl font-extrabold tracking-tight">
                Belong deeply
              </h3>
              <p className="mt-3 text-white/65">
                For those ready to root—house church, formation, and mentoring
                as a way of life.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "House church membership",
                  "Formation class seat",
                  "Mentor match (6 months)",
                  "Serve team placement",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                    <Check className="size-4 text-[#ff5a3d]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/templates/$slug/groups"
                params={{ slug }}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#ff5a3d] py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,90,61,0.4)] transition hover:opacity-90"
              >
                Find a house church
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section id="faq" className="px-5 pb-[80px] sm:px-8">
        <div className="mx-auto max-w-[720px]">
          <p className="aura-reveal text-center font-mono text-[12px] uppercase tracking-[0.16em] text-[#ff5a3d]">
            FAQ
          </p>
          <WordReveal
            as="h2"
            text="Questions we hear often"
            className="mt-3 text-center font-[Urbanist,sans-serif] text-3xl font-extrabold tracking-tight sm:text-4xl"
          />

          <div className="aura-reveal mt-10 divide-y divide-[#e4e4e1] rounded-[28px] border border-[#e4e4e1] bg-white">
            {FAQ.map((item, i) => {
              const open = faqOpen === i;
              return (
                <div key={item.q} className="px-5 sm:px-6">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#ff5a3d]"
                    aria-expanded={open}
                    onClick={() => setFaqOpen(open ? null : i)}
                  >
                    <span className="font-[Urbanist,sans-serif] text-base font-bold tracking-tight sm:text-lg">
                      {item.q}
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#e4e4e1]">
                      {open ? (
                        <Minus className="size-4" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      open ? "max-h-48 pb-5" : "max-h-0",
                    )}
                  >
                    <p className="text-sm leading-relaxed text-[#6f6f6f]">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section id="visit-cta" className="px-5 pb-[112px] sm:px-8">
        <div
          className="aura-reveal relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] px-6 py-14 sm:px-12 sm:py-16"
          style={{
            background:
              "radial-gradient(ellipse at 50% 130%, #8a2d14 0%, #2a0e06 35%, #0a0a0a 70%)",
          }}
        >
          <img
            src={A.ctaBg}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <WordReveal
              as="h2"
              text="Rooted starts with a visit"
              className="font-[Urbanist,sans-serif] text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            />
            <p className="mt-4 text-white/65">
              Get a parking tip, kids info, and a personal host for this Sunday
              at {template.address}.
            </p>
            {sent ? (
              <p className="mt-8 rounded-full bg-white/10 px-6 py-4 text-sm text-emerald-300">
                You're on the list—we'll email details shortly.
              </p>
            ) : (
              <form
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#ff5a3d]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#ff5a3d] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,90,61,0.4)] transition hover:opacity-90"
                >
                  Get visit details
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-[#e4e4e1] bg-[#0a0a0a] text-white">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <RootedMark />
              <span className="font-[Urbanist,sans-serif] text-lg font-bold">
                Rooted Fellowship
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9a9a9a]">
              {template.tagline}
            </p>
            <div className="mt-6 flex gap-6">
              <CountUp end={42} suffix="+" label="Houses" />
              <CountUp end={10} suffix="am" label="Sundays" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#ff5a3d]">
              Jump
            </p>
            <ul className="space-y-2 text-sm text-[#9a9a9a]">
              {["#pathways", "#formation", "#faq", "#visit-cta"].map((h) => (
                <li key={h}>
                  <a href={h} className="hover:text-white">
                    {h.replace("#", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#ff5a3d]">
              Contact
            </p>
            <p className="text-sm text-[#9a9a9a]">{template.address}</p>
            <p className="mt-2 text-sm text-[#9a9a9a]">{template.phone}</p>
            <p className="mt-1 text-sm text-[#9a9a9a]">{template.email}</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-4 text-xs text-[#6f6f6f] sm:flex-row sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} Rooted Fellowship</p>
            <p>
              Template by{" "}
              <Link to="/" className="text-[#ff5a3d] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
