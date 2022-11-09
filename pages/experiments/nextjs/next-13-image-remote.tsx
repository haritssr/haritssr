import LayoutToExperiments from '@/components/LayoutToExperiments';

import LenovoWallpaper from '../../../public/images/LenovoWallPaper.jpg';

import Image from 'next/image';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import Topic from '@/components/Topic';

export default function Next13ImageRemote() {
	return (
		<LayoutToExperiments domain='Next.js' title='Next 13 Image Remote'>
			<SubTitle>
				<ExternalLink
					href='https://beta.nextjs.org/docs/optimizing/images'
					name='Nextjs 13 Image'
				/>
			</SubTitle>

			<section className='space-y-5'>
				{/* FAIL */}
				{/* <Topic name='Bare minimum' />
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
					src='https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png'
					width={1200}
					height={400}
					style={{
						maxWidth: '100%',
						height: 'auto',
					}}
				/> */}
			</section>
		</LayoutToExperiments>
	);
}
