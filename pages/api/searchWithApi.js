import { Users } from "../../data/searchWithApi";

//this api used in pages\experiments\react\search-table.tsx

export default function handler(req, res) {
  const { q } = req.query;

  const data = Users.filter((item) =>
    ["firstName", "lastName", "maidenName"].some((key) =>
      item[key].toLowerCase().includes(q)
    )
  );
  res.status(200).json(data.slice(0, 10));
}
