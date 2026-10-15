import { ExperimentsData } from "@/data/ExperimentsData";
import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
} from "@/data/routes";
import { RSS_PATH } from "@/utils/site";

import Breadcrumbs from "./Breadcrumbs";
import FooterActions from "./FooterActions";

const breadcrumbLabels = Object.fromEntries<string>([
  ["/experiments", "Experiments"],
  [apiRoute.route, apiRoute.title],
  [commitsRoute.route, commitsRoute.title],
  [modelSuitabilityRoute.route, modelSuitabilityRoute.title],
  [commitAnalysisRoute.route, commitAnalysisRoute.title],
  ...ExperimentsData.flatMap<[string, string]>((domain) => [
    [`/experiments/${domain.slug}`, domain.title],
    ...(domain.slug === "mathematics" || domain.slug === "physics"
      ? domain.experiments.map<[string, string]>((experiment) => [
          `/experiments/${domain.slug}/${experiment.slug}`,
          experiment.title,
        ])
      : []),
  ]),
]);

export default function Footer() {
  return (
    <footer
      className="text-foreground/70 mt-30 mb-5 w-full text-xs sm:text-sm"
      data-site-footer=""
    >
      <Breadcrumbs routeLabels={breadcrumbLabels} />
      <div className="mx-auto flex w-full max-w-5xl justify-between gap-5 px-4 xl:px-0">
        <div className="shrink-0">
          2021-2026 &#169; <span>Harits Syah</span>
        </div>
        <FooterActions rssPath={RSS_PATH} />
      </div>
    </footer>
  );
}
