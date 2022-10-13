import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';

export default function ExportedDialog() {
  return (
    <LayoutToExperiments title='Dialog' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/dialog'
          name='Radix UI Dialog'
        />
        <ExplanationList>
          <li>
            A window overlaid on either the primary window or another dialog window, rendering the
            content underneath inert.
          </li>
          <li>
            Click the button and popup will appear waiting to you to confirm to close the popup.
          </li>
        </ExplanationList>
      </SubTitle>
      <Dialog.Root>
        <Dialog.Trigger className='rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1.5 font-medium  text-zinc-700 duration-100 hover:bg-zinc-100 active:translate-y-0.5'>
          Edit Profile
        </Dialog.Trigger>
        <Dialog.Overlay className='fixed inset-0 bg-gray-900/70' />
        <Dialog.Content className='fixed top-1/2 left-1/2 max-h-[80vh] max-w-screen-xs -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-5 py-4 shadow-xl'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className='text-lg font-semibold text-gray-700'>
                Are you sure want to Edit your profile ?
              </Dialog.Title>
              <Dialog.Close>
                <XMarkIcon className='h-7 w-7 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700' />
              </Dialog.Close>
            </div>
            <Dialog.Description className='text-gray-500'>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </Dialog.Description>
            <div className='flex justify-end'>
              <Dialog.Close className='rounded-md bg-blue-600 px-3 pt-0.5 pb-1 font-semibold text-white duration-100 ease-in-out hover:bg-blue-700'>
                Confirm
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </LayoutToExperiments>
  );
}
