import { useState } from 'react';
import { Switch } from '@headlessui/react';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';

export default function ExportedSwitch() {
  return (
    <LayoutToExperiments title='Listbox' domain='Headless UI'>
      <SubTitle>
        Switches are a pleasant interface for toggling a value between two states, and offer the
        same semantics and keyboard navigation as native checkbox elements.{' '}
        <ExternalLink name='Source' href='https://headlessui.dev/react/switch' />
      </SubTitle>
      <SwitchExample1 />
    </LayoutToExperiments>
  );
}

const SwitchExample1 = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch.Group className='flex flex-col space-y-1' as='div'>
      <Switch.Label passive={!enabled}>Nyalakan notifikasi</Switch.Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-green-400' : 'bg-gray-200'
        } relative inline-flex w-16 items-center rounded-full p-1.5 transition duration-300 ease-out`}
      >
        <span className='sr-only'>Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-8' : 'translate-x-0.5'
          } inline-block h-5 w-5 transform rounded-full bg-white`}
        />
      </Switch>
    </Switch.Group>
  );
};
