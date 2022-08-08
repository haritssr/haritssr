import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface Notice {
  forename: string;
  date_of_birth: string;
  entity_id: string;
  nationalities: string[];
  name: string;
  _links: Links;
}

export interface Links {
  self: Images;
  images: Images;
  thumbnail: Images;
}

export interface Images {
  href: string;
}

function useDebounce(value: string | null, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchInterpol() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setNotices([]);

      const data =
        await fetch(`https://ws-public.interpol.int/notices/v1/red?forename=${debouncedSearch}&resultPerPage=200
        `).then(r => r.json());

      setNotices(data._embedded.notices);
      setLoading(false);
    }
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <LayoutToExperiments domain='React' title='Search Interpol'>
      <SubTitle>
        By <ExternalLink href='https://www.youtube.com/watch?v=PySFIsgXNZ0' name='TomDoesTech' />.
        Data from
        <ExternalLink
          href='https://ws-public.interpol.int/notices/v1/red'
          name='ws-public interpol'
        />
        .
      </SubTitle>
      <input
        type='search'
        className='rounded border px-2 py-1 hover:border-zinc-700 focus:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-200'
        placeholder='search'
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      <div className='mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4'>
        {notices.map(notice => (
          <div key={notice.entity_id}>
            {notice._links.thumbnail?.href && (
              <div>
                <Image
                  src={notice._links.thumbnail.href}
                  width='100px'
                  height='100px'
                  alt={notice.name}
                />
                <div>{notice.forename}</div>
                <div>{notice.date_of_birth}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </LayoutToExperiments>
  );
}
