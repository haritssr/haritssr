import { SubTopic, Topic } from '../DesignSystem';
import { onboardedWebsiteData } from '../../lib/work-data';
import TechLink from '../TechLink';

export default function OnboardedWebsite() {
  return (
    <div>
      <Topic name='Onboarded Website' />
      <SubTopic>Websites that I have ever made</SubTopic>
      <div className='grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
        {onboardedWebsiteData.map(d => (
          <TechLink name={d.name} href={d.href} key={d.id}>
            {d.logo}
          </TechLink>
        ))}
      </div>
    </div>
  );
}
