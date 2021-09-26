export default function FloatingLabels() {
  return (
    <div className='relative mt-4'>
      <div className='max-w-xl'>
        <input
          type='email'
          id='email'
          placeholder='Email Address'
          className='w-full px-4 py-2 text-gray-800 placeholder-transparent border-b-2 border-gray-300 rounded-t-md focus:outline-none focus:border-rose-600 peer'
        />
        <label
          htmlFor='email'
          className='absolute left-0 text-sm -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-4'
        >
          Email address
        </label>
      </div>
    </div>
  );
}
