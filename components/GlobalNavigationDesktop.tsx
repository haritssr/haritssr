import { useRouter } from 'next/router';
import Link from 'next/link';

const GlobalNavigationDesktopLink = ({ href, title }: { href: string; title: string }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${
          // router.asPath.substring(0, href.length) are /experiments or /blog ,etc
          router.asPath.substring(0, href.length) === href
            ? 'text-white'
            : 'text-zinc-400 hover:text-zinc-300'
        } rounded-md py-0.5 text-tiny`}
      >
        {title}
      </a>
    </Link>
  );
};

export default function GlobalNavigationDesktop() {
  return (
    <div className='hidden sm:block'>
      <div className='flex  flex-row items-center  space-x-5   sm:space-x-10'>
        <GlobalNavigationDesktopLink href='/' title='Contacts' />
        <GlobalNavigationDesktopLink href='/#Projects' title='Projects' />
        <GlobalNavigationDesktopLink href='/#Experiments' title='Experiments' />
        <GlobalNavigationDesktopLink href='/#TechStack' title='Tech Stack' />
        <GlobalNavigationDesktopLink href='/#Blog' title='Blog' />
      </div>
    </div>
  );
}
