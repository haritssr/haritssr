import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
    <LayoutToExperiments title='Dark Mode' domain='Tailwind CSS'>
      <SubTitle>Example of Dark Theme</SubTitle>

      <div className='dark:text-black'>The current theme is : {theme}</div>
      <button
        onClick={switchTheme}
        className='mb-5 rounded border border-zinc-400 px-2 py-1 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-600 dark:text-white'
      >
        {theme === 'dark' ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
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
            className='h-6 w-6'
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
      <div className='rounded bg-zinc-100 p-5 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ab veniam, delectus,
        blanditiis error saepe odit unde id provident optio eveniet totam nam ipsum quos esse ipsam.
        Eos quisquam voluptatibus accusamus quam suscipit atque, ullam molestiae vel neque aliquam
        mollitia aspernatur corporis nisi, tempora recusandae nesciunt facilis quidem assumenda
        aperiam? Amet optio perspiciatis cum ipsam, repudiandae unde voluptatum necessitatibus quas,
        accusamus corporis beatae sed veritatis maxime doloribus, assumenda animi earum temporibus
        tempora similique! Hic doloribus est officiis asperiores? Labore, unde. Maxime ducimus
        adipisci iste distinctio, accusamus suscipit rerum, quidem fugiat deleniti ullam dolore
        repudiandae fuga quibusdam blanditiis molestiae laudantium facere?
      </div>
    </LayoutToExperiments>
  );
}
