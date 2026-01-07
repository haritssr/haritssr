import type React from "react";
import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

export default function Inputs() {
  return (
    <LayoutToExperiments domain="Browser" title="Input Element">
      <SubTitle>Browser built-in input elements </SubTitle>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-14">
        <Wrapper name="text">
          <InputText />
        </Wrapper>
        <Wrapper name="search">
          <InputSearch />
        </Wrapper>
        <Wrapper name="date">
          <InputDate />
        </Wrapper>
        <Wrapper name="button">
          <InputButton />
        </Wrapper>
        <Wrapper name="reset">
          <InputReset />
        </Wrapper>
        <Wrapper name="checkbox">
          <InputCheckbox />
        </Wrapper>
        <Wrapper name="color">
          <InputColor />
        </Wrapper>
        <Wrapper name="range">
          <InputRange />
        </Wrapper>
        <Wrapper name="file">
          <InputFile />
        </Wrapper>
        <Wrapper name="email">
          <InputEmail />
        </Wrapper>
        <Wrapper name="month">
          <InputMonth />
        </Wrapper>
        <Wrapper name="number">
          <InputNumber />
        </Wrapper>
        <Wrapper name="password">
          <InputPassword />
        </Wrapper>
        <Wrapper name="radio">
          <InputRadio />
        </Wrapper>
        <Wrapper name="week">
          <InputWeek />
        </Wrapper>
        <Wrapper name="time">
          <InputTime />
        </Wrapper>
        <Wrapper name="url">
          <InputUrl />
        </Wrapper>
        <Wrapper name="submit">
          <InputSubmit />
        </Wrapper>
        <Wrapper name="tel">
          <InputTel />
        </Wrapper>
      </div>
    </LayoutToExperiments>
  );
}

const Wrapper = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Section name={name} />
      {children}
    </div>
  );
};

const InputTel = () => {
  return (
    <input
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      placeholder="1234-5678-9101"
      required
      type="tel"
    />
  );
};

const InputSubmit = () => {
  return <input type="submit" />;
};

const InputUrl = () => {
  return (
    <input
      id="url"
      name="url"
      pattern="https://.*"
      placeholder="https://www.example.com"
      required
      type="url"
    />
  );
};

const InputTime = () => {
  return <input required type="time" />;
};

const InputText = () => {
  return (
    <input
      // style={{ backgroundImage: 'url(/searchicon.svg)', backgroundRepeat: 'no-repeat' }}
      placeholder="Type something"
      type="text"
    />
  );
};

const InputWeek = () => {
  return <input required type="week" />;
};

//weird
const InputRadio = () => {
  return (
    <div>
      <div className="space-x-2">
        <input
          checked
          id="huey"
          name="drone"
          readOnly
          type="radio"
          value="huey"
        />
        <label htmlFor="huey">Huey</label>
      </div>

      <div className="space-x-2">
        <input id="dewey" name="drone" type="radio" value="dewey" />
        <label htmlFor="dewey">Dewey</label>
      </div>

      <div className="space-x-2">
        <input id="louie" name="drone" type="radio" value="louie" />
        <label htmlFor="louie">Louie</label>
      </div>
    </div>
  );
};

const InputPassword = () => {
  return <input placeholder="Type password" type="password" />;
};

const InputNumber = () => {
  return (
    <input id="tentacles" max="100" min="10" name="tentacles" type="number" />
  );
};

const InputMonth = () => {
  return <input id="start" name="start" type="month" />;
};

const InputEmail = () => {
  return (
    <input
      id="email"
      pattern=".+@globex\.com"
      placeholder="me@email.com"
      required
      type="email"
    />
  );
};

const InputFile = () => {
  return <input accept="image/png, image/jpeg" name="Upload" type="file" />;
};

const InputSearch = () => {
  return <input placeholder="Search" type="search" />;
};

//You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
const InputDate = () => {
  return (
    <input
      defaultValue="2018-07-22"
      id="start"
      max="2018-12-31"
      min="2018-01-01"
      name="trip-start"
      type="date"
      //readOnly
    />
  );
};

const InputButton = () => {
  return <input type="button" value="Click me" />;
};

const InputReset = () => {
  return (
    <form className="flex flex-col space-y-2">
      <input name="id" placeholder="Type something" type="text" />
      <input type="reset" value="Reset" />
      <input type="submit" value="Submit" />
    </form>
  );
};

const InputCheckbox = () => {
  return <input type="checkbox" value="Click me" />;
};

const InputColor = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <input onChange={handleChange} type="color" value="#5151d2" />
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
        doloribus minus dolorem labore enim voluptatibus reiciendis natus
        placeat voluptas maxime!
      </div>
    </div>
  );
};

const InputRange = () => {
  const [temperature, setTemperature] = useState<string>("0");

  return (
    <div>
      <div>
        <label className="block text-sm" htmlFor="temperature">
          Temparature : {temperature}&deg;C
        </label>
        <input
          className="block"
          id="temperature"
          list="tickmarks"
          max={100}
          min={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTemperature(e.target.value)
          }
          step={10}
          type="range"
          value={temperature}
        />
      </div>
      <div className="mt-5">
        <input list="tickmarks" type="range" />
        <datalist id="tickmarks">
          <option label="0%" value="0" />
          <option value="10" />
          <option value="20" />
          <option value="30" />
          <option value="40" />
          <option label="50%" value="50" />
          <option value="60" />
          <option value="70" />
          <option value="80" />
          <option value="90" />
          <option label="100%" value="100" />
        </datalist>
      </div>
    </div>
  );
};
