import LabDomainShell from "@/app/labs/_components/LabDomainShell";
import { getLabDomain } from "@/app/labs/data";

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
