import { Topic } from '@/components/DesignSystem';
import { ThemeProvider, useTheme } from 'next-themes';

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <ThemeProvider>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 '>
          <div className='p-2 border border-gray-600 border-dashed rounded-md'>
            <Topic name='Dark Mode' />
            <div className='p-3 text-gray-700 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-300'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, accusantium iste cum,
              deserunt fuga a dolor repellendus commodi ipsam praesentium perferendis quae unde vel
              beatae delectus tempore tempora dignissimos at in optio magnam eos? Consequatur quo
              placeat ea quod magni atque minus fugit modi minima maxime doloribus sit animi
            </div>
            <button
              className='px-2 py-1 mt-2 text-gray-200 bg-gray-700 rounded dark:bg-gray-300 dark:text-gray-700'
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            >
              Dark Mode
            </button>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
