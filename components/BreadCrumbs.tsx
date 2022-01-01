import Breadcrumbs from 'nextjs-breadcrumbs';

export default function BreadCrumbs() {
  return (
    <Breadcrumbs
      rootLabel='home'
      containerClassName='max-w-5xl mx-auto mt-5 bg-[#E5E5EA] rounded-lg px-4 py-2'
      listClassName='flex flex-wrap text-center lg:px-0 max-w-5xl '
      transformLabel={title => '/' + title + ' '}
      replaceCharacterList={[{ from: '_', to: ' ' }]}
      activeItemClassName='text-blue-600'
      inactiveItemClassName='text-gray-500 hover:underline'
    />
  );
}
