import { SubTitle, Topic } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import style from '../../../styles/different.module.css';

export default function CustomScroll() {
  return (
    <LayoutToExperiments title='Custom Scroll' domain='Browser'>
      <SubTitle>Click blue &quot;source github button&quot; to see the source code</SubTitle>
      <Topic name='Coloring, Box size, Rounded corner, Padding' />
      <div className='flex space-x-5'>
        <div
          style={{
            backgroundColor: '#d1d1d6',
            height: '100px',
            width: '100px',
            borderRadius: '6px',
            padding: '8px',
          }}
        >
          Inline CSS
        </div>
        <div className='h-[100px] w-[100px] rounded-md bg-[#d1d1d6] p-2'>Tailwind CSS</div>
        <div className={style.box}>CSS Module</div>
      </div>
    </LayoutToExperiments>
  );
}
