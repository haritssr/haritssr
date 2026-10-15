import LabDomainShell from "@/components/LabDomainShell";
import { getLabDomain } from "@/data/LabsData";

interface LabDomainLayoutProps {
  children: React.ReactNode;
  domain: string;
}

export default function LabDomainLayout({
  children,
  domain,
}: LabDomainLayoutProps) {
  const labDomain = getLabDomain(domain);

  return (
    <LabDomainShell
      domainTitle={labDomain.title}
      labs={labDomain.labs.map(({ slug, title, hideTitle }) => ({
        slug,
        title,
        hideTitle,
      }))}
    >
      {children}
    </LabDomainShell>
  );
}
