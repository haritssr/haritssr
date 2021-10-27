import Layout from '@/components/Layout';
import { Title, TitleBack } from '@/components/DesignSystem';

export default function DateUtilities() {
  let date = new Date();
  const dateString = date.toString();

  console.log(date);
  return (
    <Layout browserTitle='Date' description='Gradient'>
      <TitleBack back="work" name='Date' />
      <div>
        <span className='font-semibold'>{dateString}</span> adalah tanggal dan waktu sekarang.
      </div>
    </Layout>
  );
}
