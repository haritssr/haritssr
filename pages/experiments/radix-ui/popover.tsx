import { ExternalLink, SubTitle } from '@/components/DesignSystem';
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
        <Popover.Trigger className='w-auto rounded-md border border-zinc-400 bg-zinc-50 px-2 py-1 hover:bg-zinc-100'>
          Open
        </Popover.Trigger>
        {/* <Popover.Anchor /> */}
        <Popover.Content
          className='rounded border border-zinc-400 bg-white p-2'
          sideOffset={10}
          side='bottom'
        >
          <div className='max-w-lg text-gray-700'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur vel fugit ipsum est,
            perferendis animi accusantium molestiae impedit minima ea debitis cumque vitae
            architecto quidem fuga explicabo? Modi iure, magni provident tenetur corrupti natus quis
            quibusdam incidunt officia sed expedita ratione. Voluptates non consequuntur repellendus
            rerum quisquam? Repellendus, nemo recusandae placeat fuga necessitatibus omnis qui
            autem? Dolore ipsa dolor atque voluptatibus nisi explicabo a eos reiciendis veritatis
            nihil animi modi accusantium maxime illum consequatur quibusdam quos nemo tempora
            architecto optio quas voluptates possimus, natus fuga. Possimus, eligendi nobis. Sed
            natus impedit omnis recusandae totam est iste expedita beatae voluptatem. Facilis.
          </div>
          <Popover.Close />
          <Popover.Arrow className='fill-[#fff]' />
        </Popover.Content>
      </Popover.Root>
    </LayoutToExperiments>
  );
}
