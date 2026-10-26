import LabDomainIndex from "@/app/labs/_components/LabDomainIndex";
import { getLabDomainMetadata } from "@/app/labs/data";

export const metadata = getLabDomainMetadata("harimaki");

export default function HarimakiPage() {
  return <LabDomainIndex columns={1} domainSlug="harimaki" />;
}
