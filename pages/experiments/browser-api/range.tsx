import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { String } from '@stitches/react/types/util';
import React, { useState } from 'react';

export default function Range() {
  const [temperature, setTemperature] = useState<String>('0');
  return (
    <LayoutToExperiments domain='Browser' title='Range'>
      <SubTitle>Input type=range with react</SubTitle>
      <div className='space-y-2'>
        <label htmlFor='temperature' className='block'>
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
      <div className='mt-20'>
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
    </LayoutToExperiments>
  );
}
