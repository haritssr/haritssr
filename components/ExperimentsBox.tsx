import Image from 'next/image';
import InternalLink from './InternalLink';
import type { ExperimentsData } from '../data/ExperimentsData';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ExperimentsBox({ experiment }: { experiment: ExperimentsData }) {
	return (
		<article className='overflow-hidden rounded-md border border-apple-gray4'>
			<Disclosure defaultOpen={true}>
				{({ open }) => (
					<>
						<Disclosure.Button className='w-full'>
							<section className='mb-1 flex justify-between  border-b border-apple-gray4 px-3 py-1.5 bg-apple-gray6/50'>
								<div className='flex items-center space-x-2'>
									<Image src={experiment.logoSrc} height={16} width={16} alt={experiment.title} />
									<div className='font-semibold text-zinc-700'>{experiment.title}</div>
								</div>
								<section className='flex items-center space-x-2'>
									<div className='text-tiny text-zinc-500'>{experiment.links?.length}</div>
									<ChevronDownIcon className={`w-4 h-4 ${open ? 'rotate-180' : ''}`} />
								</section>
							</section>
						</Disclosure.Button>
						<Disclosure.Panel>
							<ol className='space-y-1 px-3 py-2'>
								{experiment.links?.map(link => (
									<li key={link} className='text-zinc-600'>
										<InternalLink
											href={`/experiments/${experiment.title.toLowerCase().replace(' ', '-')}/${link
												.toLowerCase()
												// /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
												.replace(/\s/g, '-')}`}
											name={link}
										/>
									</li>
								))}
							</ol>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</article>
	);
}
