import { SubTitle, SubTopic, Topic } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import AppleNavbar from '@/components/tailwindcss/AppleNavbar';
import Blurry from '@/components/tailwindcss/Blurry';
import DarkMode from '@/components/tailwindcss/DarkMode';
import FloatingLabels from '@/components/tailwindcss/FloatingLabels';
import GlowingBackground from '@/components/tailwindcss/GlowingBackground';
import Grid from '@/components/tailwindcss/Grid';
import PlanetScaleNavBar from '@/components/tailwindcss/PlanetScaleNavbar';
import SideBar from '@/components/tailwindcss/SideBar';
import YoutubeThumbnail from '@/components/tailwindcss/YoutubeThumbnail';

export default function Tailwindcss() {
  return (
    <LayoutSubWorkToTopic title='Tailwind CSS' href='/#work' hrefName='My Work'>
      <SubTitle>My implementation of TailwindCSS</SubTitle>
      <div className='my-32' />
      <div className='space-y-40'>
        <AppleNavbar />
        <Blurry />
        <DarkMode />
        <FloatingLabels />
        <GlowingBackground />
        <Grid />
        <PlanetScaleNavBar />
        <SideBar />
        <YoutubeThumbnail />
      </div>
    </LayoutSubWorkToTopic>
  );
}
