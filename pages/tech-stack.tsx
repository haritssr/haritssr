import Layout from "@/components/Layout";
import { PageTitle } from "@/components/SubTitle";
import { TechStackData } from "data/TechStackData";
import { TechStackCard } from "@/components/TechStackCard";

export default function TechStackPage() {
  return (
    <Layout
      browserTitle="Tech Stack"
      description="My choosen libraries and framework to build web application"
    >
      <PageTitle title="Tech Stack">
        My choosen libraries and framework to build web application
      </PageTitle>
      <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4">
        {TechStackData.map((data) => (
          <TechStackCard
            domain={data?.domain}
            links={data?.links}
            key={data?.domain}
          />
        ))}
      </div>
    </Layout>
  );
}
