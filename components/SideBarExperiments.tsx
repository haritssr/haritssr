import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Accordion from '@radix-ui/react-accordion';
import { ExperimentsData } from 'data/ExperimentsData';
import Image from 'next/image';
import InternalLink from './InternalLink';

export default function SideBarExperiments() {
	return (
		<div className='sticky top-10 h-auto sm:w-1/4 hidden sm:block'>
			<div className='-ml-2 space-y-1 bg-zinc-100 rounded-md p-2'>
				{ExperimentsData.map(({ id, title, logoSrc, links }) => (
					<Accordion.Root type='multiple' key={id}>
						<Accordion.Item value='id'>
							<Accordion.Header>
								<Accordion.Trigger className='group flex w-full items-center justify-between rounded-md py-1 px-2 hover:bg-zinc-200 rdx-state-open:bg-zinc-200'>
									{/* grayscale group-hover:grayscale-0 */}
									<div className='flex items-center space-x-1.5'>
										<div className='rdx-state-open:grayscale-0'>
											<Image src={logoSrc} height={16} width={16} alt={title} />
										</div>
										<span>{title}</span>
									</div>
									<div className='flex items-center space-x-1'>
										<div className='text-sm text-zinc-400 rdx-state-open:text-zinc-800'>
											{links.length}
										</div>
										<ChevronDownIcon
											strokeWidth={2}
											className='h-4 w-4 text-zinc-400 group-rdx-state-open:rotate-180 rdx-state-open:text-zinc-800'
										/>
									</div>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className='mb-4 space-y-1 pl-8 pt-1'>
								{links.map(link => (
									<InternalLink
										// block={true}
										key={link}
										href={`/experiments/${title.toLowerCase().replace(' ', '-')}/${link
											.toLowerCase()
											// /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
											.replace(/\s/g, '-')}`}
										name={link}
									/>
								))}
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				))}
			</div>
		</div>
	);
}
