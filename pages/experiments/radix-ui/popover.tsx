import { Popover } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedPopover() {
  return (
    <LayoutToExperiments domain="Radix UI" title="Popover">
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/popover"
          name="Radix UI Popover"
        />
        <ExplanationList>
          <li>Displays rich content in a portal, triggered by a button.</li>
          <li>Click the button and the portal will appear below.</li>
        </ExplanationList>
      </SubTitle>
      <Popover.Root>
        <Popover.Trigger className="w-auto rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1 font-medium text-zinc-800 rdx-state-open:ring-2 rdx-state-open:ring-blue-600 hover:bg-zinc-100">
          Open
        </Popover.Trigger>

        {/* <Popover.Anchor /> */}
        <Popover.Content
          className="w-[80vw] max-w-sm rounded-md border border-zinc-400 bg-white p-4 text-zinc-800 shadow-xl"
          side="bottom"
          sideOffset={10}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur vel
          fugit ipsum est, perferendis animi accusantium molestiae impedit
          minima ea debitis cumque vitae architecto quidem fuga explicabo? Modi
          iure, magni provident tenetur corrupti natus quis quibusdam incidunt
          officia sed expedita ratione. Voluptates non consequuntur repellendus
          rerum quisquam? Repellendus, nemo recusandae placeat fuga
          necessitatibus.
          <Popover.Close />
          <Popover.Arrow className="fill-zinc-800" />
        </Popover.Content>
      </Popover.Root>
    </LayoutToExperiments>
  );
}
