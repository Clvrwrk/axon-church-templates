import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShellProps = {
  template: TemplateConfig;
  children: ReactNode;
};

/** Known template child segments → typed route paths */
const CHILD_ROUTES = {
  "": "/templates/$slug",
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
  "next-steps": "/templates/$slug/next-steps",
  locations: "/templates/$slug/locations",
  prayer: "/templates/$slug/prayer",
} as const;

type ChildKey = keyof typeof CHILD_ROUTES;
type ChildRoute = (typeof CHILD_ROUTES)[ChildKey];

function childPath(to: string): ChildRoute {
  // Nav data may use "/", "/about", "about", or full paths
  const raw = to.trim();
  const key = raw
    .replace(/^\/templates\/[^/]+\/?/, "")
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .toLowerCase();
  if (key in CHILD_ROUTES) {
    return CHILD_ROUTES[key as ChildKey];
  }
  if (raw === "/" || raw === "" || key === "index") {
    return CHILD_ROUTES[""];
  }
  return CHILD_ROUTES.visit;
}

export function Shell({ template, children }: ShellProps) {
  const [open, setOpen] = useState(false);
  const slug = template.slug;

  return (
    <div
      className={cn(
        template.themeClass,
        "flex min-h-screen flex-col bg-bg text-fg antialiased overflow-x-hidden",
      )}
    >
      {/* Mobile service times bar */}
      <div className="sticky top-[var(--grok-banner-h,0px)] z-40 border-b border-border bg-surface/95 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3 overflow-x-auto px-4 py-2 text-xs text-muted">
          <Clock className="size-3.5 shrink-0 text-primary" aria-hidden />
          {template.serviceTimes.map((s, i) => (
            <span key={i} className="shrink-0 whitespace-nowrap">
              {s.day} {s.time}
              {s.note ? ` · ${s.note}` : ""}
              {i < template.serviceTimes.length - 1 ? (
                <span className="ml-3 text-border" aria-hidden>
                  |
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-[calc(var(--grok-banner-h,0px)+2.25rem)] z-50 border-b border-border bg-bg/90 backdrop-blur-md md:top-[var(--grok-banner-h,0px)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/templates/$slug"
            params={{ slug }}
            className="min-w-0 shrink font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-fg sm:text-lg"
          >
            <span className="block max-w-[11rem] truncate sm:max-w-[18rem] md:max-w-none">
              {template.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {template.nav
              .filter((n) => n.to !== "give" && n.to !== "/give")
              .map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/give"
              params={{ slug }}
              className="items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-fg hover:opacity-90 h-9 rounded-md px-3 text-xs hidden sm:inline-flex"
            >
              <Heart className="size-3.5" aria-hidden />
              Give
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border bg-bg px-4 py-4 xl:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {template.nav.map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-fg hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/templates/$slug/contact"
                params={{ slug }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-fg hover:bg-surface"
              >
                Contact
              </Link>
              {!template.nav.some((n) => n.to === "give" || n.to === "/give") ? (
                <Link
                  to="/templates/$slug/give"
                  params={{ slug }}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-accent hover:bg-surface"
                >
                  Give
                </Link>
              ) : null}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
              {template.name}
            </p>
            <p className="text-sm leading-relaxed text-muted">{template.tagline}</p>
            <div className="space-y-2 text-sm text-muted">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{template.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" aria-hidden />
                <a href={`tel:${template.phone}`} className="hover:text-fg">
                  {template.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${template.email}`} className="hover:text-fg">
                  {template.email}
                </a>
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Explore
            </p>
            <ul className="space-y-2">
              {template.nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={childPath(item.to)}
                    params={{ slug }}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/templates/$slug/contact"
                  params={{ slug }}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              This Sunday
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {template.serviceTimes.map((s, i) => (
                <li key={i}>
                  <span className="font-medium text-fg">{s.day}</span> · {s.time}
                  {s.note ? ` · ${s.note}` : ""}
                </li>
              ))}
            </ul>
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-fg hover:opacity-90 h-9 rounded-md px-3 text-xs mt-2"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:px-6">
            <p>
              © {new Date().getFullYear()} {template.name}. All rights reserved.
            </p>
            <p>
              Template by{" "}
              <Link to="/" className="font-medium text-primary hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
