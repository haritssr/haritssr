"use client";

import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export default function NextjsImageRemoteDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          An unfinished experiment for displaying remote images with Next.js
          Image; examples are currently disabled. See the documentation for{" "}
          <ExternalLink
            href="https://nextjs.org/docs/app/api-reference/components/image"
            name="Next.js Image documentation"
          />
        </PageDescription>
      </LabPageHeader>

      <section className="space-y-5">
        {/* FAIL */}
        {/* <Section name='Bare minimum' />
				<Image
					src='https://unsplash.com/photos/FouyeA9HH5U'
					width='600'
					height='400'
					alt='Apple Park'
					placeholder='blur'
					blurDataURL='https://unsplash.com/photos/FouyeA9HH5U'
				/>

				<Image
					alt='Next.js logo'
					src='https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.jpg'
					width={1200}
					height={400}
					style={{
						maxWidth: '100%',
						height: 'auto',
					}}
				/> */}
      </section>
    </>
  );
}
