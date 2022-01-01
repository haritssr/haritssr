import * as Label from '@radix-ui/react-label';

export default function LabelDemo() {
  return (
    <div className='flex items-center space-x-4'>
      <Label.Root htmlFor='firstName' className='font-medium text-gray-600'>
        First name
      </Label.Root>
      <input
        type='text'
        id='firstName'
        defaultValue='Pedro Duarte'
        className='px-3 py-2 bg-white rounded-md shadow-md focus:ring-2 focus:ring-inset focus:shadow-none focus:outline-none focus:ring-blue-600'
      />
    </div>
  );
}
