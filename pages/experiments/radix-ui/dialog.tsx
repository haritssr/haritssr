import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Dialog from '@radix-ui/react-dialog';

export default function ExportedDialog() {
  return (
    <LayoutToExperiments title='Dialog' domain='Radix UI'>
      <SubTitle>
        A window overlaid on either the primary window or another dialog window, rendering the
        content underneath inert.
      </SubTitle>
      <Dialog.Root>
        <Dialog.Trigger className='rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1.5 font-medium  text-zinc-700 duration-100 hover:bg-zinc-100 active:translate-y-0.5'>
          Edit Profile
        </Dialog.Trigger>
        <Dialog.Overlay className='fixed inset-0 bg-gray-900/70' />
        <Dialog.Content className='max-w-screen-xs fixed top-1/2 left-1/2 max-h-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-5 py-4 shadow-xl'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className='text-lg font-semibold text-gray-700'>
                Are you sure want to Edit your profile ?
              </Dialog.Title>
              <Dialog.Close>
                {/* Close Icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-7 w-7 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
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
