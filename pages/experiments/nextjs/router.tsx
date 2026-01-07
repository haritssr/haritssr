import { useRouter } from "next/router";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

export default function Router() {
  const router = useRouter();
  const style = "text-gray-500";
  return (
    <LayoutToExperiments domain="Nextjs" title="Router">
      <SubTitle>
        <ExternalLink
          href="https://nextjs.org/docs/api-reference/next/router#router-object"
          name="next/router"
        />
      </SubTitle>
      <div className="mb-10">
        <Section name="router object" />
        <div>
          asPath = <span className={style}>{router.asPath}</span> (Route saat
          ini)
        </div>
        <div>
          pathname <span className={style}>{router.pathname}</span>
        </div>
        <div>
          isFallback = <span className={style}>{router.isFallback}</span>
        </div>
        <div>
          basePath = <span className={style}>{router.basePath}</span>
        </div>
        <div>
          locale = <span className={style}>{router.locale}</span>
        </div>
        <div>
          locales = <span className={style}>{router.locales}</span>
        </div>
        <div>
          isReady = <span className={style}>{router.isReady.toString()}</span>
        </div>
        <div>
          isPreview ={" "}
          <span className={style}>{router.isPreview.toString()}</span>
        </div>
      </div>

      <Section name="router.push" />
      <p>This button using router.push instead using Link from next/link</p>
      <button
        className="mt-2 rounded-md bg-blue-600 bg-opacity-90 px-4 py-2 text-white hover:bg-opacity-100"
        onClick={() => router.push("/experiments")}
        type="button"
      >
        Go to Experiments
      </button>
    </LayoutToExperiments>
  );
}
