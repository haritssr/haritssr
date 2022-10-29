type fisikaType =  Array<{domain_name: string, chapters: Array<{chapter_name:string, topics: Array<string>} | undefined>}> 

export const fisika: fisikaType = [
  {
    domain_name: 'Termodinamika',
    chapters: [
      {
        chapter_name: 'Suhu',
        topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      },
      {
        chapter_name: 'Kalor',
        topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      },
      {
        chapter_name: 'Pemuaian',
        topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      },
      {
        chapter_name: 'Radiasi Benda Hitam',
        topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      },
      ,
    ],
  },
  {
    domain_name: 'Fluida',
    chapters: [
      {
        chapter_name: 'Fluida Statis',
        topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      },
      {
        chapter_name: 'Fluida Dinamis',
        topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      },
      ,
    ],
  },
];
