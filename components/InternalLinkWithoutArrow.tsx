import Link from 'next/link';

export default function InternalLinkWithoutArrow({
  name,
  href,
  block,
}: {
  name: string;
  href: string;
  block?: boolean;
}) {
  return (
    (<Link
      href={href}
      className={`cursor-pointer text-blue-600 hover:underline ${block ? 'block' : 'inline'}`}>

      {name}

    </Link>)
  );
}
