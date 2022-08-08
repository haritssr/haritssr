import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { LightBulbIcon, MoonIcon } from '@heroicons/react/outline';
import { useContext, createContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function UseContextDarkMode() {
  const [theme, setTheme] = useState('light');
  return (
    <LayoutToExperiments title='useContext Dark Mode' domain='React'>
      <SubTitle>Yeah</SubTitle>
      <ThemeContext.Provider value={theme}>
        <div className='space-y-2'>
          <Form />
          <ToggleThemeButton theme={theme} setTheme={setTheme} />
        </div>
      </ThemeContext.Provider>
    </LayoutToExperiments>
  );
}

function ToggleThemeButton({ theme, setTheme }) {
  return (
    <button
      className={`${
        theme === 'light'
          ? 'border border-zinc-300 bg-white shadow hover:bg-zinc-50'
          : 'bg-zinc-700 '
      } rounded-md p-2 `}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <LightBulbIcon className='h-5 w-5 text-zinc-700 ' strokeWidth={2} />
      ) : (
        <MoonIcon className='h-5 w-5 text-zinc-300' />
      )}
    </button>
  );
}

function Form() {
  return (
    <Panel title='Welcome'>
      <div className='space-x-2'>
        <Button>Sign up</Button>
        <Button>Login</Button>
      </div>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={`${className} space-y-2 rounded-md p-2`}>
      <h1 className='text-xl'>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return <button className={className}>{children}</button>;
}
