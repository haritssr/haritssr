import { Topic } from './DesignSystem';

export default function WorkWrapper({ children, topic }) {
  const section = 'flex flex-col space-y-1 justify-center sm:justify-left -mt-1';
  return (
    <div>
      <Topic name={topic} />
      <div className={section}>{children}</div>
    </div>
  );
}
