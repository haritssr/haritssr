import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MyShop() {
  return (
    <div className='flex gap-5'>
      {['shoe', 'watch', 'headphones'].map(product => (
        <motion.div
          layoutId={product}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className=' drop-shadow-md hover:drop-shadow-xl'
          key={product}
        >
          <Link href={`/showcase/framer-motion/${product}`} passHref={true}>
            <a>
              <Image
                className='object-cover rounded-xl'
                src={'/' + product + '.jpg'}
                height={300}
                width={300}
                alt={product}
                priority
              />
            </a>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
