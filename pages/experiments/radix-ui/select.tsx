import React from 'react';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import * as Select from '@radix-ui/react-select';

export default function ExportedSelect() {
	return (
		<LayoutToExperiments title='Select' domain='Radix'>
			<SubTitle>
				Displays a list of options for the user to pick from—triggered by a button.
			</SubTitle>
		</LayoutToExperiments>
	);
}

// function Yes() {
// 	return (
// 		<Select.Root>
// 			<Select.Trigger>
// 				<Select.Value />
// 				<Select.Icon />
// 			</Select.Trigger>

// 			<Select.Portal>
// 				<Select.Content>
// 					<Select.ScrollUpButton />
// 					<Select.Viewport>
// 						<Select.Item value='a'>
// 							<Select.ItemText />
// 							<Select.ItemIndicator />
// 						</Select.Item>

// 						<Select.Group>
// 							<Select.Label />
// 							<Select.Item value='a'>
// 								<Select.ItemText />
// 								<Select.ItemIndicator />
// 							</Select.Item>
// 						</Select.Group>

// 						<Select.Separator />
// 					</Select.Viewport>
// 					<Select.ScrollDownButton />
// 				</Select.Content>
// 			</Select.Portal>
// 		</Select.Root>
// 	);
// }
