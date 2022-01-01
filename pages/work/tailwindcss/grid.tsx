import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function Grid() {
  return (
    <LayoutSubWorkToTopic title='Grid' href='/work/tailwindcss' hrefName='Tailwind CSS'>
      <SubTitle>Grid is used to arrange content easly and neatly</SubTitle>
      <div className='grid min-h-screen place-items-center '>
        <div className='grid max-w-5xl gap-4 xs:grid-cols-2 md:grid-cols-4 '>
          <h1 className='text-4xl font-extrabold xs:col-span-2 xs:grid xs:grid-cols-2 xs:gap-4 md:col-span-3 md:text-5xl md:grid-cols-3 '>
            <span className='bg-yellow-300 md:col-span-2'>Grid layout with Tailwind CSS</span>
          </h1>
          <p className='xs:row-start-2 xs:col-start-2 xs:self-center md:col-start-1 md:col-span-2 md:pr-12 md:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi adipisci inventore
            explicabo quidem sunt molestiae quae quia blanditiis dolorum, obcaecati enim aut a .
          </p>
          <div className='h-16 bg-blue-500 xs:h-auto xs:square'></div>
          <div className='h-16 bg-blue-500 xs:h-auto xs:square'></div>
          <div className='h-16 bg-pink-500 xs:h-auto xs:square'></div>
          <div className='h-16 bg-blue-500 xs:h-auto xs:square md:col-start-2'></div>
          <div className='h-16 bg-pink-500 xs:h-auto xs:square'></div>
          <div className='h-16 bg-blue-500 xs:h-auto xs:square'></div>
          <div className='h-16 bg-blue-500 xs:h-auto xs:square'></div>
          <div className='h-16 bg-pink-500 xs:h-auto xs:square'></div>
          <p className='self-center md:text-lg md:col-span-2 md:text-center md:px-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis fugit at
            debitis.
          </p>
        </div>
      </div>
    </LayoutSubWorkToTopic>
  );
}
