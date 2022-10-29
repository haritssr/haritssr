import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import Image from 'next/future/image';

export default function Position() {
  return (
    <LayoutToExperiments title='Position' domain='Tailwind CSS'>
      <SubTitle>CSS position with Tailwind CSS</SubTitle>
      <div className='space-y-10'>
        <Wrapper title='relative + absolute'>
          <div className='relative h-40 bg-blue-500'>
            <div className='absolute bottom-0 left-0 bg-purple-500'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto exercitationem
              distinctio dicta non enim natus, dolore sunt error sit nam!
            </div>
          </div>
        </Wrapper>
        <Wrapper title='static + absolute'>
          <div className='static h-40 bg-blue-500'>
            <div className='absolute bottom-0 mx-auto max-w-4xl bg-purple-500'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto exercitationem
              distinctio dicta non enim natus, dolore sunt error sit nam!
            </div>
          </div>
        </Wrapper>
        <Wrapper title='static + absolute'>
          <div className='relative h-40 bg-blue-500'>
            <div className='absolute top-0 right-0 h-1/2 w-1/2 bg-purple-500'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto exercitationem
              distinctio dicta non enim natus, dolore sunt error sit nam!
            </div>
          </div>
        </Wrapper>
        <Wrapper title='sticky'>
          <div className='h-52 overflow-y-auto bg-blue-500'>
            <div className=''>
              <div className='sticky top-0 bg-purple-600 py-1 px-2 text-zinc-300'>A</div>
              <div className='p-2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, illum
                quibusdam. Dicta tenetur, qui, fugiat exercitationem laborum quae itaque asperiores
                optio eveniet id unde? Nobis, hic. Harum qui fugiat quisquam culpa nobis! Veniam,
                omnis? Temporibus, quaerat labore! Voluptates consectetur hic assumenda soluta odit
                et ullam voluptatum iure tempora aperiam? Sit nesciunt architecto accusamus
                quibusdam sequi sapiente necessitatibus dolorum? Sapiente totam tempora alias neque
                praesentium eaque vitae ab a voluptatibus illum blanditiis veniam quas, sed beatae
                inventore expedita corrupti, amet, maxime voluptate odit. Incidunt mollitia autem
                esse expedita sunt vero, voluptate aperiam amet reprehenderit, obcaecati delectus.
                Maxime et quas molestiae sunt.
              </div>
            </div>
            <div className=''>
              <div className='sticky top-0 bg-purple-600 py-1 px-2 text-zinc-300'>B</div>
              <div className='p-2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, illum
                quibusdam. Dicta tenetur, qui, fugiat exercitationem laborum quae itaque asperiores
                optio eveniet id unde? Nobis, hic. Harum qui fugiat quisquam culpa nobis! Veniam,
                omnis? Temporibus, quaerat labore! Voluptates consectetur hic assumenda soluta odit
                et ullam voluptatum iure tempora aperiam? Sit nesciunt architecto accusamus
                quibusdam sequi sapiente necessitatibus dolorum? Sapiente totam tempora alias neque
                praesentium eaque vitae ab a voluptatibus illum blanditiis veniam quas, sed beatae
                inventore expedita corrupti, amet, maxime voluptate odit. Incidunt mollitia autem
                esse expedita sunt vero, voluptate aperiam amet reprehenderit, obcaecati delectus.
                Maxime et quas molestiae sunt.
              </div>
            </div>
          </div>
        </Wrapper>
        <Wrapper title='image on background'>
          <div className='relative h-96 overflow-hidden'>
            <Image src='/images/hero.jpg' width='5760' height='3840' alt='' />

            <div className='absolute inset-0 bg-zinc-800/80 text-zinc-200'>
              <div className='p-5'>
                <h1 className='text-4xl font-semibold'>Title</h1>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quae eum mollitia
                eaque, reprehenderit obcaecati dolore incidunt voluptas unde blanditiis atque
                similique deserunt pariatur non quisquam earum perspiciatis in. Autem nemo
                accusantium nihil. Dicta cumque non error corporis perspiciatis magnam, nisi, quod,
                modi optio incidunt dolore molestias illo eos placeat!
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </LayoutToExperiments>
  );
}

const Wrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div>
      <div className='mb-1 font-medium text-zinc-700'>{title}</div>
      <div>{children}</div>
    </div>
  );
};
