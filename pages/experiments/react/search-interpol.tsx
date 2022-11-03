import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Image from 'next/image';
import { useEffect, useState } from 'react';

//type generate automatically via app.quicktype.io
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

// generate new input value after certain delayed time (in ms) using useEffect
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
        await fetch(`https://ws-public.interpol.int/notices/v1/red?forename=${debouncedSearch}&resultPerPage=50
        `).then(r => r.json());

      setNotices(data._embedded.notices);
      setLoading(false);
    }
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <LayoutToExperiments domain='React' title='Search Interpol'>
      <SubTitle>
        <ExplanationList>
          <li>
            Inspired by{' '}
            <ExternalLink href='https://www.youtube.com/watch?v=PySFIsgXNZ0' name='TomDoesTech' />
          </li>
          <li>
            Data source{' '}
            <ExternalLink
              href='https://ws-public.interpol.int/notices/v1/red'
              name='ws-public interpol'
            />
          </li>
          <li>Already applied debounce on search</li>
          <li>Search by name with the result of prisoners from interpol public API</li>
        </ExplanationList>
      </SubTitle>

      <input
        type='search'
        className='cursor-text rounded border px-2 py-1 hover:border-zinc-700 focus:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-200'
        placeholder='search'
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <div>Loading...</div>}
      <div className='mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4'>
        {notices.map(notice => (
          <div key={notice.entity_id}>
            {/* Conditionally show image if the 'notices' have a href (src attribute of img) */}
            {notice._links.thumbnail?.href && (
              <div>
                <Image
                  src={notice._links.thumbnail.href}
                  width='100'
                  height='100'
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
