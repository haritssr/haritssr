import Layout from '@/components/Layout';
import Hello from '@/components/homepage/Hello';
import Works from '@/components/homepage/Works';
import Blog from '@/components/homepage/Blog';
import Tentang from '@/components/homepage/Tentang';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout
      browserTitle={`${
        router.asPath === '/#work' ? 'Works' : router.asPath === '/#about' ? 'About' : 'Blog'
      }`}
      description='Home'
    >
      <Hello />
      <Works />
      <Tentang />
      <Blog />
    </Layout>
  );
}
