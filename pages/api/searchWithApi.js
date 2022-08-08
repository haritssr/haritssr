import { Users } from '../../data/searchWithApi';

export default function handler(req, res) {
  const { q } = req.query;
  console.log(q);

  const data = Users.filter(item =>
    ['firstName', 'lastName', 'maidenName'].some(key => item[key].toLowerCase().includes(q))
  );
  res.status(200).json(data.slice(0, 10));
}
