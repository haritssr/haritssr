import Image from 'next/image';

export default function ContactComponent({
	href,
	imgSrc,
	name,
	title,
}: {
	href: string;
	imgSrc: string;
	name: string;
	title: string;
}) {
	return (
		<a
			title={title}
			href={href}
			target='_blank'
			rel='noreferrer noopener'
			className='group flex w-auto'
		>
			<section className='flex items-center space-x-2 overflow-hidden'>
				<Image
					src={imgSrc}
					height={20}
					width={20}
					alt={name}
					className='aspect-auto h-5 w-5'
					blurDataURL={imgSrc}
					// placeholder='blur'
				/>
				<div className=' text-zinc-500 hover:text-blue-600 group-hover:underline'>{name}</div>
			</section>
		</a>
	);
}
