import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Popover from '@radix-ui/react-popover';

export default function ExportedPopover() {
	return (
		<LayoutToExperiments title='Popover' domain='Radix UI'>
			<SubTitle>
				<ExternalLink
					href='https://www.radix-ui.com/docs/primitives/components/popover'
					name='Radix UI Popover'
				/>
				<ExplanationList>
					<li>Displays rich content in a portal, triggered by a button.</li>
					<li>Click the button and the portal will appear below.</li>
				</ExplanationList>
			</SubTitle>
			<Popover.Root>
				<Popover.Trigger className='w-auto rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1 hover:bg-zinc-100 text-zinc-800 font-medium rdx-state-open:ring-2 rdx-state-open:ring-blue-600'>
					Open
				</Popover.Trigger>

				{/* <Popover.Anchor /> */}
				<Popover.Content
					className='rounded-md border border-zinc-400 bg-white w-[80vw] shadow-xl max-w-sm text-zinc-800 p-4'
					sideOffset={10}
					side='bottom'
				>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur vel fugit ipsum est,
					perferendis animi accusantium molestiae impedit minima ea debitis cumque vitae architecto
					quidem fuga explicabo? Modi iure, magni provident tenetur corrupti natus quis quibusdam
					incidunt officia sed expedita ratione. Voluptates non consequuntur repellendus rerum
					quisquam? Repellendus, nemo recusandae placeat fuga necessitatibus.
					<Popover.Close />
					<Popover.Arrow className='fill-zinc-800' />
				</Popover.Content>
			</Popover.Root>
		</LayoutToExperiments>
	);
}
