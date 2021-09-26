import { Title } from '@/components/DesignSystem';
import MyDialog from '@/components/showcase/headlessui/MyDialog';
import MyDisclosure from '@/components/showcase/headlessui/MyDisclosure';
import MyDropdown from '@/components/showcase/headlessui/MyDropdown';
import MyPopover from '@/components/showcase/headlessui/MyPopover';
import MyRadioGroup from '@/components/showcase/headlessui/MyRadioGroup';
import MyToggle from '@/components/showcase/headlessui/MyToggle';
import MyTabs from '@/components/showcase/headlessui/MyTabs';
import Layout from '@/components/Layout';
// import DarkMode from '@/components/showcase/headlessui/DarkMode';

export default function HeadlessUI() {
  const box = 'h-auto p-4 rounded-xl bg-white shadow';
  return (
    <Layout browserTitle='HeadlessUI' description='HeadlessUI'>
      <Title name='HeadlessUI' />

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        {/* <div className={box}>
          <MyDialog />
        </div> */}
        <div className={box}>
          <MyDisclosure />
        </div>
        <div className={box}>
          <MyDropdown />
        </div>
        <div className={box}>
          <MyToggle />
        </div>
        <div className={box}>
          <MyPopover />
        </div>
        <div className={box}>
          <MyRadioGroup />
        </div>
        <div className={box}>
          <MyTabs />
        </div>
      </div>
    </Layout>
  );
}
