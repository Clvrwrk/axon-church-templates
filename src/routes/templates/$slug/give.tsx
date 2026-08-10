import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { GivePage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/give")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <GivePage template={template} />;
  },
});
