import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";
import { LogoMark } from "./SolunaShell";

/* Church imagery — contemplative, warm, community-forward */
const ASSETS = {
  hero: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=2070&q=80&auto=format&fit=crop",
  kids: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=80&auto=format&fit=crop",
  groups:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop",
  worship:
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80&auto=format&fit=crop",
  serve:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80&auto=format&fit=crop",
  philosophy:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80&auto=format&fit=crop",
  elena:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
  david:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  maya: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop",
  james:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
};

const MINISTRIES = [
  {
    id: "kids",
    name: "Soluna Kids",
    blurb: "Safe, joyful Sunday spaces where children meet Jesus at their pace.",
    level: "Ages 0–11",
    duration: "Sundays",
    image: ASSETS.kids,
  },
  {
    id: "groups",
    name: "Home Circles",
    blurb: "Weekly gatherings in living rooms for prayer, meals, and real friendship.",
    level: "All adults",
    duration: "Weeknights",
    image: ASSETS.groups,
  },
  {
    id: "worship",
    name: "Sunday Gathering",
    blurb: "Simple worship, honest teaching, and space to breathe with God.",
    level: "Everyone",
    duration: "75 min",
    image: ASSETS.worship,
  },
  {
    id: "serve",
    name: "Neighbor Care",
    blurb: "Food pantry, visits, and local projects that love our city well.",
    level: "All ages",
    duration: "Ongoing",
    image: ASSETS.serve,
  },
];

type ScheduleRow = {
  time: string;
  name: string;
  leader: string;
  place: string;
  avatar?: string;
  initials?: string;
};

const SCHEDULE: ScheduleRow[] = [
  {
    time: "09:00 AM",
    name: "Prayer & Presence",
    leader: "Maya Chen",
    place: "Chapel",
    avatar: ASSETS.maya,
  },
  {
    time: "10:00 AM",
    name: "Sunday Gathering",
    leader: "Pastor Elena Brooks",
    place: "Main Hall",
    avatar: ASSETS.elena,
  },
  {
    time: "10:00 AM",
    name: "Soluna Kids",
    leader: "James Okonkwo",
    place: "Kids Wing",
    avatar: ASSETS.james,
  },
  {
    time: "11:30 AM",
    name: "Coffee & Connect",
    leader: "David Park",
    place: "Courtyard",
    avatar: ASSETS.david,
  },
  {
    time: "06:30 PM",
    name: "Evening Communion",
    leader: "Sarah J.",
    place: "Chapel",
    initials: "SJ",
  },
  {
    time: "07:00 PM",
    name: "Home Circles (Tue)",
    leader: "David Park",
    place: "Homes citywide",
    avatar: ASSETS.david,
  },
];

const GIVE_TIERS = [
  {
    id: "once",
    name: "One-Time",
    monthly: 50,
    yearly: 50,
    period: "gift",
    features: [
      "Support this month’s mission",
      "Receipt by email",
      "Undesignated or special fund",
    ],
    popular: false,
  },
  {
    id: "monthly",
    name: "Monthly Partner",
    monthly: 100,
    yearly: 80,
    period: "month",
    features: [
      "Sustain worship & kids",
      "Neighbor care projects",
      "Quarterly partner update",
      "Priority volunteer invites",
    ],
    popular: true,
  },
  {
    id: "mission",
    name: "Mission Circle",
    monthly: 250,
    yearly: 200,
    period: "month",
    features: [
      "Underwrite local outreach",
      "Annual mission dinner",
      "Direct pastor updates",
    ],
    popular: false,
  },
];

function StampBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-36 items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 144 144"
        className="absolute inset-0 size-full animate-spin-slow"
        aria-hidden
      >
        <defs>
          <path
            id="curve"
            d="M 72,72 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-[#1a1a1a] text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.28em" }}
        >
          <textPath href="#curve" startOffset="0%">
            Soluna Church · Belong · Become · Soluna Church ·
          </textPath>
        </text>
      </svg>
      <div className="relative flex size-16 items-center justify-center rounded-full bg-[#f2ece5]">
        <svg viewBox="0 0 24 24" className="size-7 text-[#5d674f]" aria-hidden>
          <circle
            cx="12"
            cy="10"
            r="3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            d="M4 16.5c2.5-2 5.2-3 8-3s5.5 1 8 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <line
            x1="5"
            y1="19"
            x2="19"
            y2="19"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function SolunaHome({ template }: { template: TemplateConfig }) {
  const slug = template.slug;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [yearly, setYearly] = useState(false);
  const ministriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function scrollMinistries(dir: -1 | 1) {
    const el = ministriesRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: "smooth" });
  }

  return (
    <>
      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        id="navbar"
        className={cn(
          "fixed left-0 right-0 top-[var(--grok-banner-h,0px)] z-50 h-24 transition-all duration-300",
          scrolled
            ? "bg-[rgba(245,244,240,0.8)] shadow-sm backdrop-blur-md"
            : "bg-[rgba(245,244,240,0.8)] backdrop-blur-[12px]",
        )}
      >
        <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-2.5 text-[#1a1a1a]">
            <LogoMark className="size-7" />
            <span className="text-sm font-medium tracking-tight">Soluna</span>
          </a>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {[
              { label: "Our Heart", href: "#heart" },
              { label: "Ministries", href: "#ministries" },
              { label: "This Week", href: "#schedule" },
              { label: "Give", href: "#give" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#5c5c5a] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="fixed right-0 top-[var(--grok-banner-h,0px)] z-50 hidden h-24 items-center rounded-bl-[40px] bg-[#1a1a1a] px-8 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:inline-flex"
            >
              Plan Your Visit
            </Link>
            <button
              type="button"
              id="mobile-menu-btn"
              className="flex size-11 items-center justify-center rounded-full border border-[#dcdacd] lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-[#f5f4f0] px-6 pt-28 transition-opacity duration-300 lg:hidden",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute right-5 top-[calc(var(--grok-banner-h,0px)+1.25rem)] flex size-11 items-center justify-center rounded-full border border-[#dcdacd]"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X className="size-5" />
        </button>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {[
            { label: "Our Heart", href: "#heart" },
            { label: "Ministries", href: "#ministries" },
            { label: "This Week", href: "#schedule" },
            { label: "Give", href: "#give" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-3 py-4 text-2xl font-medium tracking-tight text-[#1a1a1a] transition-colors hover:bg-[#e8eae4]"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/templates/$slug/visit"
            params={{ slug }}
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5d674f] px-6 py-4 text-base font-medium text-white"
          >
            Plan Your Visit
          </Link>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="mt-3 text-center text-sm text-[#5c5c5a]"
          >
            ← Back to Axon templates
          </Link>
        </nav>
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative min-h-[min(100svh,920px)] overflow-hidden bg-[#f5f4f0] pt-24"
      >
        {/* Massive circular hero image — intentional overflow */}
        <div
          className="pointer-events-none absolute right-[-10%] top-[-5%] z-0 aspect-square w-[min(92vw,720px)] overflow-hidden rounded-full sm:w-[min(70vw,820px)] lg:w-[55%]"
          aria-hidden
        >
          <img
            src={ASSETS.hero}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Premium badge */}
        <div className="absolute left-[10%] top-[15%] z-20 hidden size-36 items-center justify-center rounded-full bg-[#f2ece5] sm:flex">
          <div className="text-center">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5c5c5a]">
              Est.
            </p>
            <p className="mt-1 text-2xl font-medium tracking-tight text-[#1a1a1a]">
              2012
            </p>
          </div>
        </div>

        {/* Rotating stamp */}
        <div className="absolute left-[-10%] top-[50%] z-20 hidden -translate-y-1/2 lg:block">
          <StampBadge />
        </div>

        {/* Intro badge */}
        <div className="absolute bottom-[15%] right-[5%] z-20 hidden max-w-[200px] rounded-full bg-white/90 px-5 py-3 text-center text-xs leading-relaxed text-[#5c5c5a] shadow-sm backdrop-blur md:block">
          A quiet, welcoming church family in {template.city}.
        </div>

        <div className="relative z-10 mx-auto grid min-h-[min(calc(100svh-6rem),820px)] max-w-[1400px] grid-cols-12 px-5 pb-8 pt-10 sm:px-8 lg:px-12 lg:pt-16">
          <div className="col-span-12 flex flex-col justify-center lg:col-span-6 xl:col-span-5">
            <p className="mb-5 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5d674f]">
              {template.city} · Small church
            </p>
            <h1 className="max-w-xl text-5xl font-medium leading-[1.05] tracking-tighter text-[#1a1a1a] sm:text-6xl lg:text-7xl">
              Come. Belong.
              <br />
              Be made new.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#5c5c5a] sm:text-lg">
              {template.tagline} We are a small church that makes room for
              quiet faith, warm tables, and real neighbors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                className="inline-flex items-center justify-center rounded-full bg-[#5d674f] px-7 py-3.5 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90"
              >
                Plan your visit
              </Link>
              <a
                href="#schedule"
                className="inline-flex items-center justify-center rounded-full border border-[#1a1a1a] px-7 py-3.5 text-sm font-medium text-[#1a1a1a] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white"
              >
                This week’s times
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar — organic top-right radius */}
        <div className="relative z-20 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="w-full overflow-hidden rounded-tr-[80px] bg-[#e8eae4] sm:rounded-tr-[120px] lg:w-[65%]">
            <div className="grid grid-cols-3">
              {[
                { label: "Families", value: "120+" },
                { label: "Home circles", value: "18" },
                { label: "Years planted", value: "14" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "relative px-4 py-6 sm:px-8 sm:py-8",
                    i > 0 &&
                      "before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-px before:bg-[#dcdacd]/50",
                  )}
                >
                  <p className="text-2xl font-medium tracking-tight text-[#1a1a1a] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5c5c5a]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR HEART ───────────────────────────────────────── */}
      <section
        id="heart"
        className="bg-[#f5f4f0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div
              className="absolute -bottom-8 -right-8 z-0 size-48 rounded-full bg-[#f5f4f0] sm:size-64"
              aria-hidden
            />
            <div className="relative z-10 overflow-hidden rounded-[32px]">
              <img
                src={ASSETS.philosophy}
                alt="Open Bible and quiet morning light"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -left-4 bottom-12 z-20 rounded-full bg-white px-5 py-3 text-xs font-medium text-[#1a1a1a] shadow-sm sm:left-6">
              Scripture-shaped · Table-centered
            </div>
          </div>
          <div>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5d674f]">
              Our heart
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              Space to slow down.
              <br />
              Strength to follow.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5c5c5a] sm:text-lg">
              Soluna is a small church with a calm, contemplative posture — soft
              light, generous hospitality, and faith that grows at a human pace.
              We gather to worship Jesus, open Scripture, and love our neighbors
              without hurry.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Jesus first — every gathering points to Him.",
                "Belonging before performance — come as you are.",
                "Small enough to know your name; open enough for a stranger.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#5c5c5a]"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#5d674f]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/templates/$slug/about"
              params={{ slug }}
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] transition-opacity hover:opacity-70"
            >
              Our story & beliefs
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MINISTRIES ──────────────────────────────────────── */}
      <section
        id="ministries"
        className="border-y border-[#dcdacd] bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5d674f]">
                Ministries
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
                Ways to take root
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollMinistries(-1)}
                className="flex size-11 items-center justify-center rounded-full border border-[#1a1a1a] text-[#1a1a1a] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white"
                aria-label="Scroll ministries left"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollMinistries(1)}
                className="flex size-11 items-center justify-center rounded-full border border-[#1a1a1a] text-[#1a1a1a] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white"
                aria-label="Scroll ministries right"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div
            ref={ministriesRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
          >
            {MINISTRIES.map((m) => (
              <article
                key={m.id}
                className="group min-w-[min(100%,320px)] shrink-0 snap-start rounded-[32px] bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.04)] sm:min-w-[400px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                  <img
                    src={m.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#f2ece5] px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]">
                    {m.level}
                  </span>
                </div>
                <div className="px-2 pb-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-medium tracking-tight text-[#1a1a1a]">
                      {m.name}
                    </h3>
                    <span className="shrink-0 text-xs text-[#a0a09e]">
                      {m.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c5c5a]">
                    {m.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/templates/$slug/ministries"
              params={{ slug }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:opacity-70"
            >
              View all ministries
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ────────────────────────────────────────── */}
      <section
        id="schedule"
        className="bg-[#f5f4f0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-xl">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5d674f]">
              This week
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              Find your hour
            </h2>
            <p className="mt-4 text-base text-[#5c5c5a]">
              Sunday gathering and weekly rhythms · {template.city}
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-[#dcdacd] bg-white">
            {SCHEDULE.map((row, i) => (
              <div
                key={`${row.time}-${row.name}`}
                className={cn(
                  "group flex flex-col gap-4 px-5 py-6 transition-colors duration-300 hover:bg-[#f5f4f0]/50 sm:flex-row sm:items-center sm:gap-6 sm:px-8",
                  i < SCHEDULE.length - 1 && "border-b border-[#dcdacd]",
                )}
              >
                <p className="w-24 shrink-0 text-sm font-medium tabular-nums text-[#1a1a1a]">
                  {row.time}
                </p>
                <div className="min-w-0 flex-1">
                  <p className="font-medium tracking-tight text-[#1a1a1a]">
                    {row.name}
                  </p>
                  <p className="mt-0.5 text-sm text-[#5c5c5a]">{row.place}</p>
                </div>
                <div className="flex items-center gap-3 sm:w-52">
                  {row.initials ? (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8eae4] text-xs font-medium text-[#1a1a1a] grayscale">
                      {row.initials}
                    </span>
                  ) : (
                    <img
                      src={row.avatar}
                      alt=""
                      className="size-10 shrink-0 rounded-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                    />
                  )}
                  <span className="text-sm text-[#5c5c5a]">{row.leader}</span>
                </div>
                <Link
                  to="/templates/$slug/visit"
                  params={{ slug }}
                  className="inline-flex items-center justify-center rounded-full border border-[#1a1a1a] px-5 py-2.5 text-xs font-medium text-[#1a1a1a] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white sm:ml-auto"
                >
                  Visit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIVE ────────────────────────────────────────────── */}
      <section
        id="give"
        className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#5d674f]">
              Generosity
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              Fuel what God is doing
            </h2>
            <p className="mt-4 text-base text-[#5c5c5a]">
              Your gifts sustain worship, kids, care, and neighborhood mission.
              Pause or change anytime.
            </p>

            <div className="mt-8 inline-flex items-center gap-4">
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  !yearly ? "text-[#1a1a1a]" : "text-[#a0a09e]",
                )}
              >
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={yearly}
                onClick={() => setYearly((v) => !v)}
                className={cn(
                  "relative h-8 w-14 rounded-full p-1 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5d674f]",
                  yearly ? "bg-[#5d674f]" : "bg-[#dcdacd]",
                )}
              >
                <span
                  className={cn(
                    "block size-6 rounded-full bg-white shadow-sm transition-transform duration-300",
                    yearly ? "translate-x-6" : "translate-x-0",
                  )}
                />
              </button>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  yearly ? "text-[#1a1a1a]" : "text-[#a0a09e]",
                )}
              >
                Annual
                <span className="ml-1.5 text-[0.625rem] uppercase tracking-wider text-[#5d674f]">
                  −20%
                </span>
              </span>
            </div>
            <div className="sr-only" aria-live="polite">
              {yearly ? "Annual giving selected" : "Monthly giving selected"}
            </div>
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
            {GIVE_TIERS.map((plan) => {
              const amount = yearly ? plan.yearly : plan.monthly;
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col rounded-[32px] p-6 transition-transform duration-300 sm:p-8",
                    plan.popular
                      ? "z-10 bg-[#1a1a1a] text-white shadow-2xl lg:translate-y-[-16px]"
                      : "border border-[#dcdacd] bg-[#f5f4f0] text-[#1a1a1a]",
                  )}
                >
                  {plan.popular ? (
                    <span className="absolute right-6 top-6 rounded-full bg-[#5d674f] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white">
                      Most Common
                    </span>
                  ) : null}
                  <p
                    className={cn(
                      "text-[0.625rem] font-medium uppercase tracking-[0.2em]",
                      plan.popular ? "text-white/60" : "text-[#a0a09e]",
                    )}
                  >
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-medium tracking-tight sm:text-5xl">
                      ${amount}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.popular ? "text-white/50" : "text-[#a0a09e]",
                      )}
                    >
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "flex items-start gap-2.5 text-sm leading-relaxed",
                          plan.popular ? "text-white/80" : "text-[#5c5c5a]",
                        )}
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#5d674f]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/templates/$slug/give"
                    params={{ slug }}
                    className={cn(
                      "mt-8 block w-full rounded-full py-3.5 text-center text-sm font-medium transition-opacity duration-300 hover:opacity-90",
                      plan.popular
                        ? "bg-[#5d674f] text-white"
                        : "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white",
                    )}
                  >
                    {plan.popular ? "Partner monthly" : "Give this way"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#e8eae4] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-[#1a1a1a] sm:text-4xl">
              Ready when you are.
            </h2>
            <p className="mt-3 max-w-md text-[#5c5c5a]">
              Visit us at {template.address}. Coffee is ready, kids check-in is
              simple, and a host will meet you at the door.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="inline-flex items-center justify-center rounded-full bg-[#5d674f] px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Plan a visit
            </Link>
            <Link
              to="/templates/$slug/contact"
              params={{ slug }}
              className="inline-flex items-center justify-center rounded-full border border-[#1a1a1a] px-7 py-3.5 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dcdacd] bg-[#f5f4f0]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-3 lg:px-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-6" />
              <span className="text-sm font-medium">Soluna Church</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#5c5c5a]">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#a0a09e]">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-[#5c5c5a]">
              <li>
                <a href="#heart" className="hover:text-[#1a1a1a]">
                  Our heart
                </a>
              </li>
              <li>
                <a href="#ministries" className="hover:text-[#1a1a1a]">
                  Ministries
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#1a1a1a]">
                  This week
                </a>
              </li>
              <li>
                <a href="#give" className="hover:text-[#1a1a1a]">
                  Give
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#a0a09e]">
              Visit
            </p>
            <p className="text-sm text-[#5c5c5a]">{template.address}</p>
            <p className="mt-2 text-sm text-[#5c5c5a]">{template.phone}</p>
            <p className="mt-1 text-sm text-[#5c5c5a]">{template.email}</p>
          </div>
        </div>
        <div className="border-t border-[#dcdacd]">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-xs text-[#a0a09e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <p>© {new Date().getFullYear()} Soluna Church</p>
            <p>
              Template by{" "}
              <Link to="/" className="font-medium text-[#5d674f] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
