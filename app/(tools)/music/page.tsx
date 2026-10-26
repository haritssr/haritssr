import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { musicRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import MusicLibrary from "./_components/MusicLibrary";

import styles from "./Music.module.css";

export const metadata = createPageMetadata({
  title: musicRoute.title,
  description: musicRoute.description,
  path: musicRoute.route,
});

export default function MusicPage() {
  return (
    <div className={styles.accent}>
      <PageHeader back={{ href: "/", name: "Home" }} path={musicRoute.route}>
        <PageTitle>{musicRoute.title}</PageTitle>
        <PageDescription>{musicRoute.description}</PageDescription>
        <nav aria-label="Music">
          <InternalLink href="/music/details">Details</InternalLink>
        </nav>
      </PageHeader>
      <MusicLibrary />
    </div>
  );
}
