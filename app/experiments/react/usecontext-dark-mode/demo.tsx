"use client";

import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/outline";
import { createContext, type ReactNode, useContext, useState } from "react";
import SubTitle from "@/components/SubTitle";

type Theme = "light" | "dark";

const ThemeContext = createContext<Theme>("light");

interface ToggleThemeButtonProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface PanelProps {
  title: string;
  children: ReactNode;
}

interface ButtonProps {
  children: ReactNode;
}

export default function ReactUseContextDarkModeDemo() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <>
      <SubTitle>Yeah</SubTitle>
      <ThemeContext.Provider value={theme}>
        <div className="space-y-2">
          <Form />
          <ToggleThemeButton setTheme={setTheme} theme={theme} />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

function ToggleThemeButton({ theme, setTheme }: ToggleThemeButtonProps) {
  return (
    <button
      className={`${
        theme === "light"
          ? "border border-zinc-300 bg-white shadow hover:bg-zinc-50"
          : "bg-zinc-700"
      } rounded-md p-2`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      type="button"
    >
      {theme === "light" ? (
        <LightBulbIcon className="h-5 w-5 text-zinc-700" strokeWidth={2} />
      ) : (
        <MoonIcon className="h-5 w-5 text-zinc-300" />
      )}
    </button>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <div className="space-x-2">
        <Button>Sign up</Button>
        <Button>Login</Button>
      </div>
    </Panel>
  );
}

function Panel({ title, children }: PanelProps) {
  const theme = useContext(ThemeContext);
  const className = `panel-${theme}`;
  return (
    <section className={`${className} space-y-2 rounded-md p-2`}>
      <h1 className="text-xl">{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }: ButtonProps) {
  const theme = useContext(ThemeContext);
  const className = `button-${theme}`;
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}
