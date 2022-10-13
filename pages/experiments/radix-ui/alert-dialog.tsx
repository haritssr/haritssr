import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

export default function ExportedAlertDialog() {
  return (
    <LayoutToExperiments title='Alert Dialog' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/alert-dialog'
          name='Radix UI Alert Dialog'
        />
        <ExplanationList>
          <li>
            A modal dialog that interrupts the user with important content and expects a response.
          </li>
          <li>Click the button and the popup will appear in the middle of the screen.</li>
        </ExplanationList>
      </SubTitle>
      <AlertDialog
        buttonTitle='Delete'
        actionDesc='Are you sure want to delele this ?'
        contentDesc='Pastikan untuk menghapus'
        contentTitle='This is a title'
      />
    </LayoutToExperiments>
  );
}

function AlertDialog({ buttonTitle, contentTitle, contentDesc, actionDesc }) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger className='rounded-md bg-white  px-3 py-1.5 font-medium text-rose-500 shadow-md duration-100 hover:bg-gray-50 active:translate-y-0.5 active:shadow active:ring-1 active:ring-rose-400'>
        {buttonTitle}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Overlay className='fixed inset-0 z-50 bg-gray-900/50' />
      <AlertDialogPrimitive.Content className='fixed top-1/2 left-1/2 z-90 max-h-[80vh] w-4/5 -translate-x-1/2  -translate-y-1/2 rounded-md bg-white p-4 shadow-lg sm:max-w-screen-xs'>
        <AlertDialogPrimitive.Title className='text-center text-lg font-semibold text-gray-800 sm:text-left'>
          {contentTitle}
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className='mb-5 text-center text-gray-500 sm:text-left'>
          {/* This action cannot be undone. This will permanently delete your account and remove your
              data from our servers. */}
          {contentDesc}
        </AlertDialogPrimitive.Description>
        <div className='flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2'>
          <AlertDialogPrimitive.Cancel className='rounded-md bg-gray-200 px-3 py-2 font-medium text-gray-700 duration-100 hover:bg-gray-300 sm:py-1.5'>
            Cancel
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action className='rounded-md bg-rose-600 px-3 py-2 font-medium text-white duration-100 hover:bg-rose-700 sm:py-1.5'>
            {actionDesc}
          </AlertDialogPrimitive.Action>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  );
}
