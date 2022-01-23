import { SubTitle, Topic } from '@/components/DesignSystem';
import { useRouter } from 'next/router';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function Router() {
  const router = useRouter();
  const style = 'text-gray-500';
  return (
    <LayoutSubWorkToTopic title='Router' href='/work/nextjs' hrefName='Next.js'>
      <SubTitle>My implementation of Next.js Router </SubTitle>
      <div className='mb-10'>
        <Topic name='router object' />
        <div>
          asPath = <span className={style}>{router.asPath}</span> (Route saat ini)
        </div>
        <div>
          pathname <span className={style}>{router.pathname}</span>
        </div>
        <div>
          isFallback = <span className={style}>{router.isFallback}</span>
        </div>
        <div>
          basePath = <span className={style}>{router.basePath}</span>
        </div>
        <div>
          locale = <span className={style}>{router.locale}</span>
        </div>
        <div>
          locales = <span className={style}>{router.locales}</span>
        </div>
        <div>
          isReady = <span className={style}>{router.isReady.toString()}</span>
        </div>
        <div>
          isPreview = <span className={style}>{router.isPreview.toString()}</span>
        </div>
      </div>

      <Topic name='router.push' />
      <p>This button using router.push instead using Link from next/link</p>
      <button
        className='px-4 py-2 mt-2 text-white bg-blue-600 rounded-md bg-opacity-90 hover:bg-opacity-100'
        onClick={() => router.push('/work')}
      >
        Go to My Work
      </button>
    </LayoutSubWorkToTopic>
  );
}
