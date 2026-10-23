import DatedCommitAnalysis from "@/app/commits/_components/DatedCommitAnalysis";
import { october21AnalysisRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import analysis from "./analysis.json";
import suitability from "./model-suitability.json";

export const metadata = createPageMetadata({
  title: october21AnalysisRoute.title,
  description: october21AnalysisRoute.description,
  path: october21AnalysisRoute.route,
});

export default function CommitAnalysisPage() {
  return (
    <DatedCommitAnalysis
      analysis={analysis}
      suitability={suitability}
      route={october21AnalysisRoute}
    />
  );
}
