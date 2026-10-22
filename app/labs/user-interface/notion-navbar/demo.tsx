import Image from "next/image";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";

import NotionNavigationMenu from "./navigation-menu";

export default function NotionNavbarDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription as="div">
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
        </PageDescription>
      </LabPageHeader>
      <div className="flex flex-wrap items-center gap-2">
        <NotionLogo />
        <NotionNavigationMenu />
      </div>
    </>
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
