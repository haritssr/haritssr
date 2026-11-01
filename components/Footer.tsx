import { LabsData } from "@/app/labs/data";
import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
  todayModelSuitabilityRoute,
} from "@/data/routes";

import Breadcrumbs from "./Breadcrumbs";
import FooterClock from "./FooterClock";
import InstallButton from "./InstallButton";

const breadcrumbLabels = Object.fromEntries<string>([
  ["/labs", "Labs"],
  [apiRoute.route, apiRoute.title],
  [commitsRoute.route, commitsRoute.title],
  [modelSuitabilityRoute.route, modelSuitabilityRoute.title],
  [todayModelSuitabilityRoute.route, todayModelSuitabilityRoute.title],
  [commitAnalysisRoute.route, commitAnalysisRoute.title],
  ...LabsData.flatMap<[string, string]>((domain) => [
    [`/labs/${domain.slug}`, domain.title],
    ...(domain.slug === "mathematics" || domain.slug === "physics"
      ? domain.labs.map<[string, string]>((lab) => [
          `/labs/${domain.slug}/${lab.slug}`,
          lab.title,
        ])
      : []),
  ]),
]);

export default function Footer() {
  return (
    <footer className="text-foreground/70 mt-30 mb-(--floating-footer-clearance,1rem) w-full text-[15px] sm:mb-5">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:gap-x-5 sm:gap-y-3 xl:px-0">
        <div className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:col-start-1 sm:row-start-1">
          <Breadcrumbs routeLabels={breadcrumbLabels} />
        </div>
        <div className="col-span-2 col-start-1 row-start-1 w-full not-has-[button]:hidden sm:col-span-1 sm:col-start-2 sm:w-auto sm:justify-self-end">
          <div className="ml-auto flex w-full shrink-0 items-center gap-x-4 whitespace-nowrap sm:w-auto sm:gap-x-6">
            <InstallButton />
          </div>
        </div>
        <div className="col-start-1 row-start-3 sm:row-start-2">
          2021-2026 &#169; <span>Harits Syah</span>
        </div>
        <div className="col-start-2 row-start-3 justify-self-end sm:row-start-2">
          <FooterClock />
        </div>
      </div>
    </footer>
  );
}
