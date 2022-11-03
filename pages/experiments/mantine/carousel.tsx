import { Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';

import LayoutToExperiments from '@/components/LayoutToExperiments';
export default function ExportedCarousel() {
  return (
    <LayoutToExperiments title='Carousel' domain='Mantine'>
      <SubTitle>
        Carousel from <ExternalLink href='https://mantine.dev/others/carousel/' name='Mantine' />
      </SubTitle>
      <Carousel orientation='vertical' className='mx-auto max-w-sm' withIndicators height={200}>
        {['1', '2', '3'].map(item => (
          <Carousel.Slide
            key={item}
            className='flex h-20 w-20 items-center justify-center bg-blue-500 text-white'
          >
            {item}
          </Carousel.Slide>
        ))}
      </Carousel>
      <Demo />
    </LayoutToExperiments>
  );
}

const images = [
  'https://placekitten.com/g/200/300',
  'https://placekitten.com/g/250/300',
  'https://placekitten.com/g/300/300',
];

function Demo() {
  const slides = images.map(url => (
    <Carousel.Slide className='overflow-hidden' key={url}>
      <Image src={url} alt='yes' />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      styles={{
        control: {
          '&[data-inactive]': {
            opacity: 0,
            cursor: 'default',
          },
        },
      }}
      sx={{ maxWidth: 320 }}
      mx='auto'
      withIndicators
    >
      {slides}
    </Carousel>
  );
}
