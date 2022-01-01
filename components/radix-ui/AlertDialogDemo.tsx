import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

export default function AlertDialogDemo({ buttonTitle, contentTitle, contentDesc, actionDesc }) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger className='px-3 py-1.5  bg-white rounded-md shadow-md hover:bg-gray-50 font-medium active:shadow active:translate-y-0.5 duration-100 text-rose-500 active:ring-1 active:ring-rose-400'>
        {buttonTitle}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Overlay className='fixed inset-0 bg-gray-900/50' />
      <AlertDialogPrimitive.Content className='fixed -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 w-4/5  sm:max-w-screen-xs max-h-[80vh] p-4 rounded-md shadow-lg'>
        <AlertDialogPrimitive.Title className='text-lg font-semibold text-center text-gray-800 sm:text-left'>
          {contentTitle}
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className='mb-5 text-center text-gray-500 sm:text-left'>
          {/* This action cannot be undone. This will permanently delete your account and remove your
            data from our servers. */}
          {contentDesc}
        </AlertDialogPrimitive.Description>
        <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-end'>
          <AlertDialogPrimitive.Cancel className='px-3 py-2 sm:py-1.5 font-medium text-gray-700 duration-100 bg-gray-200 rounded-md hover:bg-gray-300'>
            Cancel
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action className='px-3 py-2 sm:py-1.5 font-medium text-white duration-100 rounded-md bg-rose-600 hover:bg-rose-700'>
            {actionDesc}
          </AlertDialogPrimitive.Action>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  );
}
