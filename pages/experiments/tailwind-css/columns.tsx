import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function Columns() {
  return (
    <LayoutToExperiments title='Columns' domain='Tailwind CSS'>
      <SubTitle>Columns</SubTitle>

      <div className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 xl:columns-4 '>
        <Box3 />
        <Box />
        <Box2 />
        <Box />
        <Box3 />
        <Box />
        <Box2 />
        <Box />
        <Box3 />
        <Box />
        <Box2 />
        <Box />
      </div>
    </LayoutToExperiments>
  );
}

function Box() {
  return (
    <div className='h-auto overflow-hidden rounded-lg border border-zinc-400'>
      <div className='h-24 bg-white'></div>
      <div className='h-auto border-t border-zinc-400 bg-zinc-100 p-2'>
        <div className='flex items-center justify-end'>
          <div className='h-7 w-1/2 rounded bg-zinc-400'></div>
        </div>
      </div>
    </div>
  );
}
function Box2() {
  return (
    <div className='h-auto overflow-hidden rounded-lg border border-zinc-400'>
      <div className='h-32 bg-white'></div>
      <div className='h-auto border-t border-zinc-400 bg-zinc-100 p-2'>
        <div className='flex items-center justify-end'>
          <div className='h-7 w-1/2 rounded bg-zinc-400'></div>
        </div>
      </div>
    </div>
  );
}
function Box3() {
  return (
    <div className='h-auto overflow-hidden rounded-lg border border-zinc-400'>
      <div className='h-56 bg-white'></div>
      <div className='h-auto border-t border-zinc-400 bg-zinc-100 p-2'>
        <div className='flex items-center justify-end'>
          <div className='h-7 w-1/2 rounded bg-zinc-400'></div>
        </div>
      </div>
    </div>
  );
}
