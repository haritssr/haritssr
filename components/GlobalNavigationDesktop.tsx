import { useRouter } from 'next/router';
import Link from 'next/link';

const GlobalNavigationDesktopLink = ({ href, title }: { href: string; title: string }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${
          // It used to be like this
          // router.asPath.substring(0, href.length) are /experiments or /blog ,etc

          // Now it become like this
          // router.asPath.substring(0, title.length + 1) are /experiments and /blog, only
          // `/${title.toLowerCase()}` are /experiments and /blog, only
          router.asPath.substring(0, title.length + 1) === `/${title.toLowerCase()}`
            ? 'text-white'
            : 'text-zinc-400 hover:text-zinc-300'
        } text-tiny `}
      >
        {title}
      </a>
    </Link>
  );
};

export default function GlobalNavigationDesktop() {
  return (
    <div className='hidden sm:w-3/5 md:block'>
      <div className='flex justify-center'>
        <div className='flex  flex-row items-center  space-x-5   sm:space-x-10'>
          <GlobalNavigationDesktopLink href='/#Contacts' title='Contacts' />
          <GlobalNavigationDesktopLink href='/#Projects' title='Projects' />
          <GlobalNavigationDesktopLink href='/#Experiments' title='Experiments' />
          <GlobalNavigationDesktopLink href='/#TechStack' title='Tech Stack' />
          <GlobalNavigationDesktopLink href='/#Blog' title='Blog' />
        </div>
      </div>
    </div>
  );
}
