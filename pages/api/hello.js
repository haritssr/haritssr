// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

//this api used in /pages/experiments/nextjs/swr

export default function handler(_req, res) {
  res.status(200).json([
    {
      id: "1",
      name: "Harits Syah",
      age: "22",
      city: "San Francisco, California",
    },
    {
      id: "2",
      name: "Guillermo Rauch",
      age: "32",
      city: "San Francisco, California",
    },
    { id: "3", name: "Lee Robinson", age: "28", city: "Austin, Texas" },
  ]);
}
