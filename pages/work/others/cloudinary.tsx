import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { SubTitle, Topic } from '@/components/DesignSystem';
// import Image from 'next/image';
// import { mapImageResources, search, getFolders } from '../../../lib/cloudinary';
// import { useEffect, useState } from 'react';

export default function CloudinaryR() {
  return (
    <LayoutSubWorkToTopic title='Cloudinary' href='/work/others' hrefName='Others'>
      <SubTitle>by Colby Fayock</SubTitle>
    </LayoutSubWorkToTopic>
  );
}

// export default function CloudinaryR({
//   images: defaultImages,
//   nextCursor: defaultNextCursor,
//   folders,
// }) {
//   const [images, setImages] = useState(defaultImages);
//   const [nextCursor, setNextCursor] = useState(defaultNextCursor);
//   const [activeFolder, setActiveFolder] = useState('');

//   console.log('activeFolder', activeFolder);

//   async function handleLoadMore(event) {
//     event.preventDefault();

//     const results = await fetch('/api/search', {
//       method: 'POST',
//       body: JSON.stringify({
//         nextCursor,
//         expression: `folder="${activeFolder}"`,
//       }),
//     }).then(r => r.json());

//     console.log('results <- handleLoadMore', results);

//     const { resources, next_cursor: upadatedNextCursor } = results;

//     const images = mapImageResources(resources);

//     setImages(prev => {
//       return [...prev, ...images];
//     });

//     setNextCursor(upadatedNextCursor);
//   }

//   function handleOnFolderClick(event) {
//     const folderPath = event.target.dataset.folderPath;
//     setActiveFolder(folderPath);
//     setNextCursor(undefined);
//     setImages([]);
//   }

//   useEffect(() => {
//     (async function run() {
//       const results = await fetch('/api/search', {
//         method: 'POST',
//         body: JSON.stringify({
//           nextCursor,
//           expression: `folder="${activeFolder}"`,
//         }),
//       }).then(r => r.json());

//       console.log('results <- handleLoadMore', results);

//       const { resources, next_cursor: upadatedNextCursor } = results;

//       const images = mapImageResources(resources);

//       setImages(prev => {
//         return [...prev, ...images];
//       });
//     })();
//   }, [activeFolder]);

//   return (
//     <LayoutSubWorkToTopic title='Cloudinary' href='/work/others' hrefName='Others'>
//       <SubTitle>by Colby Fayock</SubTitle>

//       <Topic name='Pertama' />
//       <ul className='grid grid-cols-1 gap-10 sm:grid-cols-3'>
//         {images.map(image => {
//           return (
//             <li key={image.id}>
//               <a href={image.link} rel='norefferer' className='overflow-hidden'>
//                 <div>
//                   <Image
//                     src={image.image}
//                     blurDataURL={image.image}
//                     width={image.width}
//                     height={image.height}
//                     className='rounded-md '
//                     placeholder='blur'
//                     quality={75}
//                     priority
//                     alt={''}
//                   />
//                 </div>
//                 <h3 className='truncate'>{image.title}</h3>
//               </a>
//             </li>
//           );
//         })}
//       </ul>

//       <Topic name='Kedua' />
//       <ul className='grid grid-cols-1 gap-10 sm:grid-cols-3' onClick={handleOnFolderClick}>
//         {folders.map(folder => {
//           return (
//             <li key={folder.path}>
//               <button data-folder-path={folder.path}>{folder.name}</button>
//             </li>
//           );
//         })}
//       </ul>

//       <div className='py-20' />
//       <button
//         onClick={handleLoadMore}
//         className='block px-4 py-2 mx-auto text-white bg-blue-700 rounded-md hover:bg-blue-800'
//       >
//         Load more images
//       </button>
//     </LayoutSubWorkToTopic>
//   );
// }

// export async function getStaticProps() {
//   const results = await search({
//     expression: 'folder==""',
//   });
//   const { resources, next_cursor: nextCursor } = results;
//   const images = mapImageResources(resources);

//   const { folders } = await getFolders();

//   console.log('folders', folders);
//   return {
//     props: {
//       images,
//       nextCursor: nextCursor || false,
//       folders,
//     },
//   };
// }

//BUG
//after several click on "Load more images", the images shown are same so it's cause some react 'map key' problem
