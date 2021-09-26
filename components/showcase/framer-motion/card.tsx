import { CaraSayaMenyampaikanInformasi } from 'data/Beranda';
import { motion } from 'framer-motion';

export default function Card() {
  return (
    <section className='grid grid-cols-1 gap-5 mx-auto xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {CaraSayaMenyampaikanInformasi.map((a, i) => (
        <motion.div
          key={a.id}
          initial={{ opacity: 0.5, translateX: -50, translateY: i % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
          className='flex flex-col items-center justify-start px-4 py-6 space-y-2 bg-white shadow rounded-xl'
        >
          <div className='text-xl font-semibold leading-tight text-gray-800'>{a.title}</div>
          <div className='text-center text-gray-600'>{a.description}</div>
        </motion.div>
      ))}
    </section>
  );
}
