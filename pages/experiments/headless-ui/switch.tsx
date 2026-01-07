import { Switch } from "@headlessui/react";
import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedSwitch() {
  return (
    <LayoutToExperiments domain="Headless UI" title="Switch">
      <SubTitle>
        <ExternalLink
          href="https://headlessui.dev/react/switch"
          name="Headless UI Switch"
        />
        <ExplanationList>
          <li>
            Switches are a pleasant interface for toggling a value between two
            states, and offer the same semantics and keyboard navigation as
            native checkbox elements.
          </li>
          <li>
            Click the button to change between state. Usually represent on and
            off state.
          </li>
        </ExplanationList>
      </SubTitle>
      <SwitchExample1 />
    </LayoutToExperiments>
  );
}

const SwitchExample1 = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch.Group as="div">
      {/* <Switch.Label>Nyalakan notifikasi</Switch.Label> */}
      <Switch
        as="div"
        checked={enabled}
        className={`${
          enabled
            ? "border-green-600 bg-green-500 hover:border-green-800"
            : "border-zinc-300 bg-zinc-200 hover:border-zinc-500"
        } relative inline-flex w-[58px] cursor-pointer items-center rounded-full border p-1 transition duration-100 ease-out`}
        onChange={setEnabled}
      >
        <div
          className={`${
            enabled ? "translate-x-6" : "translate-x-0.5"
          } inline-block h-6 w-6 transform rounded-full bg-white shadow-md`}
        />
      </Switch>
    </Switch.Group>
  );
};
