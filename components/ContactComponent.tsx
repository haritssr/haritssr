import Image from 'next/future/image';

export default function ContactComponent({
  href,
  imgSrc,
  name,
  title,
}: {
  href: string;
  imgSrc: string;
  name: string;
  title: string;
}) {
  return (
    <a
      title={title}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='group flex w-auto'
    >
      <section className='flex items-center space-x-3 overflow-hidden sm:space-x-3'>
        <Image src={imgSrc} height={20} width={20} alt={name} />
        <div className=' text-zinc-400 hover:text-zinc-500 hover:underline'>{name}</div>
      </section>
    </a>
  );
}
