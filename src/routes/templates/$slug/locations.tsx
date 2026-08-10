import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { LocationsPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/locations")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <LocationsPage template={template} />;
  },
});
