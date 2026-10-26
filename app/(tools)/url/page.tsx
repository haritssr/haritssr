import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { urlRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import URLCleaner from "./URLCleaner";

export const metadata = createPageMetadata({
  title: urlRoute.title,
  description: urlRoute.description,
  path: urlRoute.route,
});

export default function URLPage() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path={urlRoute.route}>
        <PageTitle>{urlRoute.title}</PageTitle>
        <PageDescription>{urlRoute.description}</PageDescription>
      </PageHeader>
      <URLCleaner />
    </>
  );
}
