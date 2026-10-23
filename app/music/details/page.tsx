import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import OfflineStatus from "./OfflineStatus";

export const metadata = createPageMetadata({
  title: "Music Details",
  description: "How included songs, local imports, and offline playback work.",
  path: "/music/details",
});

export default function MusicDetailsPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/music", name: "Music" }}
        path="/music/details"
      >
        <PageTitle>Details</PageTitle>
      </PageHeader>
      <div className="max-w-3xl space-y-3">
        <p className="text-muted text-sm">
          Included songs are ready to play with a connection. Import your own
          MP3s for offline listening; imports stay on this device.
        </p>
        <OfflineStatus />
      </div>
    </>
  );
}
