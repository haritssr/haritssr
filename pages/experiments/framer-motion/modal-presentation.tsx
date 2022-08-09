import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import useSWR from 'swr';
import { Spinner } from '@/components/spinner';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';

export default function ModalPresentation() {
  let [open, setOpen] = useState(false);
  return (
    <LayoutToExperiments title='Modal Presentation' domain='Framer Motion'>
      <SubTitle>
        Inspired by{' '}
        <ExternalLink name='Sam Selikoff' href='https://www.youtube.com/watch?v=ELvqt944ch4' />
      </SubTitle>
      <div className='relative border p-4'>
        <h1 className='text-center text-xl font-semibold'>Favorites</h1>
        <div className='absolute inset-y-0 left-4 flex items-center justify-center'>
          <button onClick={() => setOpen(true)} className='text-blue-500'>
            {/* <Icons.PlusIcon className='h-5 w-5' /> */}
            <span className='text-blue-500'>Add</span>
          </button>
        </div>
      </div>
      <AnimatePresence>{open && <AddFavorite onClose={() => setOpen(false)} />}</AnimatePresence>
    </LayoutToExperiments>
  );
}

function AddFavorite({ onClose }) {
  let { data: users } = useSWR('/api/users');

  return (
    <Modal onClose={onClose}>
      <div className='flex h-full flex-col pt-3 '>
        <div className='px-3 pb-4 shadow-sm'>
          <p className='text-xs'>Choose a contact to add to Favorites</p>
          <div className='relative mt-5 text-center'>
            <span className='font-medium'>Contacts</span>
            <div className='absolute inset-y-0 right-0'>
              <button className='mr-1 text-blue-500 focus:outline-none' onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className='flex-1 overflow-y-scroll'>
          {!users ? (
            <div className='flex items-center justify-center pt-12'>
              <Spinner />
            </div>
          ) : (
            <>
              <ul className='px-3 text-left'>
                {users.map(user => (
                  <li key={user.id} className='border-b border-gray-100 py-2'>
                    {user.name}
                  </li>
                ))}
              </ul>

              <p className='pt-4 pb-10 text-center font-medium text-gray-400'>
                {users.length} Contacts
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Modal({ onClose, children }) {
  return (
    <Dialog className='fixed inset-0 z-50 mx-auto max-w-md' onClose={onClose} open={false}>
      <div className='flex h-full flex-col justify-center px-1 pt-4 text-center sm:block sm:p-0'>
        <Dialog.Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className='fixed inset-0 bg-blue-500/60'
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{
            y: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            y: '100%',
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className='z-0 mt-5 flex h-full w-full flex-col rounded-t-lg bg-white shadow-xl'
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
