import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Image from 'next/image';

export default function Newspaper() {
  return (
    <LayoutToExperiments domain='Tailwindcss' title='Newspaper'>
      <SubTitle>
        Responsive newspaper reading experience with Tailwind CSS columns.{' '}
        <ExternalLink name='Source' href='https://tailwindcss.com/docs/columns' />
      </SubTitle>
      <div className='my-10 border border-zinc-400 p-5 tracking-wide '>
        <h1 className='my-2 text-4xl font-bold text-zinc-800'>Amazing Title</h1>
        <h2 className='font-mw mb-5 text-lg italic text-zinc-600'>This is beautiful subtitle</h2>

        <p className='columns-1 text-zinc-700 sm:columns-2 lg:columns-3'>
          <div className='float-none p-2'>
            <Image className='rounded shadow-md' alt='' src='/me.jpg' height={200} width={200} />
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dolore ab nisi ut
          praesentium blanditiis quasi facilis accusamus repellat cum est tempore assumenda deleniti
          doloribus at aliquid. Quas culpa iusto ducimus corporis, doloremque iste odio neque nisi
          amet eos ea dolore tempore eaque maiores obcaecati veniam incidunt sequi quisquam
          assumenda! Nihil voluptate consectetur vero blanditiis tenetur minima exercitationem omnis
          magni. Hic libero ratione error et explicabo quaerat. Nisi ducimus nobis esse sunt,
          debitis dolore repellat tenetur reprehenderit, odit ipsam libero exercitationem doloribus
          facere doloremque itaque cumque impedit, distinctio porro nemo quos. Distinctio eaque eos
          quibusdam totam harum possimus a, voluptate cum facere necessitatibus ab nihil eum sequi,
          rerum voluptatum illum consequatur nesciunt vitae iusto magnam corrupti maxime! Porro iure
          corrupti natus recusandae sapiente, nemo debitis sit, beatae, eaque nihil accusantium
          sequi atque fuga veritatis eos nobis. Officia aut nemo totam reiciendis cumque dicta
          exercitationem inventore, quod fuga error quae eveniet cupiditate libero, provident vitae
          eius. Et assumenda earum quo, animi quaerat enim excepturi, odit reprehenderit, nulla
          quidem illum perspiciatis dolores sequi. Dolor assumenda quos aspernatur quam esse. Cum,
          odio perspiciatis placeat eveniet odit ea enim est. Nihil numquam omnis optio natus error
          sit iure voluptates dolore blanditiis officia, recusandae saepe, necessitatibus veniam
          quo? Eaque omnis quis esse voluptatem doloribus assumenda corrupti voluptatum molestiae
          debitis, ipsum ut totam quia quaerat at deleniti aliquid odio nisi. Doloribus enim amet
          temporibus reprehenderit? Quas ipsum, commodi minima aliquid nam sapiente omnis
          reprehenderit! Adipisci harum quasi officiis. Sit praesentium fugiat magni eaque impedit
          dolorem accusantium ipsam vel, illo amet voluptatibus tempore similique quae fugit minus
          id soluta ullam alias esse consequuntur quaerat nesciunt iste aut est? Soluta ducimus
          corporis amet sint exercitationem optio ipsum a ipsa nulla iste modi hic, natus doloremque
          ex quia? Provident, ipsum expedita. Exercitationem tenetur delectus quos dolorem illum id,
          eum magnam deleniti odit, ab ducimus aperiam aliquid sint totam pariatur optio excepturi
          molestias sed nostrum natus consectetur? Similique voluptas suscipit asperiores sunt
          beatae quo architecto officiis eaque dolor velit, illum odit, ratione sit. Voluptatem
          dolore, labore, laudantium iure laborum illo consectetur quam aut quos corrupti earum
          voluptatum obcaecati in ex adipisci illum ducimus sint sapiente libero itaque est. Quaerat
          delectus sequi enim culpa quisquam sed laboriosam, quo mollitia corporis dolorem tempore
          minus atque sint laudantium necessitatibus debitis animi ab ipsa ipsam repudiandae
          assumenda impedit libero quam? Atque animi cumque quae harum, illum nostrum expedita unde
          ratione perferendis maiores autem vitae. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Blanditiis, suscipit autem. Culpa nisi minus cumque architecto!
          Excepturi quam natus quo eaque blanditiis dolorem ipsum alias, voluptatibus culpa
          explicabo nam sit laboriosam aperiam repellat, incidunt maiores suscipit voluptas quasi
          consectetur mollitia, hic a aspernatur ab. Maiores reiciendis explicabo rem numquam
          nesciunt ad odio nobis ea, quas esse perferendis soluta quo est doloribus vitae quaerat
          iusto perspiciatis. Eaque earum tempora ipsum quo, iusto accusamus molestias, minus rerum
          quia vel ipsa saepe aut eligendi, provident neque doloribus sint quae. Facere nulla eos ab
          reiciendis, officia quia impedit. Voluptates asperiores libero illo porro voluptatem?
        </p>
      </div>
    </LayoutToExperiments>
  );
}
