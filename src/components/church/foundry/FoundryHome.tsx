import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";
import { FoundryMark } from "./FoundryShell";

const A = {
  ground:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/el-ground.webp",
  paper:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/el-paper.webp",
  halftone:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/el-halftone.webp",
  card: "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/el-card.webp",
  brush:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/el-brush.webp",
  graf: "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/el-graf.webp",
  motion:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/motion.webp",
  fabric:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/fabric.webp",
  sneaker:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/sneaker.webp",
  crew: "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/lb-crew.webp",
  detail:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/lb-detail.webp",
  x: "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/lb-x.webp",
  skyline:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/skyline.webp",
  texture:
    "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/texture.webp",
  /* Church photography for replaced product/hero subject matter */
  worship:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&q=80&auto=format&fit=crop",
  crowd:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80&auto=format&fit=crop",
  friends:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
  cityNight:
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1600&q=80&auto=format&fit=crop",
  hands:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
};

const MARQUEE_A = [
  "SUNDAY 10AM",
  "WAREHOUSE WORSHIP",
  "TABLE DINNERS",
  "CITY SERVE",
  "OPEN MIC FAITH",
  "BAPTISM IN THE RIVER",
  "DOUBT WELCOME",
];

const MARQUEE_B = [
  "NASHVILLE · 37203",
  "YOUNG ADULTS",
  "CREATIVES",
  "SKEPTICS",
  "NEIGHBORS",
  "MAKERS",
  "THE FOUNDRY",
];

const NEIGHBORHOODS = [
  { name: "The Gulch", note: "Warehouse Row HQ" },
  { name: "East Nashville", note: "Table dinners" },
  { name: "12 South", note: "House hangs" },
  { name: "Germantown", note: "Serve partners" },
  { name: "Midtown", note: "Open mics" },
  { name: "Wedgewood", note: "Art nights" },
  { name: "Sylvan Park", note: "Family tables" },
  { name: "Online", note: "Live stream" },
];

function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = root.querySelectorAll<HTMLElement>(".rv, .rv-l, .atee-skyline-clip, .atee-lead");
    if (reduce) {
      els.forEach((el) => {
        el.classList.add("in", "drawn");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            el.classList.add("in");
            if (el.classList.contains("atee-lead")) el.classList.add("drawn");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.18 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

export function FoundryHome({ template }: { template: TemplateConfig }) {
  const slug = template.slug;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLImageElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [assembled, setAssembled] = useState(false);

  useReveal(rootRef);

  /* Collage assemble on load */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setAssembled(true);
      return;
    }
    const t = window.setTimeout(() => setAssembled(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  /* Motion parallax */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = motionRef.current;
        const plate = plateRef.current;
        if (!sec || !plate) return;
        const r = sec.getBoundingClientRect();
        const p = r.top / (window.innerHeight || 1);
        plate.style.transform = `translate3d(0, ${p * -46}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const pieceStyle = (delay: number, extra?: CSSProperties): CSSProperties => ({
    transitionDelay: assembled ? `${delay}ms` : "0ms",
    ...extra,
  });

  return (
    <div ref={rootRef} className="relative bg-[#F8F3EC] text-[#111010]">
      {/* ── NAV ───────────────────────────────────────────── */}
      <header className="fixed left-0 right-0 top-[var(--grok-banner-h,0px)] z-50 h-[62px] border-b border-[rgba(17,16,16,0.16)] bg-[rgba(248,243,236,0.92)] backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 sm:px-10">
          <a href="#top" className="flex items-center gap-2.5">
            <FoundryMark className="size-8" />
            <span className="font-[family-name:var(--font-display)] text-lg uppercase tracking-[-0.012em]">
              Foundry
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {[
              { label: "Story", href: "#story" },
              { label: "DNA", href: "#dna" },
              { label: "Weekend", href: "#weekend" },
              { label: "Lookbook", href: "#lookbook" },
              { label: "City", href: "#city" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C8880] transition-colors hover:text-[#111010]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="hidden border border-[#111010] bg-[#111010] px-[30px] py-[12px] font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#F8F3EC] transition-colors duration-300 hover:border-[#DC201E] hover:bg-[#DC201E] sm:inline-flex"
            >
              Come Hang
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center border border-[rgba(17,16,16,0.16)] lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[55] flex-col bg-[#F8F3EC] px-6 pt-24 lg:hidden",
          menuOpen ? "flex" : "hidden",
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute right-5 top-[calc(var(--grok-banner-h,0px)+0.75rem)] flex size-10 items-center justify-center border border-[rgba(17,16,16,0.16)]"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X className="size-5" />
        </button>
        <nav className="flex flex-col" aria-label="Mobile">
          {[
            { label: "Story", href: "#story" },
            { label: "DNA", href: "#dna" },
            { label: "Weekend", href: "#weekend" },
            { label: "Lookbook", href: "#lookbook" },
            { label: "City", href: "#city" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[rgba(17,16,16,0.12)] py-4 font-[family-name:var(--font-display)] text-3xl uppercase tracking-[-0.012em]"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/templates/$slug/visit"
            params={{ slug }}
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex items-center justify-center bg-[#DC201E] px-8 py-4 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.14em] text-white"
          >
            Come Hang
          </Link>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#8C8880]"
          >
            ← Axon templates
          </Link>
        </nav>
      </div>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        id="top"
        className="relative overflow-hidden pt-[62px]"
        style={{ minHeight: "min(100svh, 920px)" }}
      >
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-8 lg:py-20">
          {/* Copy column */}
          <div className="relative z-10 order-2 lg:order-1">
            <p className="rv font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Nashville · Warehouse church
            </p>
            <h1
              className="rv mt-4 font-[family-name:var(--font-display)] uppercase leading-[0.92] tracking-[-0.012em] text-[#111010]"
              style={{ fontSize: "clamp(52px, 7.4vw, 116px)" }}
            >
              Own the
              <br />
              streets.
              <br />
              <span className="text-[#DC201E]">Find a home.</span>
            </h1>
            <p className="rv mt-6 max-w-md text-[17px] font-normal leading-[1.62] text-[#8C8880]">
              Church for the curious, creative, and city-minded — no polish tax,
              no performance required. Tables in apartments. Worship in a
              warehouse.
            </p>
            <div className="rv mt-8 flex flex-wrap gap-3">
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                className="inline-flex items-center justify-center bg-[#DC201E] px-[30px] py-[15px] font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#111010]"
              >
                Come Hang
              </Link>
              <Link
                to="/templates/$slug/sermons"
                params={{ slug }}
                className="inline-flex items-center justify-center border border-[#111010] bg-transparent px-[30px] py-[15px] font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#111010] transition-colors duration-300 hover:bg-[#111010] hover:text-[#F8F3EC]"
              >
                Listen to a Talk
              </Link>
            </div>
            <dl className="rv mt-10 grid grid-cols-3 gap-4 border-t border-[rgba(17,16,16,0.16)] pt-6">
              {[
                { k: "Gathering", v: "Sun 10AM" },
                { k: "City", v: "Nashville" },
                { k: "Vibe", v: "Warehouse" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#8C8880]">
                    {s.k}
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] text-xl uppercase tracking-[-0.012em]">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Collage stage */}
          <div
            ref={stageRef}
            className={cn(
              "atee-stage relative order-1 aspect-[4/5] w-full max-w-[640px] justify-self-center lg:order-2 lg:max-w-none lg:justify-self-stretch",
              assembled && "assembled",
            )}
          >
            {/* Ground plate — paper grain + photo base */}
            <img
              src={A.ground}
              alt=""
              className="piece absolute inset-0 h-full w-full object-cover"
              style={pieceStyle(140)}
              aria-hidden
            />
            <img
              src={A.crowd}
              alt=""
              className="piece absolute inset-[6%] h-[88%] w-[88%] object-cover contrast-[1.08] grayscale-[20%]"
              style={pieceStyle(180)}
              aria-hidden
            />
            <img
              src={A.paper}
              alt=""
              className="piece absolute left-[-6%] top-[20%] w-[48%] -rotate-[4deg] object-contain drop-shadow-[0_34px_80px_rgba(17,16,16,0.26)]"
              style={pieceStyle(280)}
              aria-hidden
            />
            <img
              src={A.halftone}
              alt=""
              className="piece absolute bottom-[9%] left-[6%] w-[42%] object-contain opacity-90 mix-blend-multiply"
              style={pieceStyle(420)}
              aria-hidden
            />
            {/* Primary photo card — worship/crowd cutout treatment */}
            <div
              className="piece absolute right-[1%] top-[4%] z-[5] w-[50%] -rotate-[2deg] drop-shadow-[0_34px_80px_rgba(17,16,16,0.32)]"
              style={pieceStyle(560)}
            >
              <img
                src={A.worship}
                alt="Foundry gathering"
                className="w-full object-cover contrast-[1.08]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#111010] px-3 py-2">
                <p className="font-[family-name:var(--font-mono)] text-[9px] font-medium uppercase tracking-[0.14em] text-[#F8F3EC]">
                  Warehouse Row · Sun 10
                </p>
              </div>
            </div>
            <img
              src={A.brush}
              alt=""
              className="piece absolute left-[-2%] top-[52%] z-[6] w-[42%] object-contain drop-shadow-[0_18px_40px_rgba(17,16,16,0.2)]"
              style={pieceStyle(680)}
              aria-hidden
            />
            <img
              src={A.graf}
              alt=""
              className="piece absolute right-[-3%] top-[5%] z-[7] w-[34%] object-contain"
              style={pieceStyle(790)}
              aria-hidden
            />
            {/* Floating mono chip */}
            <div
              className="piece absolute bottom-[14%] right-[8%] z-[8] bg-[#DC201E] px-3 py-2"
              style={pieceStyle(820)}
            >
              <p className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                Est. 2019
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <section className="atee-marquee overflow-hidden border-y-2 border-[#DC201E] bg-[#111010]" aria-hidden="true">
        <div className="flex whitespace-nowrap py-3 text-[#F8F3EC]">
          <div className="atee-marquee-track flex shrink-0 items-center gap-[44px] pr-[44px]">
            {[...MARQUEE_A, ...MARQUEE_A].map((t, i) => (
              <span key={`a-${i}`} className="flex items-center gap-[44px]">
                <span className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[-0.012em] sm:text-3xl">
                  {t}
                </span>
                <span className="inline-block size-2 rounded-full bg-[#DC201E]" />
              </span>
            ))}
          </div>
          <div className="atee-marquee-track flex shrink-0 items-center gap-[44px] pr-[44px]">
            {[...MARQUEE_A, ...MARQUEE_A].map((t, i) => (
              <span key={`a2-${i}`} className="flex items-center gap-[44px]">
                <span className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[-0.012em] sm:text-3xl">
                  {t}
                </span>
                <span className="inline-block size-2 rounded-full bg-[#DC201E]" />
              </span>
            ))}
          </div>
        </div>
        <div className="flex whitespace-nowrap border-t-2 border-[#DC201E] bg-[#DC201E] py-2.5 text-white">
          <div className="atee-marquee-track-b flex shrink-0 items-center gap-[44px] pr-[44px]">
            {[...MARQUEE_B, ...MARQUEE_B].map((t, i) => (
              <span
                key={`b-${i}`}
                className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="atee-marquee-track-b flex shrink-0 items-center gap-[44px] pr-[44px]">
            {[...MARQUEE_B, ...MARQUEE_B].map((t, i) => (
              <span
                key={`b2-${i}`}
                className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOTION / STORY ────────────────────────────────── */}
      <section
        id="story"
        ref={motionRef}
        className="relative min-h-[70vh] overflow-hidden bg-[#111010]"
      >
        <img
          ref={plateRef}
          src={A.cityNight}
          alt=""
          className="absolute inset-[-8%_0] h-[116%] w-full object-cover will-change-transform contrast-[1.05] grayscale-[15%]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#111010] via-[#111010]/55 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1360px] flex-col justify-end px-5 pb-[9%] pt-32 sm:px-10">
          <p className="rv font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
            Built for the city
          </p>
          <h2
            className="rv mt-3 max-w-3xl font-[family-name:var(--font-display)] uppercase leading-[0.98] tracking-[-0.012em] text-[#F8F3EC]"
            style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
          >
            Built for your{" "}
            <em className="not-italic text-[#DC201E]">movement</em>
          </h2>
          <p className="rv mt-5 max-w-lg text-[17px] leading-[1.62] text-[#8C8880]">
            Faith that walks the block — tables in apartments, worship in a
            warehouse, justice on sidewalks. We move with Nashville's
            rhythm and refuse to leave anyone on the curb.
          </p>
        </div>
      </section>

      {/* ── DNA / FABRIC ──────────────────────────────────── */}
      <section id="dna" className="bg-[#F8F3EC] px-5 py-[110px] sm:px-10">
        <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative">
            <img
              src={A.hands}
              alt="Community detail"
              className="rv w-full object-cover contrast-[1.05] grayscale-[10%]"
            />
            <svg
              className="atee-lead pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M8,14 L34,30"
                fill="none"
                stroke="#DC201E"
                strokeWidth="0.6"
                style={{ ["--L" as string]: 40 }}
              />
              <path
                d="M92,78 L64,62"
                fill="none"
                stroke="#DC201E"
                strokeWidth="0.6"
                style={{ ["--L" as string]: 40 }}
              />
            </svg>
          </div>
          <div>
            <p className="rv font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Our DNA
            </p>
            <h2
              className="rv mt-3 font-[family-name:var(--font-display)] uppercase leading-[0.98] tracking-[-0.012em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Engineered
              <br />
              for belonging
            </h2>
            <p className="rv mt-5 text-[17px] leading-[1.62] text-[#8C8880]">
              The Foundry isn't a show. It's a crew — skeptics,
              artists, neighbors — apprenticed to Jesus in ordinary rooms.
            </p>
            <dl className="rv mt-8 border-t-[1.5px] border-[#111010]">
              {template.beliefs.map((b) => (
                <div
                  key={b}
                  className="grid grid-cols-[100px_1fr] gap-4 border-b border-[rgba(17,16,16,0.16)] py-4 sm:grid-cols-[140px_1fr]"
                >
                  <dt className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
                    Spec
                  </dt>
                  <dd className="text-[15px] leading-[1.5] text-[#111010]">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── WEEKEND / PRODUCT ─────────────────────────────── */}
      <section id="weekend" className="bg-[#111010] px-5 py-[110px] text-[#F8F3EC] sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="rv mb-14 text-center">
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Weekend experience
            </p>
            <h2
              className="mt-3 font-[family-name:var(--font-display)] uppercase leading-[0.95] tracking-[-0.012em]"
              style={{ fontSize: "clamp(40px, 6vw, 90px)" }}
            >
              Own the{" "}
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "2px #F8F3EC",
                }}
              >
                Street
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[17px] leading-[1.62] text-[#8C8880]">
              Sunday gathering · ambient band · honest teaching · zero dress code
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <img
              src={A.worship}
              alt="Foundry weekend culture"
              className="rv mx-auto w-full max-w-lg object-cover contrast-[1.08] drop-shadow-[0_34px_80px_rgba(0,0,0,0.45)]"
            />
            {/* Orbit chips */}
            <span className="rv absolute left-0 top-[12%] border border-[#F8F3EC]/30 bg-[#F8F3EC] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#111010] sm:left-[-4%]">
              Live band
            </span>
            <span className="rv absolute right-0 top-[22%] border border-[#F8F3EC]/30 bg-[#F8F3EC] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#111010] sm:right-[-2%]">
              Real talk
            </span>
            <span className="rv absolute bottom-[28%] left-[2%] border border-[#F8F3EC]/30 bg-[#F8F3EC] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#111010]">
              Coffee free
            </span>
            <span className="rv absolute bottom-[18%] right-[4%] bg-[#DC201E] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Sun 10:00 AM
            </span>
          </div>

          <div className="rv mt-16 grid gap-px bg-[rgba(248,243,236,0.12)] sm:grid-cols-3">
            {template.serviceTimes.map((s) => (
              <div key={`${s.day}-${s.time}`} className="bg-[#111010] p-6">
                <p className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
                  {s.day}
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase tracking-[-0.012em]">
                  {s.time}
                </p>
                {s.note ? (
                  <p className="mt-2 text-sm text-[#8C8880]">{s.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ──────────────────────────────────────── */}
      <section id="lookbook" className="overflow-hidden bg-[#F8F3EC] px-5 py-[110px] sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="rv font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
                Community lookbook
              </p>
              <h2
                className="rv mt-3 font-[family-name:var(--font-display)] uppercase leading-[0.98] tracking-[-0.012em]"
                style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
              >
                Faces of
                <br />
                the foundry
              </h2>
            </div>
            <p className="rv max-w-sm text-[15px] leading-[1.62] text-[#8C8880]">
              Cutouts from real nights — dinners, worship, river baptisms. No
              stock smiles. Just the crew.
            </p>
          </div>

          <div className="relative mx-auto grid max-w-4xl grid-cols-12 gap-4 pb-10">
            <img
              src={A.friends}
              alt="Community crew"
              className="rv col-span-8 w-full -rotate-[1.4deg] object-cover contrast-[1.05] drop-shadow-[0_22px_42px_rgba(17,16,16,0.24)]"
            />
            <img
              src={A.crew}
              alt="Detail cutout"
              className="rv col-span-5 col-start-7 -mt-16 w-full rotate-[2.2deg] object-contain drop-shadow-[0_22px_42px_rgba(17,16,16,0.24)] sm:-mt-24"
            />
            <img
              src={A.x}
              alt=""
              className="rv absolute right-[8%] top-[10%] z-[3] w-16 object-contain opacity-90 sm:w-24"
              aria-hidden
            />
            <img
              src={A.graf}
              alt=""
              className="rv absolute bottom-[5%] left-[4%] z-[4] w-28 object-contain opacity-80 sm:w-40"
              aria-hidden
            />
            <img
              src={A.detail}
              alt=""
              className="rv absolute bottom-[20%] right-[2%] z-[2] w-24 -rotate-[3deg] object-contain opacity-90 drop-shadow-[0_22px_42px_rgba(17,16,16,0.24)] sm:w-32"
              aria-hidden
            />
          </div>

          <div className="rv mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {template.ministries.map((m) => (
              <div
                key={m.id}
                className="border border-[rgba(17,16,16,0.16)] bg-[#F8F3EC] p-5"
              >
                <p className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
                  {m.audience}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[-0.012em]">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8C8880]">{m.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES ────────────────────────────────────────── */}
      <section id="city" className="bg-[#F8F3EC] px-5 pb-[110px] sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="relative mb-12 overflow-hidden">
            <img
              src={A.skyline}
              alt="Nashville skyline"
              className="atee-skyline-clip h-[280px] w-full object-cover sm:h-[380px]"
              style={{ objectPosition: "center 42%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3EC] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 px-2">
              <h2
                className="rv font-[family-name:var(--font-display)] uppercase leading-[0.95] tracking-[-0.012em] text-[#111010]"
                style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
              >
                Across the
                <br />
                <span className="text-[#DC201E]">city grid</span>
              </h2>
            </div>
          </div>

          <ul className="rv grid grid-cols-2 gap-px bg-[rgba(17,16,16,0.16)] md:grid-cols-4">
            {NEIGHBORHOODS.map((n) => (
              <li
                key={n.name}
                className="bg-[#F8F3EC] p-5 transition-colors duration-300 hover:bg-[#111010] hover:text-[#F8F3EC] group"
              >
                <p className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[-0.012em]">
                  {n.name}
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-[#8C8880] group-hover:text-[#DC201E]">
                  {n.note}
                </p>
              </li>
            ))}
          </ul>

          <div className="rv mt-14 flex flex-col items-start justify-between gap-6 border-t border-[rgba(17,16,16,0.16)] pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
                This Sunday
              </p>
              <p className="mt-2 max-w-md text-[17px] leading-[1.62] text-[#8C8880]">
                {template.address} · Doors open 9:40 · Kids welcome · Stay for
                lunch.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                className="inline-flex bg-[#DC201E] px-[30px] py-[15px] font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#111010]"
              >
                Plan Your Visit
              </Link>
              <Link
                to="/templates/$slug/events"
                params={{ slug }}
                className="inline-flex border border-[#111010] px-[30px] py-[15px] font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#111010] transition-colors duration-300 hover:bg-[#111010] hover:text-white"
              >
                Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-[rgba(17,16,16,0.16)] bg-[#111010] text-[#F8F3EC]">
        <img
          src={A.texture}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1360px] gap-10 px-5 py-16 sm:px-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <FoundryMark className="size-8" />
              <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[-0.012em]">
                The Foundry
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-[1.62] text-[#8C8880]">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Jump
            </p>
            <ul className="space-y-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C8880]">
              {["#story", "#dna", "#weekend", "#lookbook", "#city"].map((h) => (
                <li key={h}>
                  <a href={h} className="hover:text-[#F8F3EC]">
                    {h.replace("#", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Contact
            </p>
            <p className="text-sm text-[#8C8880]">{template.address}</p>
            <p className="mt-2 text-sm text-[#8C8880]">{template.phone}</p>
            <p className="mt-1 text-sm text-[#8C8880]">{template.email}</p>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-5 py-4 text-xs text-[#8C8880] sm:flex-row sm:justify-between sm:px-10">
            <p>© {new Date().getFullYear()} The Foundry Church · Own The Streets</p>
            <p>
              Template by{" "}
              <Link to="/" className="text-[#DC201E] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
