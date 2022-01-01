import { TopicWork } from './DesignSystem';

export default function WorkWrapper({ children, topic, href }) {
  const section = 'flex flex-col space-y-1 justify-center sm:justify-left -mt-1';
  return (
    <div>
      <TopicWork name={topic} href={href} />
      <div className={section}>{children}</div>
    </div>
  );
}
