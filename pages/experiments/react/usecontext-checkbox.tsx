import LayoutToExperiments from '@/components/LayoutToExperiments';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function useContextChecked() {
  const [theme, setTheme] = useState('light');
  return (
    <LayoutToExperiments title='useContext CheckBox' domain='React'>
      <ThemeContext.Provider value={theme}>
        <Form />
        <label htmlFor=''>
          <input
            type='checkbox'
            checked={theme === 'dark'}
            onChange={e => {
              setTheme(e.target.checked ? 'dark' : 'light');
            }}
          />
        </label>
      </ThemeContext.Provider>
    </LayoutToExperiments>
  );
}

function Form() {
  return (
    <Panel title='Welcome'>
      <Button>Sign Up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return <button className={className}>{children}</button>;
}
