import { InternalLink } from '@/components/DesignSystem';
import { useState } from 'react';

export default function UseState() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('haris');

  return (
    <>
      <button
        className='px-4 py-1 text-white rounded-md bg-harislab hover:bg-gray-200 hover:text-gray-700'
        onClick={() => setOpen(true)}
      >
        Munculkan link ke matematika
      </button>
      {open && (
        <div>
          <InternalLink name='Matematika' href='matematika' />
          <button
            className='px-4 py-1 text-white rounded-md bg-harislab hover:bg-gray-200 hover:text-gray-700'
            onClick={() => setOpen(false)}
          >
            tutup
          </button>
        </div>
      )}
      <div>
        {/* <input
          type='text'
          value={message}
          placeholder='Enter a message'
          onChange={e => {
            const val = e.target.value;
            setMessage(prev => prev + val);
          }}
        /> */}
        <p>
          <strong>{message}</strong>
        </p>
      </div>
    </>
  );
}
