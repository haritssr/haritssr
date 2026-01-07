import { CheckIcon } from "@radix-ui/react-icons";
import { Checkbox } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedCheckbox() {
  return (
    <LayoutToExperiments domain="Radix UI" title="Checkbox">
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/Checkbox"
          name="Radix UI Checkbox"
        />
        <ExplanationList>
          <li>
            A control that allows the user to toggle between checked and not
            checked.
          </li>
          <li>Click the checklist button and the state will change.</li>
        </ExplanationList>
      </SubTitle>
      <form>
        <div className="flex align-center">
          <Checkbox.Root
            className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 rdx-state-checked:border-blue-600 bg-white hover:bg-blue-50"
            // defaultChecked
            id="c1"
          >
            <Checkbox.Indicator className="text-action">
              <CheckIcon className="h-5 w-5" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="select-none pl-4 text-zinc-800" htmlFor="c1">
            Accept terms and conditions.
          </label>
        </div>
      </form>
    </LayoutToExperiments>
  );
}
