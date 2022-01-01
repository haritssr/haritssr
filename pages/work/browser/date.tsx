import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { useEffect, useState } from 'react';

export default function DateUtilities() {
  let dateString;
  const [date, setDate] = useState(dateString);
  useEffect(() => {
    setTimeout(() => {
      setDate(new Date().toString());
    }, 1000);
  }, [date]);
  return (
    <LayoutSubWorkToTopic title='Date' href='/work/browser' hrefName='Browser API'>
      <div>
        <span className='font-semibold'>{dateString}</span> adalah tanggal dan waktu sekarang.
      </div>
    </LayoutSubWorkToTopic>
  );
}
