"use client";

import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function NextjsImageRemoteDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://beta.nextjs.org/docs/optimizing/images"
          name="Nextjs 13 Image"
        />
      </SubTitle>
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/nextjs/next-13-image-remote"
          name="Source code"
        />
      </div>

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
