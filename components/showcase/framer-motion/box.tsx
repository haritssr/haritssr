import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Box() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      <motion.div
        className='w-20 h-20 mt-20 rounded-lg shadow-lg bg-gradient-to-b from-rose-400 to-rose-500 hover:shadow'
        animate={{
          translateX: isAnimating ? 0 : 200,
          rotate: isAnimating ? 360 : 0,
        }}
        transition={{ duration: 1, type: 'spring', stiffness: 60, damping: 20 }}
        onClick={() => setIsAnimating(!isAnimating)}
      ></motion.div>
      <motion.div
        className='w-20 h-20 mt-20 rounded-lg shadow-lg bg-gradient-to-b from-amber-400 to-amber-500 hover:shadow'
        drag='x'
      ></motion.div>
      <motion.div
        className='w-20 h-20 mt-20 rounded-lg shadow-lg bg-gradient-to-b from-lime-400 to-lime-500 hover:shadow'
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
      ></motion.div>
    </>
  );
}
