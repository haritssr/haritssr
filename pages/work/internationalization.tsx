import Layout from '@/components/Layout';
import { TitleBack, Topic } from '@/components/DesignSystem';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ActiveLink from '@/components/activelink';

export default function Interntionalization() {
  const router = useRouter();

  return (
    <Layout browserTitle='Internationalization' description='Internationalization'>
      <TitleBack name='Internationalization' back='work' />
      <div className='mb-10'>
        <Topic name='router object' />
        <div>Route saat ini : {router.asPath}</div>
        <div>asPath : {router.asPath}</div>
        <div>pathname {router.pathname}</div>
        {/* <div>query :  {router.query}</div> */}
        <div>isFallback : {router.isFallback}</div>
        <div>basePath : {router.basePath}</div>
        <div>locale : {router.locale}</div>
        <div>locales : {router.locales}</div>
        <div>isReady : {router.isReady.toString()}</div>
        <div>isPreview : {router.isPreview.toString()}</div>
      </div>

      <Topic name='router.push' />
      <p>This button using router.push instead using Link from next/link</p>
      <button
        className='px-4 py-2 mt-2 text-white bg-blue-600 rounded-md bg-opacity-90 hover:bg-opacity-100'
        onClick={() => router.push('/showcase')}
      >
        Go to Showcase
      </button>
    </Layout>
  );
}
