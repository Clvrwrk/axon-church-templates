import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { MinistriesPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/ministries")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <MinistriesPage template={template} />;
  },
});
