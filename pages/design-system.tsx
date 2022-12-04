import Section from '@/components/Section';
import InternalLink from '@/components/InternalLink';
import ExternalLink from '@/components/ExternalLink';
import Layout from '@/components/Layout';
import React from 'react';
import { color } from '../data/DesignSystemData';
import Image from 'next/image';

export default function DesignSystem() {
	return (
		<Layout browserTitle='Design System' description='Design System'>
			<div className='mt-5 space-y-20 sm:mt-10 '>
				<A />
			</div>
		</Layout>
	);
}

const Wrapper = ({
	topic,
	className,
	children,
	id,
}: {
	topic: string;
	className?: string;
	children: React.ReactNode;
	id: string;
}) => {
	return (
		<div id={id}>
			<div className='mb-6 space-y-2'>
				<span className='text-2xl font-bold text-zinc-800 sm:text-3xl font-["Mona_Sans"]'>
					{topic}
				</span>
			</div>
			<div className={className}>{children}</div>
		</div>
	);
};

const A = () => {
	return (
		<Wrapper topic='Design System' className='' id='DesignSystem'>
			<Section name='Color' />
			<section className='mb-10 -mt-2  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border'>
				{color.map(data => (
					<div className='space-y-1' key={data.name}>
						<div style={{ backgroundColor: data.hex }} className={` h-16 w-16 rounded-md border`} />
						<div className='text-zinc-700'>{data.hex}</div>
						<div className='text-zinc-500'>{data.name}</div>
					</div>
				))}
			</section>
			<Section name='Button' />
			<section className='mb-10 -mt-2  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border'>
				<div className='space-y-1'>
					<ExternalLink href='/' name='ExternalLink' />
					<div className='text-zinc-500'>External Link</div>
				</div>
				<div className='space-y-1'>
					<InternalLink href='/' name='InternalLink' />
					<div className='text-zinc-500'>Internal Link</div>
				</div>
				<div className='space-y-1'>
					<button className='rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-blue-500'>
						Button
					</button>
					<div className='text-zinc-500'>Primary Button</div>
				</div>
				<div className='space-y-1'>
					<button className='rounded-md border border-blue-600 bg-white px-4 py-1 text-blue-600 hover:bg-blue-100'>
						Button
					</button>
					<div className='text-zinc-500'>Secondary Button</div>
				</div>
			</section>
			<Section name='Typography' />
			<section className='mb-10 -mt-2  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border'>
				<div className='space-y-1'>
					<div className='text-2xl font-bold text-zinc-800 sm:text-3xl font-["Mona_Sans"]'>
						Page Title
					</div>
					<div className='text-zinc-500'>Heading</div>
				</div>
				<div className='space-y-1'>
					<div className='text-xl font-semibold text-zinc-800 font-["Hubot_Sans"]'>
						Section Title
					</div>
					<div className='text-zinc-500'>Heading 2</div>
				</div>
				<div className='space-y-1'>
					<div className='text-[17px] leading-relaxed text-zinc-700 sm:text-base'>
						Short paragraph example
					</div>
					<div className='text-zinc-500'>Paragraph</div>
				</div>
			</section>

			<Section name='Fonts' />
			<section className='mb-10 -mt-2  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border'>
				<div className="space-y-1 font-['Hubot_Sans']">
					<div className='font-semibold text-zinc-800 '>Hubot Sans</div>
					<div className='text-zinc-500'>Section title</div>
				</div>
				<div className="space-y-1 font-['Mona_Sans']">
					<div className='font-semibold text-zinc-800 '>Mona Sans</div>
					<div className='text-zinc-500'>Page title</div>
				</div>
				<div className='space-y-1'>
					<div className='font-semibold text-zinc-800 '>Inter</div>
					<div className='text-zinc-500'>Paragraph, description</div>
				</div>
			</section>

			<Section name='Icon' />
			<section className='mb-10 -mt-2 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 border p-4'>
				<div className='space-y-1'>
					<Image
						src='/icons/haritssr.png'
						alt=''
						width='20'
						height='20'
						blurDataURL='/icons/haritssr.png'
						placeholder='blur'
					/>
					<div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
					<div className='text-zinc-500'>Mobile</div>
				</div>
				<div className='space-y-1'>
					<Image
						src='/icons/haritssr.png'
						alt=''
						width='20'
						height='20'
						blurDataURL='/icons/haritssr.png'
						placeholder='blur'
					/>
					<div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
					<div className='text-zinc-500'>Desktop</div>
				</div>
				<div className='space-y-1'>
					<div className='w-fit rounded-md border bg-zinc-800 p-2'>
						<Image
							src='/icons/haritssr.png'
							alt=''
							width='20'
							height='20'
							blurDataURL='/icons/haritssr.png'
						/>
					</div>
					<div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
					<div className='text-zinc-500'>Dark background</div>
				</div>
				<div className='space-y-1'>
					<div className='w-fit rounded-md border bg-white p-2'>
						<Image
							src='/icons/haritssr.png'
							alt=''
							width='20'
							height='20'
							blurDataURL='/icons/haritssr.png'
							placeholder='blur'
						/>
					</div>
					<div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
					<div className='text-zinc-500'>Light background</div>
				</div>
			</section>
			<Section name='Box' />
			<section className='mb-10 -mt-2 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4'>
				<div className='space-y-1'>
					<div className='h-40 overflow-hidden rounded-md border border-zinc-300 bg-white' />
					<div className='text-zinc-500'>Box</div>
				</div>
				<div className='space-y-1'>
					<div className='h-40 overflow-hidden rounded-md border border-zinc-300 bg-white'>
						<div className='px-3 py-1.5 rounded-t-md font-semibold border-b border-zinc-300 bg-apple-gray6/50 text-zinc-800'>
							Title
						</div>
						<div className='rounded-b-md'></div>
					</div>
					<div className='text-zinc-500'>Named Box</div>
				</div>
			</section>
		</Wrapper>
	);
};
