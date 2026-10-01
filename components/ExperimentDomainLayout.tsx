import ExperimentDomainShell from "@/components/ExperimentDomainShell";
import { getExperimentDomain } from "@/data/ExperimentsData";

interface ExperimentDomainLayoutProps {
  children: React.ReactNode;
  domain: string;
}

export default function ExperimentDomainLayout({
  children,
  domain,
}: ExperimentDomainLayoutProps) {
  const experimentDomain = getExperimentDomain(domain);

  return (
    <ExperimentDomainShell
      domainTitle={experimentDomain.title}
      experiments={experimentDomain.experiments.map(
        ({ slug, title, hideBackButton, hideTitle }) => ({
          slug,
          title,
          hideBackButton,
          hideTitle,
        })
      )}
    >
      {children}
    </ExperimentDomainShell>
  );
}
