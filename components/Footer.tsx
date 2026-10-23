import { LabsData } from "@/app/labs/data";
import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
  todayModelSuitabilityRoute,
} from "@/data/routes";
import { RSS_PATH } from "@/utils/metadata/site";

import Breadcrumbs from "./Breadcrumbs";
import FooterActions from "./FooterActions";
import FooterClock from "./FooterClock";

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
    <footer className="text-foreground/70 mt-30 mb-(--timer-footer-clearance,1rem) w-full text-[15px] sm:mb-5">
      <div className="mx-auto w-full max-w-5xl px-4 xl:px-0">
        <FooterClock>
          <Breadcrumbs routeLabels={breadcrumbLabels} />
        </FooterClock>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-between gap-x-5 gap-y-2 px-4 xl:px-0">
        <div className="shrink-0">
          2021-2026 &#169; <span>Harits Syah</span>
        </div>
        <FooterActions rssPath={RSS_PATH} />
      </div>
    </footer>
  );
}
