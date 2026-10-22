import InternalLink from "@/components/InternalLink";
import { apiRoute } from "@/data/routes";

import FooterInstallButton from "./FooterInstallButton";

interface FooterActionsProps {
  rssPath: string;
}

export default function FooterActions({ rssPath }: FooterActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-6">
      <InternalLink href={apiRoute.route} variant="footer">
        {apiRoute.title}
      </InternalLink>
      <InternalLink href={rssPath} variant="footer">
        RSS
      </InternalLink>
      <FooterInstallButton />
    </div>
  );
}
