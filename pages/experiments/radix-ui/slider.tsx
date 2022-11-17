import React from 'react';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Slider from '@radix-ui/react-slider';
import ExplanationList from '@/components/ExplanationList';

export default function ExportedSlider() {
	return (
		<LayoutToExperiments title='Slider' domain='Radix UI'>
			<SubTitle>
				<ExternalLink
					href='https://www.radix-ui.com/docs/primitives/components/slider'
					name='Radix UI Slider'
				/>
				<ExplanationList>
					<li>An input where the user selects a value from within a given range.</li>
					<li>Click the button with name and icon and the explanation box will appear</li>
				</ExplanationList>
			</SubTitle>
			<form action=''>
				<Slider.Root
					defaultValue={[50]}
					orientation='horizontal'
					// step={10}
					className='relative flex w-full select-none items-center'
				>
					<Slider.Track
						aria-orientation='horizontal'
						className='h-2 flex-1 rounded-full bg-zinc-800'
					>
						<Slider.Range className='rounded-ful absolute h-full bg-zinc-100' />
					</Slider.Track>
					<Slider.Thumb className='block h-5 w-5 rounded-full border border-zinc-300 bg-white shadow-lg focus:border focus:border-zinc-500 focus:outline-none focus:ring-4 focus:ring-zinc-400/50 hover:bg-zinc-50 hover:border-zinc-400 cursor-pointer' />
				</Slider.Root>
			</form>
		</LayoutToExperiments>
	);
}
