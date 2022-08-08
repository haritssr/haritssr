import { SubTitle, Topic } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

export default function Inputs() {
  return (
    <LayoutToExperiments title='Input Element' domain='Browser'>
      <SubTitle>Browser built-in input elements </SubTitle>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-14'>
        <Wrapper name='text'>
          <InputText />
        </Wrapper>
        <Wrapper name='search'>
          <InputSearch />
        </Wrapper>
        <Wrapper name='date'>
          <InputDate />
        </Wrapper>
        <Wrapper name='button'>
          <InputButton />
        </Wrapper>
        <Wrapper name='reset'>
          <InputReset />
        </Wrapper>
        <Wrapper name='checkbox'>
          <InputCheckbox />
        </Wrapper>
        <Wrapper name='color'>
          <InputColor />
        </Wrapper>
        <Wrapper name='range'>
          <InputRange />
        </Wrapper>
        <Wrapper name='file'>
          <InputFile />
        </Wrapper>
        <Wrapper name='email'>
          <InputEmail />
        </Wrapper>
        <Wrapper name='month'>
          <InputMonth />
        </Wrapper>
        <Wrapper name='number'>
          <InputNumber />
        </Wrapper>
        <Wrapper name='password'>
          <InputPassword />
        </Wrapper>
        <Wrapper name='radio'>
          <InputRadio />
        </Wrapper>
        <Wrapper name='week'>
          <InputWeek />
        </Wrapper>
        <Wrapper name='time'>
          <InputTime />
        </Wrapper>
        <Wrapper name='url'>
          <InputUrl />
        </Wrapper>
        <Wrapper name='submit'>
          <InputSubmit />
        </Wrapper>
        <Wrapper name='tel'>
          <InputTel />
        </Wrapper>
      </div>
    </LayoutToExperiments>
  );
}

const Wrapper = ({ name, children }: { name: string; children: React.ReactNode }) => {
  return (
    <div>
      <Topic name={name} />
      {children}
    </div>
  );
};

const InputTel = () => {
  return (
    <input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='1234-5678-9101' required />
  );
};

const InputSubmit = () => {
  return <input type='submit' />;
};

const InputUrl = () => {
  return (
    <input
      type='url'
      name='url'
      id='url'
      placeholder='https://www.example.com'
      pattern='https://.*'
      required
    />
  );
};

const InputTime = () => {
  return <input type='time' required />;
};

const InputText = () => {
  return (
    <input
      // style={{ backgroundImage: 'url(/searchicon.svg)', backgroundRepeat: 'no-repeat' }}
      type='text'
      placeholder='Type something'
    />
  );
};

const InputWeek = () => {
  return <input type='week' required />;
};

//weird
const InputRadio = () => {
  return (
    <div>
      <div className='space-x-2'>
        <input type='radio' id='huey' name='drone' value='huey' checked />
        <label htmlFor='huey'>Huey</label>
      </div>

      <div className='space-x-2'>
        <input type='radio' id='dewey' name='drone' value='dewey' />
        <label htmlFor='dewey'>Dewey</label>
      </div>

      <div className='space-x-2'>
        <input type='radio' id='louie' name='drone' value='louie' />
        <label htmlFor='louie'>Louie</label>
      </div>
    </div>
  );
};

const InputPassword = () => {
  return <input type='password' placeholder='Type password' />;
};

const InputNumber = () => {
  return <input type='number' id='tentacles' name='tentacles' min='10' max='100' />;
};

const InputMonth = () => {
  return <input type='month' id='start' name='start' />;
};

const InputEmail = () => {
  return (
    <input type='email' id='email' pattern='.+@globex\.com' required placeholder='me@email.com' />
  );
};

const InputFile = () => {
  return <input type='file' accept='image/png, image/jpeg' name='Upload' />;
};

const InputSearch = () => {
  return <input type='search' placeholder='Search' />;
};

//You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
const InputDate = () => {
  return (
    <input
      type='date'
      id='start'
      name='trip-start'
      defaultValue='2018-07-22'
      min='2018-01-01'
      max='2018-12-31'
      //readOnly
    />
  );
};

const InputButton = () => {
  return <input type='button' value='Click me' />;
};

const InputReset = () => {
  return (
    <form className='flex flex-col space-y-2'>
      <input type='text' name='id' placeholder='Type something' />
      <input type='reset' value='Reset' />
      <input type='submit' value='Submit' />
    </form>
  );
};

const InputCheckbox = () => {
  return <input type='checkbox' value='Click me' />;
};

const InputColor = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <input type='color' value='#5151d2' onChange={handleChange} />
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero doloribus minus dolorem
        labore enim voluptatibus reiciendis natus placeat voluptas maxime!
      </div>
    </div>
  );
};

const InputRange = () => {
  const [temperature, setTemperature] = useState<string>('0');

  return (
    <div>
      <div>
        <label htmlFor='temperature' className='block text-sm'>
          Temparature : {temperature}&deg;C
        </label>
        <input
          className='block'
          id='temperature'
          type='range'
          min={0}
          max={100}
          value={temperature}
          step={10}
          list='tickmarks'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperature(e.target.value)}
        />
      </div>
      <div className='mt-5'>
        <input type='range' list='tickmarks' />
        <datalist id='tickmarks'>
          <option value='0' label='0%'></option>
          <option value='10'></option>
          <option value='20'></option>
          <option value='30'></option>
          <option value='40'></option>
          <option value='50' label='50%'></option>
          <option value='60'></option>
          <option value='70'></option>
          <option value='80'></option>
          <option value='90'></option>
          <option value='100' label='100%'></option>
        </datalist>
      </div>
    </div>
  );
};
