import * as Dialog from '@radix-ui/react-dialog';

export default function DialogDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='px-3 py-1.5 text-gray-600 bg-white rounded-md shadow-md hover:bg-gray-50 font-medium active:shadow active:translate-y-0.5 duration-100'>
        Edit Profile
      </Dialog.Trigger>
      <Dialog.Overlay className='fixed inset-0 bg-gray-900/70' />
      <Dialog.Content className='fixed -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 max-w-screen-xs max-h-[80vh] px-5 py-4 rounded-md shadow-xl'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Dialog.Title className='text-lg font-semibold text-gray-700'>
              Are you sure want to Edit your profile ?
            </Dialog.Title>

            <Dialog.Close>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='p-1 text-gray-500 rounded-full w-7 h-7 hover:text-gray-700 hover:bg-gray-200'
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
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </Dialog.Description>
          <div className='flex justify-end'>
            <Dialog.Close className='px-3 pt-0.5 pb-1 font-semibold text-white bg-blue-600 hover:bg-blue-700 duration-100 ease-in-out rounded-md'>
              Confirm
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
