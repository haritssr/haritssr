interface Person {
  id: string;
  name: string;
  age: string;
  city: string;
}

export default async function InputListPage() {
  const response = await fetch("http://localhost:3000/api/hello");
  const data: Person[] = await response.json();

  return (
    <div>
      <ul className="space-y-3">
        {data.map((d) => (
          <li className="w-fit border p-2" key={d.id}>
            <div>Name: {d.name}</div>
            <div>Age: {d.age}</div>
            <div>City: {d.city}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
