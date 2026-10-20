import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/pageMetadata";

import { getRouteTree } from "./getRouteTree";
import RouteTree from "./RouteTree";

export const metadata = createPageMetadata({
  title: "Tree",
  description: "Tree views of site map information architecture",
  path: "/tree",
});

export default function TreePage() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path="/tree">
        <PageTitle>Tree</PageTitle>
        <PageDescription>
          Tree views of site map information architecture
        </PageDescription>
      </PageHeader>
      <RouteTree nodes={getRouteTree()} />
    </>
  );
}
