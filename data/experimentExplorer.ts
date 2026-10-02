export interface ExperimentSummary {
  route: string;
  title: string;
  description: string;
  domain: string;
  domainTitle: string;
  tags: readonly string[];
  updatedAt: string;
}
