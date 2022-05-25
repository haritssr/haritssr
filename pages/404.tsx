import { BigInternalLink } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

export default function NotFoundPage() {
  return (
    <Layout browserTitle='404' description='Kasian nyasar'>
      <div className='flex h-screen flex-col items-center justify-center space-y-5'>
        <div className='text-center text-2xl font-medium text-zinc-700 sm:w-2/3'>
          The page you&apos;re looking for can&apos;t be found.
        </div>
        <BigInternalLink href='/' name='Back to home' />
      </div>
    </Layout>
  );
}
