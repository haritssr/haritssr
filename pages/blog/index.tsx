import { SubTitle } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

export default function Blog() {
  return (
    <Layout browserTitle='Blog' description='Blog'>
      <h2 id='work' className='z-40 flex h-auto items-center  space-x-4 pt-16 pb-3'>
        <div className='text-3xl font-extrabold text-gray-800 sm:text-4xl'>Blog</div>
        <svg
          width='30'
          height='30'
          viewBox='0 0 300 300'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='150' cy='150' r='150' fill='#93C5FD' />
          <circle cx='150' cy='150' r='100' fill='#3B82F6' />
          <circle cx='150' cy='150' r='50' fill='#1D4ED8' />
          <g filter='url(#filter0_d_994_83)'>
            <path
              d='M186.899 72.732L227.268 113.101L186.899 72.732ZM204.024 55.607C209.377 50.2537 216.638 47.2462 224.208 47.2462C231.779 47.2462 239.04 50.2537 244.393 55.607C249.746 60.9603 252.754 68.2209 252.754 75.7916C252.754 83.3624 249.746 90.623 244.393 95.9763L87.2083 253.161H47.25V212.381L204.024 55.607V55.607Z'
              stroke='white'
              strokeWidth='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <filter
              id='filter0_d_994_83'
              x='3'
              y='0'
              width='314'
              height='314'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dx='10' dy='7' />
              <feGaussianBlur stdDeviation='10' />
              <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
              <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_994_83' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_994_83'
                result='shape'
              />
            </filter>
          </defs>
        </svg>
      </h2>
      <SubTitle>All Blog</SubTitle>
      <section>
        <div className='font-mw text-lg'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit a perspiciatis provident,
          fugiat omnis nesciunt reprehenderit amet? Dolores consectetur quae illum itaque, quaerat
          quod ullam pariatur non, maxime, recusandae sed ab impedit aperiam fuga perspiciatis
          architecto expedita quo perferendis suscipit eligendi quisquam veritatis nesciunt. Labore
          consectetur totam earum optio laudantium enim, molestiae blanditiis saepe et, ex dolorum
          nesciunt, iure suscipit. Sequi repellat neque obcaecati voluptatem consequuntur corrupti
          quae corporis veniam perspiciatis, quo nulla aut possimus ipsam ut. Minima assumenda
          quisquam explicabo autem dolor nisi architecto ad repudiandae magnam quae mollitia sequi,
          delectus reiciendis numquam quod libero at iure ipsam! Voluptate labore dolor fuga
          reiciendis perferendis praesentium in quidem asperiores nobis libero atque, commodi ut
          obcaecati placeat quaerat amet fugit expedita accusantium ad illo rem consequatur. Ipsum
          ab atque, necessitatibus reiciendis molestias repudiandae doloribus laboriosam maxime
          accusantium delectus quasi, libero quia temporibus incidunt magnam. Rerum tenetur
          excepturi nisi nesciunt eveniet necessitatibus minus vel, temporibus aspernatur id nemo
          nostrum, consequuntur neque sapiente autem! Iure voluptatibus, soluta suscipit enim
          nesciunt, esse voluptates neque, vero deserunt incidunt fuga alias autem nisi sit corrupti
          hic exercitationem ipsum? Necessitatibus fuga debitis nobis esse illum, fugit tempore
          numquam amet assumenda ullam, commodi molestiae nihil, unde quidem recusandae repudiandae
          modi! Incidunt debitis odio distinctio veniam, rerum odit illum ad labore iure numquam sed
          voluptatum corrupti laborum, saepe nemo mollitia fugit similique ratione nam, consequatur
          nihil vel. Est possimus fugiat obcaecati quis cumque, magnam quae quisquam nulla dolores
          placeat, saepe enim id explicabo nesciunt itaque fuga inventore quo. Minus repudiandae ex
          eius officiis sapiente, autem saepe fuga blanditiis! Fuga officiis ipsam commodi eius
          culpa, consequuntur nisi enim velit sequi accusamus, quas possimus eaque ipsum quia
          aliquam dolor architecto aut ratione nemo aliquid temporibus laudantium accusantium quod?
          Amet omnis cumque fugiat incidunt aliquid minima alias nemo consectetur maiores numquam
          facere quasi, quae, harum voluptas iste id. Consectetur officia, eaque similique molestiae
          magnam expedita facilis nobis, ipsa corrupti odio cumque fugiat quas? Amet quidem, labore
          sed perspiciatis, dolorum voluptas maiores asperiores, rem facilis non qui exercitationem
          excepturi eius laudantium consequatur illo nam eligendi. Dolore nam ducimus veniam dolor
          commodi asperiores obcaecati nostrum eveniet dolorum aspernatur vel, voluptatum, maxime
          quia nihil maiores corrupti odit perspiciatis ex nemo rerum! Repudiandae quod a, harum
          odit, autem numquam illo accusamus omnis officia maiores labore delectus distinctio ex
          quam quae odio saepe consequatur perferendis obcaecati sint vel sunt laboriosam? Beatae,
          possimus consequatur repellat vitae itaque quidem.
        </div>
      </section>
    </Layout>
  );
}
