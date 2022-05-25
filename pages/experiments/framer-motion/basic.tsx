import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Basic() {
  const [x, setX] = useState('10');
  return (
    <LayoutToExperiments title='Basic' domain='Framer Motion'>
      <SubTitle>Basic</SubTitle>
      <motion.div
        animate={{ x: x, scale: 2, rotate: 0 }}
        className={`h-${x} w-${x} rounded bg-zinc-500 text-sm`}
      />

      <input
        className='mt-10'
        type='range'
        min='10'
        max='100'
        value={x}
        onChange={e => setX(e.target.value)}
      />
    </LayoutToExperiments>
  );
}
