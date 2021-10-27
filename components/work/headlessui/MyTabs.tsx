import { Tab } from '@headlessui/react';
import { Topic } from '@/components/DesignSystem';

//Tabs
export default function MyTabs() {
  return (
    <>
      <Topic name='Tabs' />
      <Tab.Group as='div'>
        <Tab.List className='grid grid-cols-3 gap-1 px-2 pt-2 -mb-px text-base text-gray-600 bg-gray-300 rounded-t-md sm:text-tiny'>
          <Tab
            className={({ selected }) =>
              selected
                ? 'bg-[#F5F5F7] rounded-t-md p-1 '
                : 'p-1 sm:p-0.5  rounded-t-md hover:bg-gray-200'
            }
          >
            Armagedon
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'bg-[#F5F5F7] rounded-t-md p-1 '
                : 'p-1 sm:p-0.5  rounded-t-md hover:bg-gray-200'
            }
          >
            Utopia
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'bg-[#F5F5F7] rounded-t-md p-1 '
                : 'p-1 sm:p-0.5  rounded-t-md hover:bg-gray-200'
            }
          >
            Heaven
          </Tab>
        </Tab.List>

        <Tab.Panels className='p-4  border border-gray-300 bg-[#F5F5F7] rounded-b-md rounded-tr-md'>
          <Tab.Panel className='h-auto text-gray-700'>
            <Topic name='Armagedon' />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, ipsam fugiat?
              Doloremque impedit saepe accusamus mollitia laborum, consequuntur sunt, vel ratione
              nemo error atque beatae accusantium eius in ipsa eum consectetur. Magnam ratione
              aspernatur consequuntur nemo possimus corporis, excepturi dolorem ipsam et aliquid,
              esse tempora tempore inventore at soluta saepe optio sequi perspiciatis maxime
              assumenda culpa reprehenderit. Magni tempore perspiciatis quisquam vel a minima porro
              ducimus excepturi vitae quas nisi veniam aspernatur hic, iure placeat ullam numquam
              natus magnam saepe, reprehenderit voluptatem labore repudiandae. Consequuntur
              distinctio architecto in, voluptate culpa dolore similique. Itaque, autem. Nostrum rem
              ducimus exercitationem commodi tenetur!
            </p>
          </Tab.Panel>
          <Tab.Panel className='h-auto text-gray-700'>
            <Topic name='Utopia' />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, nisi consequatur?
              Nisi repudiandae blanditiis dignissimos autem quis. Enim, aspernatur accusantium
              incidunt aut, rem repellat illum illo quam sit vero fugit asperiores, blanditiis dolor
              numquam distinctio earum deleniti? Quibusdam ad, voluptatibus ducimus cum fugit earum
              mollitia molestias, nesciunt, quod vel aspernatur magnam quam! Quae fuga omnis rem
              facilis quidem suscipit eius, accusantium mollitia inventore laborum, dolores sit aut
              veritatis aliquid, perspiciatis ad? Et accusamus quam harum pariatur quo
              reprehenderit, sint molestiae, debitis voluptatem doloremque cupiditate culpa neque
              vitae similique. Voluptates quaerat magni dolores deleniti quibusdam officiis,
              perferendis ullam laborum pariatur neque!
            </p>
          </Tab.Panel>
          <Tab.Panel className='h-auto text-gray-700'>
            <Topic name='Heaven' />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed hic, reiciendis non
              tenetur officia placeat eligendi natus suscipit dolor perferendis earum atque illum
              impedit ratione ut quia nobis? Dolorem dolorum, earum explicabo doloribus natus
              possimus a quis cupiditate, placeat minima iure! In tempore soluta culpa accusantium.
              Sint, iure omnis voluptates aut unde eveniet dolor vero voluptate nisi ipsum maiores
              tenetur enim ea error? Unde quisquam delectus blanditiis commodi voluptatum? Possimus
              ex debitis excepturi, dolor neque vitae numquam mollitia, nesciunt voluptate fugit
              esse rerum id. Enim labore asperiores architecto ratione! Suscipit incidunt debitis
              iusto placeat tempora ipsa fugit qui neque dicta.
            </p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
