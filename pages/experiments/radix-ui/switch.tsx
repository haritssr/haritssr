import { Switch } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedSwitch() {
  return (
    <LayoutToExperiments domain="Radix UI" title="Switch">
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/switch"
          name="Radix UI Switch"
        />
        <ExplanationList>
          <li>
            A control that allows the user to toggle between checked and not
            checked.
          </li>
          <li>Click to change state.</li>
        </ExplanationList>
      </SubTitle>
      <form>
        <Switch.Root
          className="block w-11 rounded-full border border-zinc-300 rdx-state-checked:border-green-700 rdx-state-checked:bg-green-600 p-1 hover:bg-zinc-50"
          defaultChecked
          id="s1"
        >
          <Switch.Thumb className="block h-4 w-4 rdx-state-checked:translate-x-[18px] rounded-full border border-zinc-400 bg-zinc-800 rdx-state-checked:bg-white shadow duration-100 will-change-transform" />
        </Switch.Root>
      </form>
    </LayoutToExperiments>
  );
}
