import Image from "next/image";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

import NotionNavigationMenu from "./navigation-menu";

export default function NotionNavbarDemo() {
  return (
    <SubTitle>
      <ExplanationList>
        <li>Navigation bar inspired by Notion’s marketing pages.</li>
        <li>
          Dropdowns use Base UI’s{" "}
          <ExternalLink
            href="https://base-ui.com/react/components/navigation-menu"
            name="Navigation Menu"
          />
          .
        </li>
      </ExplanationList>
      <SourceCodeLink />
      <div className="flex flex-wrap items-center gap-2">
        <NotionLogo />
        <NotionNavigationMenu />
      </div>
    </SubTitle>
  );
}

function NotionLogo() {
  return (
    <div className="mr-2 flex shrink-0 items-center gap-2">
      <Image alt="" height={30} src="/icons/notion.jpg" width={30} />
      <span className="text-lg font-semibold text-black">Notion</span>
    </div>
  );
}
