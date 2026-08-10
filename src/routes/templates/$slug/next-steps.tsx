import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { NextStepsPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/next-steps")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <NextStepsPage template={template} />;
  },
});
