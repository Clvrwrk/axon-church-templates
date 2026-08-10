import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { SermonsPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/sermons")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <SermonsPage template={template} />;
  },
});
