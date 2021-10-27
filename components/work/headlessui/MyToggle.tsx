import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Topic } from '@/components/DesignSystem';

//Switch (Toggle)
export default function MyToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Topic name='Toggle' />
      <Switch
        as='div'
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className='sr-only'>Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full`}
        />
      </Switch>
    </>
  );
}
