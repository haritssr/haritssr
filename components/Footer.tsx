import { LabsData } from "@/app/labs/data";
import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
  todayModelSuitabilityRoute,
} from "@/data/routes";

import Breadcrumbs from "./Breadcrumbs";
import FooterFrame from "./FooterFrame";

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
    <FooterFrame>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-5 px-4 xl:px-0">
        <div className="min-w-0 flex-1">
          <Breadcrumbs routeLabels={breadcrumbLabels} />
        </div>
        <div className="shrink-0">
          2021-2026 &#169; haritssr.com · <span>Harits Syah</span>
        </div>
      </div>
    </FooterFrame>
  );
}
