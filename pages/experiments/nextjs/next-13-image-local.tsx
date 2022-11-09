import LayoutToExperiments from '@/components/LayoutToExperiments';

import LenovoWallpaper from '../../../public/images/LenovoWallPaper.jpg';

import Image from 'next/image';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import Topic from '@/components/Topic';

export default function Next13Image() {
	return (
		<LayoutToExperiments domain='Next.js' title='Next 13 Image Local'>
			<SubTitle>
				<ExternalLink
					href='https://beta.nextjs.org/docs/optimizing/images'
					name='Nextjs 13 Image'
				/>
			</SubTitle>

			<section className='space-y-5'>
				<Topic name='Bare minimum' />
				<Image src={LenovoWallpaper} alt='Lenovo Wallpaper' placeholder='blur' />

				<Topic name='Rounded image' />
				<Image
					src={LenovoWallpaper}
					alt='Lenovo Wallpaper'
					placeholder='blur'
					className='rounded-md'
				/>

				<Topic name='Group images' />
				<div className='grid grid-cols-2 gap-5'>
					<Image src={LenovoWallpaper} alt='Lenovo Wallpaper' placeholder='blur' />
					<Image src={LenovoWallpaper} alt='Lenovo Wallpaper' placeholder='blur' />
					<Image src={LenovoWallpaper} alt='Lenovo Wallpaper' placeholder='blur' />
					<Image src={LenovoWallpaper} alt='Lenovo Wallpaper' placeholder='blur' />
				</div>

				<Topic name='Text over image' />
				<div className='relative'>
					<Image src={LenovoWallpaper} alt='Lenovo Wallpaper' placeholder='blur' />
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-700/40 w-full h-full flex items-center justify-center'>
						<p className='text-sm overscroll-y-auto text-ellipsis sm:text-xl text-white p-2 sm:p-20'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione hic molestiae rerum
							dolorem et labore laborum nobis est ipsam vel mollitia, debitis aliquid dolore? Culpa
							ipsa molestiae ipsam? Possimus iste tempore quas illo! Placeat perferendis odit
							accusantium officiis in voluptatibus earum eos illum, ab laudantium vel adipisci
							impedit eligendi facere?
						</p>
					</div>
				</div>

				<Topic name='Using fill' />
				<div className='relative h-96'>
					<Image
						src={LenovoWallpaper}
						alt='Lenovo Wallpaper'
						placeholder='blur'
						fill
						className='object-cover object-center'
					/>
				</div>
			</section>
		</LayoutToExperiments>
	);
}
