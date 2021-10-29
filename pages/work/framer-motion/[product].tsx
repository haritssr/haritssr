import { Title, TitleBack } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Product() {
  const {
    query: { product },
  } = useRouter();
  return (
    <Layout browserTitle={product} description={product}>
      <TitleBack href='Framer Motion' name={product} />
      <div className='flex gap-5'>
        <motion.div layoutId={`${product}`} className=' drop-shadow-md'>
          <Image
            className='object-cover rounded-xl'
            src={'/' + product + '.jpg'}
            height={300}
            width={300}
            alt='image'
            priority
          />
        </motion.div>
      </div>
    </Layout>
  );
}
