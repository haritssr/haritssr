import InternalLink from "@/components/InternalLink";
import { apiRoute } from "@/data/routes";

import FooterInstallButton from "./FooterInstallButton";

interface FooterActionsProps {
  rssPath: string;
}

export default function FooterActions({ rssPath }: FooterActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-x-4 whitespace-nowrap sm:gap-x-6">
      <InternalLink href={apiRoute.route} variant="footer">
        {apiRoute.title}
      </InternalLink>
      <InternalLink aria-keyshortcuts="Alt+R" href={rssPath} variant="footer">
        RSS
      </InternalLink>
      <FooterInstallButton />
    </div>
  );
}
