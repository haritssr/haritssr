import Layout from "@/components/Layout";
import Image from "next/image";
import { aboutMeDataFull } from "data/contactData";

export default function About() {
  return (
    <Layout browserTitle="About" description="About">
      <div className="my-8">
        <div className="justify-center w-full flex ">
          <section className="flex justify-center">
            <Image
              priority
              src="/images/blur.jpg"
              height="165"
              width="165"
              className="z-10 rounded-full aspect-ratio"
              alt="Harits Syah"
              blurDataURL="/images/blur.jpg"
              // placeholder='blur'
            />
          </section>
        </div>
        <div className="">
          <div className="text-zinc-800 w-full text-center text-lg font-semibold">
            Harits Syah
          </div>
          <a
            className="block text-center text-zinc-500"
            href="https://www.twitter.com/haritssr"
            target="_blank"
            rel="noreferrer noopener"
          >
            @haritssr
          </a>
          <div className="bg-zinc-200"></div>
        </div>
      </div>
      <div className="space-y-14">
        {aboutMeDataFull.map((section) => {
          return (
            <div key={section.section}>
              <div className="text-zinc-800 text-xl font-semibold mb-1.5">
                {section.section}
              </div>
              <div className="mb-1.5 text-zinc-800">{section.description}</div>
              <ul className="block sm:list-disc list-inside divide-y divide-zinc-200 border-t border-b border-zinc-200">
                {section.points.map((point) => (
                  <li key={point} className="text-zinc-400 py-1.5">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
