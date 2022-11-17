import SubTitle from '@/components/SubTitle';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function RadioGroupDemo() {
	return (
		<LayoutToExperiments title='Radio Group' domain='Radix UI'>
			<SubTitle>
				A set of checkable buttons—known as radio buttons—where no more than one of the buttons can
				be checked at a time.
			</SubTitle>
			<RadioGroup.Root className='space-y-3'>
				<RadioGroup.Item
					value='default'
					id='item-1'
					className='flex h-5 w-5 items-center justify-center rounded-full bg-white hover:bg-blue-50  border border-zinc-400 rdx-state-checked:border-blue-600'
				>
					<RadioGroup.Indicator className='h-3 w-3 rounded-full bg-zinc-800 rdx-state-checked:border-blue-600 rdx-state-checked:bg-blue-600' />
				</RadioGroup.Item>
				<RadioGroup.Item
					value='value-2'
					id='item-2'
					className='flex h-5 w-5 items-center justify-center rounded-full bg-white hover:bg-blue-50  border border-zinc-400 rdx-state-checked:border-blue-600'
				>
					<RadioGroup.Indicator className='h-3 w-3 rounded-full bg-zinc-800 rdx-state-checked:border-blue-600 rdx-state-checked:bg-blue-600' />
				</RadioGroup.Item>
				<RadioGroup.Item
					value='value-3'
					id='item-3'
					className='flex h-5 w-5 items-center justify-center rounded-full bg-white hover:bg-blue-50  border border-zinc-400 rdx-state-checked:border-blue-600'
				>
					<RadioGroup.Indicator className='h-3 w-3 rounded-full bg-zinc-800 rdx-state-checked:border-blue-600 rdx-state-checked:bg-blue-600' />
				</RadioGroup.Item>
			</RadioGroup.Root>
		</LayoutToExperiments>
	);
}
