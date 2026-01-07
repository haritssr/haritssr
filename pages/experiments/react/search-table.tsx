import { useEffect, useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

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

export default function SearchTable() {
  const [query, setQuery] = useState<string>("");
  // biome-ignore lint/suspicious/noExplicitAny: API response type is unknown
  const [users, setUsers] = useState<Array<any>>([]);

  const debouncedSearch = useDebounce(query, 1000);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await fetch(`/api/searchWithApi?q=${debouncedSearch}`).then(
        (r) => r.json()
      );
      setUsers(data);
      // console.log(data);
    };
    // if (debouncedSearch) dataFetch();

    // debounce without debounced function
    // if(query.length === 0 || query.length > 2);
    dataFetch();
  }, [debouncedSearch]);

  return (
    <LayoutToExperiments domain="React" title="Search Table">
      <SubTitle>
        <ExplanationList>
          <li>
            Inspired by{" "}
            <ExternalLink
              href="https://www.youtube.com/watch?v=MY6ZZIn93V8"
              name="Lama Dev"
            />
          </li>
          <li>
            Data source
            <ExternalLink
              href="https://jsonplaceholder.typicode.com/users"
              name="JSONPlaceHolder"
            />
            .
          </li>
          <li>Already applied debounce on search.</li>
        </ExplanationList>
      </SubTitle>
      <input
        className="mb-5 rounded-md border-[1.5px] border-zinc-500 px-2 py-1 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-200"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        type="search"
        value={query}
      />
      {/* <ol className='list-item list-inside list-decimal'> */}
      <table className="border">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Mainden Name</th>
          </tr>
        </thead>
        <tbody>
          {/*data => data.firstName.toLowerCase().includes(query.toLowerCase()) */}
          {users
            .filter((item) =>
              ["firstName", "lastName", "maidenName"].some((key) =>
                item[key].toLowerCase().includes(query.toLocaleLowerCase())
              )
            )
            .map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.maidenName}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* </ol> */}
    </LayoutToExperiments>
  );
}
