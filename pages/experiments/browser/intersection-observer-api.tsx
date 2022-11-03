import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';

import LayoutToExperiments from '@/components/LayoutToExperiments';
import styles from '@/styles/rocket.module.css';

// native version
import { useEffect, useRef, useState } from 'react';
//useinview version
import { useInView } from 'react-intersection-observer';

export default function IntersectionObserverAPI() {
  return (
    // <IntersectionObserverAPINative />
    <IntersectionObserverAPIHooks />
  );
}

function IntersectionObserverAPINative() {
  //   // if useRef() is empty, it will throw an error
  //   const myRef = useRef(null);
  //   const [isMyElementVisible, setIsMyElementVisible] = useState<boolean>();
  //   console.log('isMyElementVisible', isMyElementVisible);
  //   useEffect(() => {
  //     // console.log('myRef', myRef);
  //     const observer = new IntersectionObserver(entries => {
  //       const entry = entries[0];
  //       setIsMyElementVisible(entry.isIntersecting);
  //       //   console.log('entry', entry);
  //     });
  //     // without as unknown as Element, typeError will be type null not assignable to type Element
  //     observer.observe(myRef.current as unknown as Element);
  //   }, []);
  //   return (
  //     <LayoutToExperiments domain='Browser' title='Intersection Observer API'>
  //       <SubTitle>
  //         <ExternalLink
  //           href='https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API'
  //           name='Intersection Observer API'
  //         />
  //         <br />
  //         Inspired by
  //         <ExternalLink href='https://www.youtube.com/watch?v=r1auJEf9ISo' name='Colby Fayock' />
  //       </SubTitle>
  //       <div className='mt-96 rounded-md bg-zinc-100 p-10'>
  //         <h2 ref={myRef} className='mb-2 text-2xl font-semibold'>
  //           {isMyElementVisible ? 'This heading is visible' : 'This heading is not visible'}
  //         </h2>
  //         <p className='text-zinc-600'>
  //           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error voluptas maiores possimus
  //           distinctio. Dolores, veritatis hic magni numquam fugiat totam enim, temporibus, nostrum
  //           est ad accusantium? Saepe ducimus accusamus eaque est obcaecati? Laboriosam, dolor illo.
  //           Maxime id obcaecati omnis laudantium corporis aliquid illum qui quis voluptatum, nihil
  //           vero a culpa maiores at fuga exercitationem rem quo placeat sint nostrum vitae! Nulla
  //           repudiandae, sunt corporis quasi temporibus quibusdam dolorem, minus omnis quod aliquam
  //           eum quis! Temporibus aspernatur, ipsa fugit autem libero magni molestias odio enim
  //           consequuntur! At vel asperiores sit veritatis quia nam nemo nobis dolores, rerum, tenetur
  //           ipsa, autem consequatur?
  //         </p>
  //       </div>
  //     </LayoutToExperiments>
  //   );
}

function IntersectionObserverAPIHooks() {
  const { ref: myRef, inView: isMyElementVisible } = useInView();
  const { ref: rocketRef, inView: isRocketVisible } = useInView();
  useEffect(() => {
    console.log(isRocketVisible);
  }, [isRocketVisible]);
  return (
    <LayoutToExperiments domain='Browser' title='Intersection Observer API'>
      <SubTitle>
        <ExternalLink
          href='https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API'
          name='Intersection Observer API'
        />
        <br />
        Inspired by
        <ExternalLink href='https://www.youtube.com/watch?v=r1auJEf9ISo' name='Colby Fayock' />
        <br />
        Scroll to the bottom to see the effect, the rocket launches.🚀.
      </SubTitle>
      <div className='mt-96 rounded-md bg-zinc-100 p-10'>
        <h2 ref={myRef} className='mb-2 text-2xl font-semibold'>
          {isMyElementVisible ? 'The rocket will launch' : 'The rocket in idle'}
        </h2>
        <p ref={rocketRef}>
          <span className={`${styles.rocket} ${isRocketVisible ? styles.animateRocket : ''}`}>
            🚀
          </span>
        </p>
        <p className='text-zinc-600'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error voluptas maiores possimus
          distinctio. Dolores, veritatis hic magni numquam fugiat totam enim, temporibus, nostrum
          est ad accusantium? Saepe ducimus accusamus eaque est obcaecati? Laboriosam, dolor illo.
          Maxime id obcaecati omnis laudantium corporis aliquid illum qui quis voluptatum, nihil
          vero a culpa maiores at fuga exercitationem rem quo placeat sint nostrum vitae! Nulla
          repudiandae, sunt corporis quasi temporibus quibusdam dolorem, minus omnis quod aliquam
          eum quis! Temporibus aspernatur, ipsa fugit autem libero magni molestias odio enim
          consequuntur! At vel asperiores sit veritatis quia nam nemo nobis dolores, rerum, tenetur
          ipsa, autem consequatur?
        </p>
      </div>
    </LayoutToExperiments>
  );
}
