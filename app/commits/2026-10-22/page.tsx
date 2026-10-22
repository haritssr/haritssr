import DatedCommitAnalysis from "@/components/DatedCommitAnalysis";
import { october22AnalysisRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/pageMetadata";

import analysis from "./analysis.json";
import suitability from "./model-suitability.json";

export const metadata = createPageMetadata({
  title: october22AnalysisRoute.title,
  description: october22AnalysisRoute.description,
  path: october22AnalysisRoute.route,
});

export default function CommitAnalysisPage() {
  return (
    <DatedCommitAnalysis
      analysis={analysis}
      suitability={suitability}
      route={october22AnalysisRoute}
    />
  );
}
