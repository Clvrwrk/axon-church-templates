import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Baby,
  HeartHandshake,
  Home,
  Menu,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";

const V = {
  hero: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779131605992-bc94c4e1-0062-4bf8-99ef-a198c77b8e94.mp4",
  hover:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779131655695-670ad566-83e0-46bd-a807-d46395600461.mp4",
  story:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779132224753-8326d8bd-b858-4d08-b342-9c164b6379e6.mp4",
  gather:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779132272229-470dc80f-f610-4478-83eb-769dc47e2692.mp4",
};

const IMG = {
  community:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80&auto=format&fit=crop",
  kids: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80&auto=format&fit=crop",
  worship:
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80&auto=format&fit=crop",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80&auto=format&fit=crop",
  groups:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
  serve:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
};

const PATHWAYS = [
  {
    icon: Sparkles,
    title: "Visit",
    blurb: "A warm weekend with clear parking, kids check-in, and a host ready for you.",
  },
  {
    icon: Users,
    title: "Connect",
    blurb: "Join a group that fits your season—friends who pray, eat, and grow together.",
  },
  {
    icon: HeartHandshake,
    title: "Serve",
    blurb: "Find a team that matches your gifts, from kids to hospitality to local outreach.",
  },
  {
    icon: Home,
    title: "Belong",
    blurb: "Membership that roots you in covenant community and shared mission.",
  },
];

const RITUALS = [
  {
    title: "Kids & Families",
    tags: ["Nursery", "Elementary", "Students"],
    blurb: "Safe check-in and joyful environments so parents can fully engage.",
    image: IMG.kids,
    video: V.hover,
  },
  {
    title: "Groups",
    tags: ["Weekly", "Open homes", "All ages"],
    blurb: "Hundreds of tables across Plano where faith becomes friendship.",
    image: IMG.groups,
  },
  {
    title: "Care & Recovery",
    tags: ["Counsel", "Support", "Prayer"],
    blurb: "Confidential care pathways for hard seasons and healing.",
    image: IMG.serve,
  },
];

const STORIES = [
  {
    name: "The Patel Family",
    quote:
      "We came for the kids ministry and stayed for the people. Northbridge feels like home on Sundays and Tuesdays.",
    role: "Attending 3 years",
  },
  {
    name: "Jordan M.",
    quote:
      "Next Steps made faith practical. Group, serve team, and a mentor in six months—not a sales pitch.",
    role: "Group host",
  },
  {
    name: "Alicia R.",
    quote:
      "The coffee lobby is just the start. This church actually knows how to welcome strangers.",
    role: "First-time guest host",
  },
];

const MARQUEE = [
  "NEXT STEPS",
  "KIDS",
  "GROUPS",
  "SERVE",
  "RECOVERY",
  "STUDENTS",
  "MEMBERSHIP",
  "PRAYER",
];

function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: ReactMouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  }

  return (
    <div
      ref={ref}
      data-magnetic
      className={cn("inline-block transition-transform duration-200 ease-out", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: ReactMouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  }

  return (
    <div
      ref={ref}
      data-card
      className={cn(
        "transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

function MaskedTitle({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>(".nova-word-inner");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      inners.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting || (entry && entry.boundingClientRect.top < 0)) {
          inners.forEach((n, i) => {
            n.style.transitionDelay = `${i * 35}ms`;
            n.classList.add("in");
          });
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="nova-word-mask">
            <span className="nova-word-inner">{w}</span>
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
    const nodes = el.querySelectorAll<HTMLElement>(".nova-reveal");
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
      n.style.transitionDelay = `${(i % 5) * 40}ms`;
      io.observe(n);
    });
    return () => io.disconnect();
  }, [root]);
}

function useLoopVideos(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const vids = el.querySelectorAll<HTMLVideoElement>(
      'video[data-aura-video-preset="loop-in-view"]',
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            void v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: [0, 0.35, 0.6] },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [root]);
}

function HoverVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={ref}
      data-aura-video-preset="hover"
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      className={className}
      onMouseEnter={() => {
        const v = ref.current;
        if (!v) return;
        void v.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const v = ref.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      }}
    />
  );
}

export function NorthbridgeHome({ template }: { template: TemplateConfig }) {
  const slug = template.slug;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useReveal(rootRef);
  useLoopVideos(rootRef);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#9d9283] antialiased">
      <div
        ref={rootRef}
        className="mx-auto min-h-screen max-w-[112rem] overflow-x-hidden bg-[#faf8f1] text-[#17191f] shadow-[0_1px_1px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.06),0_40px_80px_rgba(0,0,0,0.08)]"
      >
        {/* ── NAV ─────────────────────────────────────────── */}
        <header className="sticky top-[var(--grok-banner-h,0px)] z-50 border-b border-black/5 bg-[rgba(250,248,241,0.88)] backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
            <a
              href="#top"
              className="font-[Instrument_Serif,Georgia,serif] text-2xl font-light tracking-tight"
            >
              Northbridge
            </a>
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {[
                { label: "Pathways", href: "#pathways" },
                { label: "Ministries", href: "#ministries" },
                { label: "Stories", href: "#stories" },
                { label: "Visit", href: "#visit" },
              ].map((item) => (
                <Magnetic key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-[#17191f]/65 transition-colors hover:text-[#1f6f49]"
                  >
                    {item.label}
                  </a>
                </Magnetic>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Magnetic>
                <Link
                  to="/templates/$slug/visit"
                  params={{ slug }}
                  className="hidden rounded-xl bg-[#1f6f49] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185a3b] sm:inline-flex"
                >
                  Plan a visit
                </Link>
              </Magnetic>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-xl border border-black/5 lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </header>

        {menuOpen ? (
          <div className="fixed inset-0 z-[60] flex flex-col bg-[#faf8f1] px-6 pt-24 lg:hidden">
            <button
              type="button"
              className="absolute right-5 top-[calc(var(--grok-banner-h,0px)+1rem)] flex size-10 items-center justify-center rounded-xl border border-black/5"
              aria-label="Close"
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-5" />
            </button>
            <nav className="flex flex-col gap-1">
              {[
                { label: "Pathways", href: "#pathways" },
                { label: "Ministries", href: "#ministries" },
                { label: "Stories", href: "#stories" },
                { label: "Visit", href: "#visit" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-4 font-[Instrument_Serif,Georgia,serif] text-3xl font-light"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                onClick={() => setMenuOpen(false)}
                className="mt-6 rounded-xl bg-[#1f6f49] py-4 text-center text-sm font-semibold text-white"
              >
                Plan a visit
              </Link>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="mt-3 text-center text-sm text-[#17191f]/50"
              >
                ← Axon templates
              </Link>
            </nav>
          </div>
        ) : null}

        {/* ── HERO ────────────────────────────────────────── */}
        <section id="top" className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
          {/* Dot grid + glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(rgba(23,25,31,0.13) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 top-20 size-72 rounded-full bg-[#1f6f49]/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 top-40 size-80 rounded-full bg-[#d8b48b]/20 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="nova-reveal text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                Plano · Community Church
              </p>
              <MaskedTitle
                text="Faith formed for bright mornings and slower weeks"
                className="mt-5 max-w-xl font-[Instrument_Serif,Georgia,serif] text-[clamp(2.4rem,5.5vw,3.75rem)] font-light leading-[1.05] tracking-tight text-[#17191f]"
              />
              <p className="nova-reveal mt-6 max-w-md text-base leading-[1.75] text-[rgba(23,25,31,0.65)]">
                {template.tagline} A suburban church with clear next steps,
                excellent kids environments, and a lobby that feels like a
                neighborhood café.
              </p>
              <div className="nova-reveal mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    to="/templates/$slug/visit"
                    params={{ slug }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1f6f49] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185a3b]"
                  >
                    Plan a visit
                    <ArrowRight className="size-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    to="/templates/$slug/next-steps"
                    params={{ slug }}
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-7 py-4 text-sm font-semibold text-[#17191f] shadow-sm transition hover:bg-[#e9eadf]"
                  >
                    Next Steps
                  </Link>
                </Magnetic>
              </div>

              {/* Stats */}
              <div className="nova-reveal mt-10 grid grid-cols-3 gap-2 rounded-2xl bg-[#f7f7f3] p-4 sm:gap-4 sm:p-5">
                {[
                  { v: "3", l: "Weekend services" },
                  { v: "4.9", l: "Guest rating" },
                  { v: "40+", l: "Open groups" },
                ].map((s) => (
                  <div key={s.l} className="text-center sm:text-left">
                    <p className="font-[Instrument_Serif,Georgia,serif] text-2xl font-light sm:text-3xl">
                      {s.v}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-[rgba(23,25,31,0.55)] sm:text-xs">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Media frame */}
            <div className="nova-reveal relative">
              <div className="rounded-[32px] bg-white p-3 shadow-[0_20px_50px_rgba(23,25,31,0.08)]">
                <div className="relative overflow-hidden rounded-[24px] aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <video
                    data-aura-video-preset="loop-in-view"
                    src={V.hero}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster={IMG.coffee}
                    className="h-full w-full object-cover"
                  />
                  {/* Floating badges */}
                  <div className="absolute -left-2 -top-2 rounded-2xl border border-white/40 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md sm:-left-4 sm:-top-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                      This weekend
                    </p>
                    <p className="mt-0.5 text-sm font-semibold">
                      Sat 5 · Sun 9 & 11
                    </p>
                  </div>
                  <div className="absolute -bottom-3 right-2 flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md sm:-bottom-6 sm:right-4">
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#b9d9ab]">
                      <Baby className="size-4 text-[#1f6f49]" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Kids ready</p>
                      <p className="text-xs text-[rgba(23,25,31,0.55)]">
                        Secure check-in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PATHWAYS ────────────────────────────────────── */}
        <section id="pathways" className="bg-[#e9eadf] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-xl">
              <p className="nova-reveal text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                Pathways
              </p>
              <MaskedTitle
                as="h2"
                text="A simple map for growing faith"
                className="mt-3 font-[Instrument_Serif,Georgia,serif] text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PATHWAYS.map((p) => {
                const Icon = p.icon;
                return (
                  <TiltCard key={p.title}>
                    <article className="nova-reveal group h-full rounded-3xl bg-white p-6 shadow-sm transition hover:bg-[#faf8f1]">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#e9eadf] transition group-hover:rotate-[-8deg]">
                        <Icon className="size-5 text-[#1f6f49]" />
                      </div>
                      <h3 className="font-[Instrument_Serif,Georgia,serif] text-2xl font-light">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[rgba(23,25,31,0.65)]">
                        {p.blurb}
                      </p>
                    </article>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FEATURED RITUAL ─────────────────────────────── */}
        <section id="ministries" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="nova-reveal text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                  Ministries
                </p>
                <MaskedTitle
                  as="h2"
                  text="Made for everyday life"
                  className="mt-3 font-[Instrument_Serif,Georgia,serif] text-[clamp(2rem,4vw,3rem)] font-light"
                />
              </div>
              <Link
                to="/templates/$slug/ministries"
                params={{ slug }}
                className="nova-reveal text-sm font-semibold text-[#1f6f49] hover:underline"
              >
                All ministries →
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Featured with hover video */}
              <TiltCard className="lg:col-span-2">
                <article className="nova-reveal overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <HoverVideo
                      src={V.hover}
                      poster={IMG.kids}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191f]/50 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-[#1f6f49] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Featured
                    </span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-[Instrument_Serif,Georgia,serif] text-3xl font-light">
                      {RITUALS[0].title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-[rgba(23,25,31,0.65)]">
                      {RITUALS[0].blurb}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {RITUALS[0].tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#e9eadf] px-3 py-1 text-xs font-medium text-[#17191f]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>

              <div className="flex flex-col gap-6">
                {RITUALS.slice(1).map((r) => (
                  <TiltCard key={r.title}>
                    <article className="nova-reveal flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm sm:flex-row lg:flex-col">
                      <div className="aspect-[16/10] shrink-0 sm:w-2/5 lg:w-full">
                        <img
                          src={r.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-[Instrument_Serif,Georgia,serif] text-xl font-light">
                          {r.title}
                        </h3>
                        <p className="mt-1 text-sm text-[rgba(23,25,31,0.65)]">
                          {r.blurb}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {r.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-[#f7f7f3] px-2.5 py-0.5 text-[11px] font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STORIES ─────────────────────────────────────── */}
        <section id="stories" className="bg-[#e9eadf] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="nova-reveal text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                Stories
              </p>
              <MaskedTitle
                as="h2"
                text="From the neighborhood"
                className="mt-3 font-[Instrument_Serif,Georgia,serif] text-[clamp(2rem,4vw,3rem)] font-light"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {STORIES.map((s) => (
                <TiltCard key={s.name}>
                  <blockquote className="nova-reveal h-full rounded-3xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex gap-0.5 text-[#d8b48b]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-[rgba(23,25,31,0.75)]">
                      “{s.quote}”
                    </p>
                    <footer className="mt-5">
                      <p className="text-sm font-semibold">{s.name}</p>
                      <p className="text-xs text-[rgba(23,25,31,0.5)]">{s.role}</p>
                    </footer>
                  </blockquote>
                </TiltCard>
              ))}
            </div>

            {/* Proof video banner */}
            <div className="nova-reveal mt-6 overflow-hidden rounded-3xl bg-[#17191f] p-3 sm:p-4">
              <div className="grid items-center gap-6 lg:grid-cols-2">
                <div className="px-4 py-6 sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
                    Proof point
                  </p>
                  <h3 className="mt-3 font-[Instrument_Serif,Georgia,serif] text-3xl font-light text-white sm:text-4xl">
                    1,200+ weekly guests who found a next step
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    From first visit to group, serve team, and membership—clear
                    pathways, zero pressure.
                  </p>
                  <Link
                    to="/templates/$slug/next-steps"
                    params={{ slug }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1f6f49] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Start Next Steps
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="overflow-hidden rounded-2xl opacity-90">
                  <video
                    data-aura-video-preset="loop-in-view"
                    src={V.story}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster={IMG.community}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ─────────────────────────────────────── */}
        <section className="border-y border-black/5 bg-[#faf8f1] py-8" aria-hidden>
          <div className="nova-marquee-mask overflow-hidden">
            <div className="nova-marquee flex w-max gap-10 whitespace-nowrap px-4">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17191f]/35"
                >
                  {t} ·
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────── */}
        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="nova-reveal text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                About
              </p>
              <MaskedTitle
                as="h2"
                text="A church that feels like a good morning"
                className="mt-3 font-[Instrument_Serif,Georgia,serif] text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1]"
              />
              <p className="nova-reveal mt-5 text-base leading-[1.75] text-[rgba(23,25,31,0.65)]">
                Northbridge exists so people in Plano can meet Jesus, find
                friendship, and live on mission—without the guesswork. We plan
                for guests, invest in kids, and keep next steps obvious.
              </p>
              <div className="nova-reveal mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    t: "Weekend",
                    d: "Sat 5pm · Sun 9 & 11am with full kids environments.",
                  },
                  {
                    t: "Location",
                    d: template.address,
                  },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                      {c.t}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[rgba(23,25,31,0.65)]">
                      {c.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="nova-reveal grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-3xl sm:row-span-2">
                <video
                  data-aura-video-preset="loop-in-view"
                  src={V.gather}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster={IMG.worship}
                  className="h-full min-h-[280px] w-full object-cover sm:min-h-full"
                />
              </div>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={IMG.family}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={IMG.coffee}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY BENTO ───────────────────────────────── */}
        <section className="bg-[#e9eadf] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="nova-reveal mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
              Life together
            </p>
            <div className="grid auto-rows-[200px] gap-4 sm:auto-rows-[220px] lg:grid-cols-6 lg:auto-rows-[260px]">
              <div className="nova-reveal overflow-hidden rounded-3xl lg:col-span-2 lg:row-span-2">
                <video
                  data-aura-video-preset="loop-in-view"
                  src={V.hero}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="nova-reveal overflow-hidden rounded-3xl lg:col-span-2">
                <img
                  src={IMG.community}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="nova-reveal overflow-hidden rounded-3xl lg:col-span-2">
                <img src={IMG.kids} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="nova-reveal overflow-hidden rounded-3xl lg:col-span-3">
                <img
                  src={IMG.worship}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="nova-reveal overflow-hidden rounded-3xl lg:col-span-1">
                <img
                  src={IMG.serve}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── VISIT / FOOTER CTA ──────────────────────────── */}
        <section id="visit" className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#1e211f] text-white">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
                  Visit
                </p>
                <h2 className="mt-3 font-[Instrument_Serif,Georgia,serif] text-3xl font-light sm:text-4xl">
                  Come as you are this weekend
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                  {template.address}. Coffee is free, kids check-in is easy, and
                  a host will meet you at the door.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/templates/$slug/visit"
                    params={{ slug }}
                    className="rounded-xl bg-[#1f6f49] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Plan your visit
                  </Link>
                  <Link
                    to="/templates/$slug/contact"
                    params={{ slug }}
                    className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/90"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
                  Hours
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/65">
                  <li>Sat · 5:00 PM</li>
                  <li>Sun · 9:00 AM</li>
                  <li>Sun · 11:00 AM</li>
                  <li className="pt-2 text-white/40">Kids at every service</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
                  Newsletter
                </p>
                <p className="mt-3 text-sm text-white/60">
                  Weekend preview in your inbox.
                </p>
                {sent ? (
                  <p className="mt-4 text-sm text-[#b9d9ab]">You're subscribed.</p>
                ) : (
                  <form
                    className="mt-4 flex flex-col gap-2"
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
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#1f6f49]"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#17191f]"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-white/10 px-8 py-4 text-xs text-white/35 sm:flex-row sm:justify-between sm:px-12">
              <p>© {new Date().getFullYear()} Northbridge Community Church</p>
              <p>
                Template by{" "}
                <Link to="/" className="text-[#b9d9ab] hover:underline">
                  Axon Ministry Solutions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
