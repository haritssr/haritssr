"use client";

import {
  type ChangeEvent,
  createContext,
  memo,
  useContext,
  useState,
} from "react";
import SubTitle from "@/components/SubTitle";

interface NameInputAddressProps {
  name: string;
  address: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface GreetingSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function NameInputAddress({
  name,
  address,
  onChangeName,
  onChangeAddress,
}: NameInputAddressProps) {
  return (
    <div className="border p-2">
      <div className="">
        Name:
        <input onChange={onChangeName} type="text" value={name} />
      </div>
      <div className="">
        Address:
        <input onChange={onChangeAddress} type="text" value={address} />
      </div>
    </div>
  );
}

const Greeting = memo(function Greeting({ name }: { name: string }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState("Hello");
  return (
    <>
      <h3>
        {greeting} {name && ","}
        {name}!
      </h3>
      <GreetingSelector onChange={setGreeting} value={greeting} />
    </>
  );
});

function GreetingSelector({ value, onChange }: GreetingSelectorProps) {
  return (
    <div className="flex flex-col border p-2">
      <label>
        <input
          checked={value === "Hello"}
          onChange={(_e) => onChange("Hello")}
          type="radio"
          value={value}
        />
        Regular greeting
      </label>
      <label>
        <input
          checked={value === "Hello and welcome"}
          onChange={(_e) => onChange("Hello and welcome")}
          type="radio"
          value={value}
        />
        Enthutiastic greeting
      </label>
    </div>
  );
}

const ThemeContext = createContext<string | undefined>(undefined);

function ThemeYeah({ name }: { name: string }) {
  const [theme, setTheme] = useState("text-black bg-zinc-50");
  function handleClick() {
    setTheme(
      theme === "text-black bg-zinc-50"
        ? "text-white bg-zinc-700"
        : "text-black bg-zinc-50"
    );
  }
  return (
    <ThemeContext.Provider value={theme}>
      <div className="border p-2">
        <button onClick={handleClick} type="button">
          Switch theme
        </button>
        <GreetingTheme name={name} />
      </div>
    </ThemeContext.Provider>
  );
}

const GreetingTheme = memo(function GreetingTheme({ name }: { name: string }) {
  console.log(
    "Greeting Theme was rendered at",
    new Date().toLocaleDateString()
  );
  const theme = useContext(ThemeContext);
  return (
    <h3 className={`${theme} rounded p-1`}>
      Hello{name && ","} {name}!
    </h3>
  );
});

export default function ReactUseMemo1Demo() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <>
      <SubTitle>
        useMemo lets you skip re-rendering components when the props are
        unchanged
      </SubTitle>
      <NameInputAddress
        address={address}
        name={name}
        onChangeAddress={(e: ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
        onChangeName={(e: ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <Greeting name={name} />
      <ThemeYeah name={name} />
    </>
  );
}
