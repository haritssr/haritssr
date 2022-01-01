//NOTES
//- This file is part of /work/others/cloudinary.tsx
//- mapImageResouces is shown failing "TypeError: Cannot read property 'map' of undefined"


// export async function search(options = {}) {
//   const params = {
//     ...options,
//   };

//   if (params.nextCursor) {
//     params.next_cursor = params.nextCursor;
//     delete params.nextCursor;
//   }

//   const paramString = Object.keys(params)
//     .map(key => `${key}=${encodeURIComponent(params[key])}`)
//     .join('&');

//   const results = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
//         ).toString('base64')}`,
//       },
//     }
//   ).then(r => r.json());

//   return results;
// }

// export async function getFolders(options = {}) {
//   const results = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders`,
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
//         ).toString('base64')}`,
//       },
//     }
//   ).then(r => r.json());

//   return results;
// }

// export function mapImageResources(resources) {
//   return resources.map(r => {
//     const { width, height } = r;
//     return {
//       id: r.asset_id,
//       title: r.public_id,
//       image: r.secure_url,
//       width,
//       height,
//     };
//   });
// }
