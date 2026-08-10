import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  LayoutTemplate,
  Sparkles,
  Zap,
} from "lucide-react";
import { templates, type TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: PortfolioHub,
  head: () => ({
    meta: [{ title: "Axon Church — Ministry Website Templates" }],
  }),
});

const sizes = [
  "All",
  "Small",
  "Mid-size",
  "Multi-campus",
  "Young Adult",
] as const;

const EXPERIENCE = [
  {
    title: "Research-backed IA",
    body: "Service times, Plan Your Visit, sermons, groups, and give—ordered by how guests actually use church sites.",
  },
  {
    title: "Full-site templates",
    body: "Not wireframes. Every template ships multi-page navigation, forms, and mobile-ready layouts.",
  },
  {
    title: "Distinct visual systems",
    body: "Café Nova, Aura, Literary Minimalism, ATEEVIBES, Soluna—each brand-ready out of the box.",
  },
  {
    title: "Deploy-ready stack",
    body: "TanStack Start + Tailwind on a single Vercel instance. One portfolio, six complete churches.",
  },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Launch",
    blurb: "One template, brand polish, and launch support for plants and small churches.",
    features: [
      "1 template license",
      "Brand color & logo pass",
      "Visit + give pages",
      "30-day support",
    ],
    featured: false,
  },
  {
    id: "studio",
    name: "Studio",
    price: "Grow",
    blurb: "Full multisite-ready package with pathways, groups, and sermon library.",
    features: [
      "Any template + extras",
      "Custom ministries map",
      "Next Steps funnel",
      "Priority support",
      "Analytics setup",
    ],
    featured: true,
  },
  {
    id: "partner",
    name: "Partner",
    price: "Scale",
    blurb: "Agency partnership for networks, campuses, and ongoing design systems.",
    features: [
      "Multi-campus kit",
      "Design system handoff",
      "Quarterly iterations",
      "Training for staff",
    ],
    featured: false,
  },
];

const JOURNAL = [
  {
    title: "What makes a church site convert visitors",
    tag: "Research",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a05f0aa5-f35d-424d-b935-44a313a63370_800w.jpg",
  },
  {
    title: "Brochure vs hybrid: the 2026 church web split",
    tag: "Strategy",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/b10efcc0-c7dc-48ca-97f3-2dfb4b4412e7/800w.jpg",
  },
  {
    title: "How we score templates for growth & retention",
    tag: "Product",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/4d5ff6ae-a88d-4c96-9f75-2848f5c780dc/800w.png",
  },
];

function PortfolioHub() {
  const [size, setSize] = useState<(typeof sizes)[number]>("All");

  const filtered = useMemo(() => {
    if (size === "All") return templates;
    return templates.filter((t) => t.size === size);
  }, [size]);

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-[#F7F7F5]">
      {/* Sticky nav */}
      <header className="sticky top-[var(--grok-banner-h,0px)] z-50 border-b border-black/[0.06] bg-[#F7F7F5]/80 backdrop-blur-md">
        <div className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand/logo-h-lgt.png"
              alt="Axon Church"
              className="h-9 w-auto"
            />
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {[
              { label: "Work", href: "#work" },
              { label: "Approach", href: "#approach" },
              { label: "Investment", href: "#investment" },
              { label: "Journal", href: "#journal" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#737373] transition-colors hover:text-[#1A1A1A]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#work"
            className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#4F46E5]"
          >
            Browse templates
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* Guide frame */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full max-w-[1400px] -translate-x-1/2">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-black/[0.06]" />
          <div className="absolute bottom-0 right-6 top-0 w-px bg-black/[0.06]" />
        </div>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-16 sm:pt-24">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
                Axon Ministry Solutions
              </p>
              <h1 className="mt-4 text-[clamp(3rem,10vw,7.5rem)] font-light leading-[0.85] tracking-[-0.05em] text-[#1A1A1A]">
                Church sites
                <br />
                that welcome.
              </h1>
              <p className="mt-8 max-w-md text-base font-normal leading-[1.6] text-[#737373]">
                Six production-ready website templates for churches—from quiet
                plants to multi-campus networks. Designed for growth, retention,
                and first-time guests.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-7 py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#4F46E5]"
                >
                  View templates
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href="#investment"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-3.5 text-sm font-semibold transition-transform active:scale-95 hover:border-black/20"
                >
                  Investment
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="absolute inset-4 -rotate-3 scale-95 rounded-[3rem] bg-[#EFEFEA]" aria-hidden />
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img
                  src="/brand/logo-hero-lgt.png"
                  alt="Axon Church brand"
                  className="aspect-[4/5] w-full object-cover object-center bg-[#0A0A0A] p-10 grayscale transition duration-700 hover:grayscale-0 sm:p-14"
                />
              </div>
              <div className="absolute bottom-10 -left-4 z-20 animate-[bounce_3s_ease-in-out_infinite] rounded-full bg-[#E0E7FF] px-4 py-2 text-xs font-semibold text-[#4F46E5] shadow-lg lg:left-0">
                {templates.length} live templates
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 flex flex-wrap items-stretch gap-8 border-t border-black/10 pt-10">
            {[
              { v: String(templates.length), l: "Full church sites" },
              { v: "15+", l: "Ministry patterns ranked" },
              { v: "100%", l: "Mobile & visit-ready" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={cn(
                  "pr-8",
                  i < 2 && "border-r border-black/10",
                )}
              >
                <p className="text-3xl font-light tracking-[-0.05em] sm:text-4xl">
                  {s.v}
                </p>
                <p className="mt-1 text-sm text-[#737373]">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WORK / TEMPLATES ─────────────────────────────── */}
        <section id="work" className="relative mx-auto max-w-[1400px] px-6 py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
                Selected work
              </p>
              <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Template gallery
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                    size === s
                      ? "bg-[#1A1A1A] text-white"
                      : "bg-black/5 text-[#737373] hover:bg-black/10",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TemplateCard key={t.slug} template={t} />
            ))}
          </div>
        </section>

        {/* ── INVESTMENT (dark) ────────────────────────────── */}
        <section id="investment" className="bg-[#0A0A0A] py-24 text-white">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-12 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E0E7FF]/70">
                Investment
              </p>
              <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Pick a partnership
              </h2>
              <p className="mt-4 text-[#737373]">
                Transparent packages for churches and ministries ready to ship a
                high-performance site.
              </p>
            </div>

            {/* Browser mockup */}
            <div className="overflow-hidden rounded-[2.5rem] bg-[#141414] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
                <div className="flex gap-2">
                  <span className="size-3 rounded-full bg-[#FF5F57]" />
                  <span className="size-3 rounded-full bg-[#FEBC2E]" />
                  <span className="size-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="mx-auto flex-1 max-w-md rounded-full bg-white/5 px-4 py-1.5 text-center text-xs text-white/40">
                  axon.church/templates/pricing
                </div>
              </div>

              <div className="grid gap-4 p-6 sm:p-8 lg:grid-cols-3">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative overflow-hidden rounded-[2rem] p-6 sm:p-8",
                      plan.featured
                        ? "bg-[#E0E7FF] text-[#1A1A1A]"
                        : "border border-white/5 bg-[#1D1D1D] text-white",
                    )}
                  >
                    {plan.featured ? (
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/20"
                        aria-hidden
                      />
                    ) : null}
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-[0.18em]",
                        plan.featured ? "text-[#4F46E5]" : "text-white/40",
                      )}
                    >
                      {plan.name}
                    </p>
                    <p className="mt-3 text-3xl font-light tracking-tight">
                      {plan.price}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-relaxed",
                        plan.featured ? "text-[#1A1A1A]/70" : "text-white/50",
                      )}
                    >
                      {plan.blurb}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className={cn(
                            "flex items-center gap-2 text-sm",
                            plan.featured ? "text-[#1A1A1A]/80" : "text-white/70",
                          )}
                        >
                          <Check
                            className={cn(
                              "size-4 shrink-0",
                              plan.featured ? "text-[#4F46E5]" : "text-[#E0E7FF]",
                            )}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#work"
                      className={cn(
                        "mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-transform active:scale-95",
                        plan.featured
                          ? "bg-[#1A1A1A] text-white hover:bg-[#4F46E5]"
                          : "bg-white/10 text-white hover:bg-white/15",
                      )}
                    >
                      Choose {plan.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── APPROACH ─────────────────────────────────────── */}
        <section id="approach" className="relative mx-auto max-w-[1400px] px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
            Approach
          </p>
          <h2 className="mt-3 max-w-xl text-4xl font-light tracking-[-0.05em] sm:text-5xl">
            How Axon builds for ministry
          </h2>
          <div className="mt-12 grid gap-4">
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.title}
                className="group flex flex-col gap-4 rounded-[2rem] border border-black/[0.06] bg-white p-6 transition duration-300 hover:border-black/20 hover:shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-8"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F7F7F5] transition duration-300 group-hover:bg-[#1A1A1A] group-hover:text-white">
                  {i === 0 ? (
                    <Sparkles className="size-5" />
                  ) : i === 1 ? (
                    <LayoutTemplate className="size-5" />
                  ) : i === 2 ? (
                    <Zap className="size-5" />
                  ) : (
                    <Check className="size-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#737373]">
                    {item.body}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#737373]">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── JOURNAL ──────────────────────────────────────── */}
        <section id="journal" className="relative mx-auto max-w-[1400px] px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4F46E5]">
                Journal
              </p>
              <h2 className="mt-3 text-4xl font-light tracking-[-0.05em]">
                Notes from the lab
              </h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {JOURNAL.map((j) => (
              <article
                key={j.title}
                className="group overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={j.image}
                    alt=""
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4F46E5]">
                    {j.tag}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-[-0.025em] leading-snug">
                    {j.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="relative mx-auto max-w-[1400px] px-6 pb-24">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] px-8 py-16 text-center text-white sm:px-16">
            <img
              src="/brand/logo-v-drk.png"
              alt=""
              className="mx-auto h-16 w-auto opacity-90"
            />
            <h2 className="mt-8 text-3xl font-light tracking-[-0.05em] sm:text-5xl">
              Ready to pick a template?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
              Open any demo, switch between sites with breadcrumbs, and come back
              here anytime.
            </p>
            <a
              href="#work"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E0E7FF] px-8 py-3.5 text-sm font-semibold text-[#4F46E5] transition-transform active:scale-95 hover:bg-white"
            >
              Browse all templates
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] bg-[#F7F7F5]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-14 sm:flex-row sm:justify-between">
          <div>
            <img
              src="/brand/logo-h-lgt.png"
              alt="Axon Church"
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#737373]">
              Axon Ministry Solutions — church website templates built for
              welcome, growth, and mission.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#737373]">
                Navigation
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#work" className="hover:text-[#4F46E5]">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#approach" className="hover:text-[#4F46E5]">
                    Approach
                  </a>
                </li>
                <li>
                  <a href="#investment" className="hover:text-[#4F46E5]">
                    Investment
                  </a>
                </li>
                <li>
                  <a href="#journal" className="hover:text-[#4F46E5]">
                    Journal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#737373]">
                Templates
              </p>
              <ul className="space-y-2 text-sm">
                {templates.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to="/templates/$slug"
                      params={{ slug: t.slug }}
                      className="hover:text-[#4F46E5]"
                    >
                      {t.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-black/[0.06]">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-4 text-xs text-[#737373] sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Axon Ministry Solutions</p>
            <p>Church website templates · Demo portfolio</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TemplateCard({ template: t }: { template: TemplateConfig }) {
  return (
    <Link
      to="/templates/$slug"
      params={{ slug: t.slug }}
      className="group relative block overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/[0.04] transition duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={t.heroImage}
          alt=""
          className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100" />
        <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-[#1A1A1A] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] backdrop-blur">
          {t.size}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4F46E5]">
          {t.style}
        </p>
        <h3 className="mt-2 text-xl font-medium tracking-[-0.025em]">
          {t.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#737373]">
          {t.tagline}
        </p>
        <p className="mt-4 text-sm font-semibold text-[#1A1A1A] transition-colors group-hover:text-[#4F46E5]">
          Open demo →
        </p>
      </div>
    </Link>
  );
}
