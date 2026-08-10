import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { PrayerPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/prayer")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <PrayerPage template={template} />;
  },
});
