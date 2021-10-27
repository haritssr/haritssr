import { motion } from 'framer-motion';
export default function Gradient() {
  return (
    <section className='grid grid-cols-3 gap-5 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9'>
      {gradientData.map(a => (
        <motion.div
          key={a.id}
          className={`w-24 h-24 rounded-lg bg-gradient-to-b shadow-lg ${a.gradient}`}
          whileTap={{ scale: 0.6 }}
          whileHover={{ rotate: 180 }}
          dragConstraints={{
            right: 10,
            left: 10,
            top: 10,
            bottom: 10,
          }}
          drag
        ></motion.div>
      ))}
      {gradientData.map(a => (
        <motion.div
          key={a.id}
          className={`w-24 h-24 rounded-lg bg-gradient-to-b shadow-lg ${a.gradient}`}
          whileTap={{ scale: 0.6 }}
          whileHover={{ rotate: 180 }}
          dragConstraints={{
            right: 10,
            left: 10,
            top: 10,
            bottom: 10,
          }}
          drag
        ></motion.div>
      ))}
      {gradientData.map(a => (
        <motion.div
          key={a.id}
          className={`w-auto h-auto rounded-lg bg-gradient-to-b shadow-lg ${a.gradient}`}
          whileTap={{ scale: 0.6 }}
          whileHover={{ rotate: 180 }}
          dragConstraints={{
            right: 10,
            left: 10,
            top: 10,
            bottom: 10,
          }}
          drag
        ></motion.div>
      ))}
    </section>
  );
}

const gradientData = [
  { id: '1', gradient: 'from-red-400 to-red-500' },
  { id: '2', gradient: 'from-orange-400 to-orange-500' },
  { id: '3', gradient: 'from-amber-400 to-amber-500' },
  { id: '4', gradient: 'from-yellow-400 to-yellow-500' },
  { id: '5', gradient: 'from-lime-400 to-lime-500' },
  { id: '6', gradient: 'from-green-400 to-green-500' },
  { id: '7', gradient: 'from-emerald-400 to-emerald-500' },
  { id: '8', gradient: 'from-teal-400 to-teal-500' },
  { id: '9', gradient: 'from-cyan-400 to-cyan-500' },
  { id: '10', gradient: 'from-sky-400 to-sky-500' },
  { id: '11', gradient: 'from-blue-400 to-blue-500' },
  { id: '12', gradient: 'from-indigo-400 to-indigo-500' },
  { id: '13', gradient: 'from-violet-400 to-violet-500' },
  { id: '14', gradient: 'from-purple-400 to-purple-500' },
  { id: '15', gradient: 'from-fuschsia-400 to-fuschsia-500' },
  { id: '16', gradient: 'from-pink-400 to-pink-500' },
  { id: '17', gradient: 'from-rose-400 to-rose-500' },
];
