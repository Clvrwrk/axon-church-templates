import {
  useState,
  type ComponentType,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Baby,
  Calendar,
  Check,
  Church,
  Clock,
  Compass,
  Globe,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Play,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SolunaHome } from "@/components/church/soluna/SolunaHome";
import { FoundryHome } from "@/components/church/foundry/FoundryHome";
import { RootedHome } from "@/components/church/rooted/RootedHome";
import { CitylightHome } from "@/components/church/citylight/CitylightHome";
import { NorthbridgeHome } from "@/components/church/northbridge/NorthbridgeHome";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Baby,
  Users,
  Home,
  HandHeart,
  GraduationCap,
  MessageCircle,
  HeartHandshake,
  Heart,
  Compass,
  Sparkles,
  Globe,
  Zap,
  Palette,
  MapPin,
};

function MinistryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Church;
  return <Icon className={className} />;
}

function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-4 py-16 sm:px-6 sm:py-20", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function DisplayHeading({
  children,
  className,
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-display)] font-semibold tracking-tight text-fg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

function SuccessBanner({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-[var(--radius)] border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-fg"
    >
      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>{message}</p>
    </div>
  );
}

const routes = {
  home: "/templates/$slug",
  visit: "/templates/$slug/visit",
  about: "/templates/$slug/about",
  sermons: "/templates/$slug/sermons",
  events: "/templates/$slug/events",
  ministries: "/templates/$slug/ministries",
  give: "/templates/$slug/give",
  contact: "/templates/$slug/contact",
  groups: "/templates/$slug/groups",
  recovery: "/templates/$slug/recovery",
  nextSteps: "/templates/$slug/next-steps",
  locations: "/templates/$slug/locations",
  prayer: "/templates/$slug/prayer",
} as const;


/* ─── HOME ─────────────────────────────────────────────────────────── */

export function HomePage({ template }: { template: TemplateConfig }) {
  if (template.slug === "soluna") {
    return <SolunaHome template={template} />;
  }
  if (template.slug === "modern") {
    return <FoundryHome template={template} />;
  }
  if (template.slug === "discipleship") {
    return <RootedHome template={template} />;
  }
  if (template.slug === "multisite") {
    return <CitylightHome template={template} />;
  }
  if (template.slug === "growth") {
    return <NorthbridgeHome template={template} />;
  }

  const slug = template.slug;
  const featured = template.sermons[0];

  return (
    <>
      <section className="relative min-h-[min(88vh,820px)] overflow-hidden">
        <img
          src={template.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/50 to-transparent" />

        <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <div className="mb-6 flex flex-wrap gap-2">
            {template.serviceTimes.map((s, i) => (
              <Badge key={i} variant="secondary" className="bg-surface/90 backdrop-blur">
                <Clock className="mr-1 size-3" />
                {s.day} {s.time}
                {s.note ? ` · ${s.note}` : ""}
              </Badge>
            ))}
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {template.accentWord}
          </p>
          <DisplayHeading className="max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {template.name}
          </DisplayHeading>
          <p className="mt-4 max-w-xl text-lg text-muted sm:text-xl">{template.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={routes.visit} params={{ slug }}>
                {template.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-surface/50 backdrop-blur">
              <Link to={routes.sermons} params={{ slug }}>
                {template.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">
              Who we are
            </Badge>
            <DisplayHeading as="h2" className="text-3xl sm:text-4xl">
              A church family in {template.city}
            </DisplayHeading>
            <p className="mt-4 text-muted leading-relaxed">{template.description}</p>
            <ul className="mt-6 space-y-3">
              {template.beliefs.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8" variant="secondary">
              <Link to={routes.about} params={{ slug }}>
                About us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {template.gallery.slice(0, 4).map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={cn(
                  "h-36 w-full rounded-[var(--radius)] object-cover sm:h-44",
                  i % 2 === 1 && "mt-6",
                )}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface border-y border-border">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <DisplayHeading as="h2" className="text-3xl sm:text-4xl">
              Ministries for every season
            </DisplayHeading>
            <p className="mt-2 text-muted">Find where you fit this week.</p>
          </div>
          <Button asChild variant="outline">
            <Link to={routes.ministries} params={{ slug }}>
              View all
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {template.ministries.map((m) => (
            <div
              key={m.id}
              className="group rounded-[var(--radius)] border border-border bg-bg p-5 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MinistryIcon name={m.icon} className="size-5" />
              </div>
              <h3 className="font-semibold">{m.name}</h3>
              <p className="mt-1 text-xs font-medium text-accent">{m.audience}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{m.blurb}</p>
            </div>
          ))}
        </div>
      </Section>

      {featured ? (
        <Section>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px]">
                <img
                  src={featured.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-bg/30">
                  <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-fg shadow-lg">
                    <Play className="size-6 fill-current" />
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <Badge variant="accent" className="w-fit">
                  Latest message
                </Badge>
                <DisplayHeading as="h2" className="mt-4 text-2xl sm:text-3xl">
                  {featured.title}
                </DisplayHeading>
                <p className="mt-2 text-sm text-muted">
                  {featured.series} · {featured.speaker} · {featured.date} ·{" "}
                  {featured.duration}
                </p>
                <Button asChild className="mt-6 w-fit">
                  <Link to={routes.sermons} params={{ slug }}>
                    Watch & browse archive
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      <Section className="bg-primary text-primary-fg">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <DisplayHeading as="h2" className="text-3xl text-primary-fg sm:text-4xl">
              {template.accentWord}
            </DisplayHeading>
            <p className="mt-3 text-primary-fg/80">
              Join us this weekend in {template.city}. We'd love to meet you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <Link to={routes.visit} params={{ slug }}>
                {template.ctaPrimary}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-fg/30 text-primary-fg hover:bg-primary-fg/10"
            >
              <Link to={routes.contact}
              params={{ slug }}>Contact us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ─── VISIT ────────────────────────────────────────────────────────── */

export function VisitPage({ template }: { template: TemplateConfig }) {
  const [sent, setSent] = useState(false);
  const slug = template.slug;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Section className="pb-10 pt-12 sm:pt-16">
        <Badge variant="outline">First time?</Badge>
        <DisplayHeading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
          Plan your visit
        </DisplayHeading>
        <p className="mt-4 max-w-xl text-lg text-muted">
          We want your first Sunday to feel easy. Here's everything you need
          before you walk through the doors at {template.name}.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick a service",
              body: "Choose a time that fits. Kids environments open 15 minutes early.",
            },
            {
              step: "02",
              title: "Know where to go",
              body: template.address,
            },
            {
              step: "03",
              title: "Come as you are",
              body: "Casual clothes, curious hearts. Coffee is on us in the lobby.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-[var(--radius)] border border-border bg-surface p-6"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl text-primary/40">
                {s.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-y border-border bg-surface">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <DisplayHeading as="h2" className="text-3xl">
              Service times
            </DisplayHeading>
            <ul className="mt-6 space-y-3">
              {template.serviceTimes.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-bg px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-primary" />
                    <div>
                      <p className="font-semibold">{s.day}</p>
                      {s.note ? <p className="text-xs text-muted">{s.note}</p> : null}
                    </div>
                  </div>
                  <p className="text-lg font-semibold">{s.time}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-3 text-sm text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{template.address}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-bg p-6 sm:p-8">
            <DisplayHeading as="h2" className="text-2xl">
              Pre-register your family
            </DisplayHeading>
            <p className="mt-2 text-sm text-muted">
              We'll have name tags ready and a host waiting.
            </p>
            {sent ? (
              <div className="mt-6">
                <SuccessBanner message="You're registered! We'll email a parking tip and kids check-in details within the hour." />
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required />
                  <Input name="email" type="email" placeholder="Email" required />
                </div>
                <Input name="kids" placeholder="Kids ages (optional)" />
                <select
                  name="service"
                  className="flex h-11 w-full rounded-[var(--radius)] border border-border bg-surface px-3.5 text-sm text-fg"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {template.serviceTimes.map((s, i) => (
                    <option key={i} value={`${s.day} ${s.time}`}>
                      {s.day} {s.time}
                      {s.note ? ` — ${s.note}` : ""}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="w-full">
                  Submit visit plan
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {template.gallery.slice(0, 3).map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-52 w-full rounded-[var(--radius)] object-cover"
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="secondary">
            <Link to={routes.contact}
              params={{ slug }}>Questions? Contact us</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

/* ─── ABOUT ────────────────────────────────────────────────────────── */

export function AboutPage({ template }: { template: TemplateConfig }) {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="outline">Our story</Badge>
            <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
              About {template.name}
            </DisplayHeading>
            <p className="mt-4 text-lg text-muted leading-relaxed">{template.tagline}</p>
            <p className="mt-4 text-muted leading-relaxed">{template.description}</p>
          </div>
          <img
            src={template.heroImage}
            alt=""
            className="h-72 w-full rounded-2xl object-cover sm:h-96"
          />
        </div>
      </Section>

      <Section className="border-y border-border bg-surface">
        <DisplayHeading as="h2" className="text-center text-3xl sm:text-4xl">
          What we believe
        </DisplayHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {template.beliefs.map((b, i) => (
            <div
              key={b}
              className="flex gap-4 rounded-[var(--radius)] border border-border bg-bg p-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-fg">
                {i + 1}
              </span>
              <p className="pt-1.5 font-medium leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <DisplayHeading as="h2" className="text-3xl sm:text-4xl">
          Leadership team
        </DisplayHeading>
        <p className="mt-2 text-muted">People who love Jesus and this city.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {template.staff.map((person, i) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <img
                src={template.gallery[i % template.gallery.length]}
                alt=""
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-sm font-medium text-primary">{person.role}</p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ─── SERMONS ──────────────────────────────────────────────────────── */

export function SermonsPage({ template }: { template: TemplateConfig }) {
  const [active, setActive] = useState(template.sermons[0]?.id);

  const current =
    template.sermons.find((s) => s.id === active) ?? template.sermons[0];

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-8">
        <Badge variant="outline">Media</Badge>
        <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
          Messages
        </DisplayHeading>
        <p className="mt-3 max-w-xl text-muted">
          Catch up on recent teaching from {template.name}.
        </p>
      </Section>

      {current ? (
        <Section className="pt-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative aspect-video bg-bg">
              <img
                src={current.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-fg shadow-xl transition hover:scale-105"
                  aria-label="Play sermon"
                >
                  <Play className="size-8 fill-current" />
                </button>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <Badge variant="accent">{current.series}</Badge>
              <DisplayHeading as="h2" className="mt-3 text-2xl sm:text-3xl">
                {current.title}
              </DisplayHeading>
              <p className="mt-2 text-sm text-muted">
                {current.speaker} · {current.date} · {current.duration}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {template.sermons.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "overflow-hidden rounded-[var(--radius)] border text-left transition",
                  s.id === current.id
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/40",
                )}
              >
                <img src={s.image} alt="" className="h-36 w-full object-cover" />
                <div className="bg-surface p-4">
                  <p className="text-xs font-medium text-primary">{s.series}</p>
                  <p className="mt-1 font-semibold leading-snug">{s.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {s.speaker} · {s.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

/* ─── EVENTS ───────────────────────────────────────────────────────── */

export function EventsPage({ template }: { template: TemplateConfig }) {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Badge variant="outline">Calendar</Badge>
        <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
          Upcoming events
        </DisplayHeading>
        <p className="mt-3 max-w-xl text-muted">
          Gatherings, serve days, and celebrations at {template.name}.
        </p>

        <div className="mt-12 space-y-4">
          {template.events.map((ev) => (
            <article
              key={ev.id}
              className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
            >
              <div className="flex size-16 flex-col items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                <Calendar className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{ev.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{ev.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {ev.date} · {ev.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {ev.location}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-fit">
                Add interest
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-surface">
        <div className="rounded-2xl border border-border bg-bg p-8 text-center sm:p-12">
          <DisplayHeading as="h2" className="text-2xl sm:text-3xl">
            Host something with us
          </DisplayHeading>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Have an idea for a gathering? Our team loves partnering with people
            who care about this city.
          </p>
          <Button asChild className="mt-6">
            <Link to={routes.contact} params={{ slug: template.slug }}>
              Talk to our team
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

/* ─── MINISTRIES ───────────────────────────────────────────────────── */

export function MinistriesPage({ template }: { template: TemplateConfig }) {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Badge variant="outline">Serve & grow</Badge>
        <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
          Ministries
        </DisplayHeading>
        <p className="mt-3 max-w-xl text-muted">
          Environments designed for every age and season of life.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {template.ministries.map((m, i) => (
            <article
              key={m.id}
              className="overflow-hidden rounded-2xl border border-border bg-surface sm:flex"
            >
              <img
                src={template.gallery[i % template.gallery.length]}
                alt=""
                className="h-48 w-full object-cover sm:h-auto sm:w-44 sm:shrink-0"
              />
              <div className="flex flex-1 flex-col justify-center p-6">
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MinistryIcon name={m.icon} className="size-5" />
                </div>
                <h3 className="text-xl font-semibold">{m.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                  {m.audience}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{m.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ─── GIVE ─────────────────────────────────────────────────────────── */

export function GivePage({ template }: { template: TemplateConfig }) {
  const [amount, setAmount] = useState("50");
  const [sent, setSent] = useState(false);
  const presets = ["25", "50", "100", "250"];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="accent">Generosity</Badge>
            <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
              Give to {template.shortName}
            </DisplayHeading>
            <p className="mt-4 text-muted leading-relaxed">
              Your generosity fuels worship, kids environments, care for neighbors,
              and mission in {template.city}. Thank you for partnering with us.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Secure one-time or recurring gifts",
                "Receipts emailed automatically",
                "Designate to general fund or missions",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            {sent ? (
              <SuccessBanner message={`Thank you! A demo gift of $${amount} was recorded. In production this would process securely.`} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium">Select amount</p>
                  <div className="grid grid-cols-4 gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setAmount(p)}
                        className={cn(
                          "h-11 rounded-[var(--radius)] border text-sm font-semibold transition",
                          amount === p
                            ? "border-primary bg-primary text-primary-fg"
                            : "border-border bg-bg hover:border-primary/40",
                        )}
                      >
                        ${p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="custom-amt">
                    Custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                      $
                    </span>
                    <Input
                      id="custom-amt"
                      type="number"
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7"
                      required
                    />
                  </div>
                </div>
                <Input name="name" placeholder="Name on gift" required />
                <Input name="email" type="email" placeholder="Email for receipt" required />
                <Button type="submit" className="w-full" size="lg" variant="accent">
                  <Heart className="size-4" />
                  Give ${amount || "0"}
                </Button>
                <p className="text-center text-xs text-muted">
                  Demo only — no payment is processed.
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

/* ─── CONTACT ──────────────────────────────────────────────────────── */

export function ContactPage({ template }: { template: TemplateConfig }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Badge variant="outline">We're here</Badge>
            <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
              Contact
            </DisplayHeading>
            <p className="mt-4 text-muted">
              Reach the {template.name} team — we typically respond within one
              business day.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-primary" />
                <span>{template.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-5 shrink-0 text-primary" />
                <a href={`tel:${template.phone}`} className="hover:underline">
                  {template.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="size-5 shrink-0 text-primary" />
                <a href={`mailto:${template.email}`} className="hover:underline">
                  {template.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:col-span-3">
            {sent ? (
              <SuccessBanner message="Message received. Someone from our team will follow up soon." />
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Name" required />
                  <Input name="email" type="email" placeholder="Email" required />
                </div>
                <Input name="subject" placeholder="Subject" required />
                <Textarea name="message" placeholder="How can we help?" required />
                <Button type="submit">Send message</Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

/* ─── GROUPS ───────────────────────────────────────────────────────── */

export function GroupsPage({ template }: { template: TemplateConfig }) {
  const groups = template.groups ?? [];
  const [filter, setFilter] = useState<"all" | "open">("all");
  const shown = filter === "open" ? groups.filter((g) => g.open) : groups;

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Badge variant="outline">Community</Badge>
        <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
          Find a group
        </DisplayHeading>
        <p className="mt-3 max-w-xl text-muted">
          Real friendship and spiritual growth happen in smaller circles.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All groups
          </Button>
          <Button
            size="sm"
            variant={filter === "open" ? "default" : "outline"}
            onClick={() => setFilter("open")}
          >
            Open seats
          </Button>
        </div>

        {groups.length === 0 ? (
          <p className="mt-10 text-muted">
            Groups are launching soon. Check back or contact us to host one.
          </p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((g) => (
              <article
                key={g.id}
                className="flex flex-col rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{g.name}</h3>
                  <Badge variant={g.open ? "accent" : "muted"}>
                    {g.open ? "Open" : "Full"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{g.focus}</p>
                <p className="mt-4 text-sm font-medium">
                  {g.day} · {g.time}
                </p>
                <Button
                  className="mt-auto pt-5"
                  variant="outline"
                  size="sm"
                  disabled={!g.open}
                >
                  {g.open ? "Request to join" : "Join waitlist"}
                </Button>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

/* ─── RECOVERY ─────────────────────────────────────────────────────── */

export function RecoveryPage({ template }: { template: TemplateConfig }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="accent">Freedom</Badge>
            <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
              Recovery & care
            </DisplayHeading>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Hurts, habits, and hang-ups are welcome here. At {template.name} we
              believe healing happens in honest community — not isolation.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Confidential share groups",
                "Trained facilitators",
                "No perfect people required",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <HeartHandshake className="size-4 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={template.gallery[0] ?? template.heroImage}
            alt=""
            className="h-72 w-full rounded-2xl object-cover sm:h-96"
          />
        </div>
      </Section>

      <Section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-lg">
          <DisplayHeading as="h2" className="text-center text-2xl sm:text-3xl">
            Take a first step
          </DisplayHeading>
          <p className="mt-2 text-center text-sm text-muted">
            Tell us a little — we'll follow up with care, not pressure.
          </p>
          {sent ? (
            <div className="mt-8">
              <SuccessBanner message="Thank you for trusting us. A care team member will reach out privately." />
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <Input name="name" placeholder="Name (or initials)" required />
              <Input name="email" type="email" placeholder="Best email" required />
              <Textarea
                name="story"
                placeholder="What would help look like right now? (optional)"
              />
              <Button type="submit" className="w-full">
                Request a conversation
              </Button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

/* ─── NEXT STEPS ───────────────────────────────────────────────────── */

export function NextStepsPage({ template }: { template: TemplateConfig }) {
  const slug = template.slug;
  const steps = [
    {
      title: "Visit a weekend",
      blurb: "Experience worship, teaching, and hospitality.",
      to: routes.visit,
      cta: "Plan visit",
    },
    {
      title: "Join a group",
      blurb: "Find people who know your name and your story.",
      to: template.groups ? routes.groups : routes.ministries,
      cta: "Explore",
    },
    {
      title: "Serve on a team",
      blurb: "Use your gifts in kids, hospitality, tech, or care.",
      to: routes.ministries,
      cta: "See teams",
    },
    {
      title: "Give generously",
      blurb: "Fuel mission in this city and beyond.",
      to: routes.give,
      cta: "Give",
    },
  ] as const;

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Badge variant="outline">Pathways</Badge>
        <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
          {template.accentWord}
        </DisplayHeading>
        <p className="mt-3 max-w-xl text-muted">
          Clear next steps for every guest at {template.name} — no guessing.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <span className="font-[family-name:var(--font-display)] text-5xl font-semibold text-primary/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.blurb}</p>
              <Button asChild className="mt-6" variant="secondary" size="sm">
                <Link to={s.to} params={{ slug }}>
                  {s.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ─── LOCATIONS ────────────────────────────────────────────────────── */

export function LocationsPage({ template }: { template: TemplateConfig }) {
  const campuses = template.campuses ?? [];
  const slug = template.slug;

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Badge variant="outline">Multi-campus</Badge>
        <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
          Find a campus
        </DisplayHeading>
        <p className="mt-3 max-w-xl text-muted">
          One church family across cities — same message, local community.
        </p>

        {campuses.length === 0 ? (
          <p className="mt-10 text-muted">
            We gather at {template.address}.{" "}
            <Link
              to={routes.visit}
              params={{ slug }}
              className="text-primary underline"
            >
              Plan a visit
            </Link>
            .
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {campuses.map((c) => (
              <article
                key={c.id}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <img src={c.image} alt="" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{c.name}</h3>
                  <p className="text-sm text-primary">{c.city}</p>
                  <p className="mt-2 text-sm text-muted">{c.address}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.times.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="mt-5" size="sm">
                    <Link to={routes.visit}
                    params={{ slug }}>
                      Plan visit
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

/* ─── PRAYER ───────────────────────────────────────────────────────── */

export function PrayerPage({ template }: { template: TemplateConfig }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">Care</Badge>
          <DisplayHeading className="mt-4 text-4xl sm:text-5xl">
            Prayer requests
          </DisplayHeading>
          <p className="mt-4 text-muted">
            Our prayer team at {template.name} would be honored to pray with you.
            Requests stay confidential unless you say otherwise.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-border bg-surface p-6 sm:p-8">
          {sent ? (
            <SuccessBanner message="We've received your request. Our team is praying with you this week." />
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Input name="name" placeholder="Name (optional)" />
              <Input name="email" type="email" placeholder="Email (optional)" />
              <Textarea
                name="request"
                placeholder="How can we pray for you?"
                required
                className="min-h-[160px]"
              />
              <label className="flex items-start gap-2 text-sm text-muted">
                <input type="checkbox" name="share" className="mt-1" />
                It's okay to share this request with the care team only
              </label>
              <Button type="submit" className="w-full">
                Submit prayer request
              </Button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
