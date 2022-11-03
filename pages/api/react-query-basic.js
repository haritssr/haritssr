export default function handler(req, res) {
  res
    .status(200)
    .json(
      res.status(200).json([{ id: '1', name: 'Harits Syah', age: '22', city: 'Boston, New York' }])
    );
}
