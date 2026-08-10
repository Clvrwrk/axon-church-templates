import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemplate } from "@/data/templates";
import { RecoveryPage } from "@/components/church/pages";

export const Route = createFileRoute("/templates/$slug/recovery")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  component: () => {
    const { template } = Route.useLoaderData();
    return <RecoveryPage template={template} />;
  },
});
