import Link from 'next/link';
import { GitHubIcon } from './Icons';

export default function GlobalHead() {
	return (
		<div className='z-30 border-b border-zinc-300  bg-apple-gray6/60 saturate-150 backdrop-blur-lg'>
			<div className='mx-auto flex max-w-5xl flex-row items-center justify-between px-3 py-2.5 lg:px-0'>
				<Link
					href='/'
					className=' text-zinc-800 tracking-widest duration-100 hover:text-zinc-500 active:scale-95'
					aria-label='site logo'
				>
					HARITS SYAH
				</Link>
				<a
					className='flex justify-end'
					title='Whole site source code'
					href='https://www.github.com/haritssr/haritssr'
				>
					<GitHubIcon className='h-5 w-5 cursor-pointer hover:text-zinc-500 text-zinc-800 duration-200' />
				</a>
			</div>
		</div>
	);
}
