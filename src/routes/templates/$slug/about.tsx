import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { AboutPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/about")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <AboutPage template={template} />;
  },
});
