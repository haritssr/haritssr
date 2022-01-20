import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SubTopic, Topic } from '../DesignSystem';

export default function DarkMode() {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <div>
      <Topic name='Dark Theme' />
      <SubTopic>Example of Dark Theme</SubTopic>
      <div className='p-3 border border-zinc-300'>
        <div className='dark:text-black'>The current theme is : {theme}</div>
        <button
          onClick={switchTheme}
          className='px-2 py-1 mb-5 border rounded border-zinc-400 hover:bg-zinc-100 dark:text-white dark:bg-zinc-600'
        >
          {theme === 'dark' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
          )}
        </button>
        <div className='p-5 text-gray-800 rounded dark:text-zinc-100 dark:bg-zinc-800 bg-zinc-100'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ab veniam, delectus,
          blanditiis error saepe odit unde id provident optio eveniet totam nam ipsum quos esse
          ipsam. Eos quisquam voluptatibus accusamus quam suscipit atque, ullam molestiae vel neque
          aliquam mollitia aspernatur corporis nisi, tempora recusandae nesciunt facilis quidem
          assumenda aperiam? Amet optio perspiciatis cum ipsam, repudiandae unde voluptatum
          necessitatibus quas, accusamus corporis beatae sed veritatis maxime doloribus, assumenda
          animi earum temporibus tempora similique! Hic doloribus est officiis asperiores? Labore,
          unde. Maxime ducimus adipisci iste distinctio, accusamus suscipit rerum, quidem fugiat
          deleniti ullam dolore repudiandae fuga quibusdam blanditiis molestiae laudantium facere?
        </div>
      </div>
    </div>
  );
}
