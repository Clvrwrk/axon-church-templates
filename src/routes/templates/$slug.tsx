import { createFileRoute, notFound, Outlet, useRouterState } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { Shell } from "@/components/church/Shell";
import { SolunaShell } from "@/components/church/soluna/SolunaShell";
import { FoundryShell } from "@/components/church/foundry/FoundryShell";
import { RootedShell } from "@/components/church/rooted/RootedShell";
import { CitylightShell } from "@/components/church/citylight/CitylightShell";
import { NorthbridgeShell } from "@/components/church/northbridge/NorthbridgeShell";
import { TemplateChrome } from "@/components/church/TemplateChrome";

export const Route = createFileRoute("/templates/$slug")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: TemplateLayout,
  notFoundComponent: () => (
    <div className="theme-portfolio flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-fg">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Template not found
      </h1>
      <p className="text-muted">That church template doesn't exist.</p>
      <a href="/" className="text-primary underline">
        Back to portfolio
      </a>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.template.name} — Axon Templates`
          : "Template — Axon",
      },
    ],
  }),
});

function TemplateLayout() {
  const { template } = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome =
    pathname === `/templates/${template.slug}` ||
    pathname === `/templates/${template.slug}/`;

  const darkChrome =
    template.slug === "modern" || template.slug === "multisite"
      ? false
      : false;
  // Foundry uses paper bg; only pure dark would need dark chrome. Keep light for readability.
  void darkChrome;

  const chrome = <TemplateChrome template={template} />;

  if (template.slug === "soluna") {
    return (
      <>
        {chrome}
        <SolunaShell template={template} bare={isHome}>
          <Outlet />
        </SolunaShell>
      </>
    );
  }

  if (template.slug === "modern") {
    return (
      <>
        {chrome}
        <FoundryShell template={template} bare={isHome}>
          <Outlet />
        </FoundryShell>
      </>
    );
  }

  if (template.slug === "discipleship") {
    return (
      <>
        {chrome}
        <RootedShell template={template} bare={isHome}>
          <Outlet />
        </RootedShell>
      </>
    );
  }

  if (template.slug === "multisite") {
    return (
      <>
        {chrome}
        <CitylightShell template={template} bare={isHome}>
          <Outlet />
        </CitylightShell>
      </>
    );
  }

  if (template.slug === "growth") {
    return (
      <>
        {chrome}
        <NorthbridgeShell template={template} bare={isHome}>
          <Outlet />
        </NorthbridgeShell>
      </>
    );
  }

  return (
    <>
      {chrome}
      <Shell template={template}>
        <Outlet />
      </Shell>
    </>
  );
}
