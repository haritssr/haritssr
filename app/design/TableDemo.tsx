export default function TableDemo() {
  return (
    <div className="border-border w-full overflow-hidden rounded-md border">
      <div className="scrollbar-subtle w-full overflow-x-auto">
        <table className="divide-border text-foreground w-full min-w-70 border-collapse divide-y text-sm">
          <caption className="sr-only">Example data table</caption>
          <thead>
            <tr className="divide-border bg-foreground/5 divide-x">
              <th className="px-3 py-2 text-left font-medium" scope="col">
                Name
              </th>
              <th className="px-3 py-2 text-left font-medium" scope="col">
                Role
              </th>
              <th className="px-3 py-2 text-left font-medium" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            <tr className="divide-border divide-x">
              <td className="px-3 py-2">Ada</td>
              <td className="px-3 py-2">Engineer</td>
              <td className="px-3 py-2">Active</td>
            </tr>
            <tr className="divide-border divide-x">
              <td className="px-3 py-2">Grace</td>
              <td className="px-3 py-2">Designer</td>
              <td className="px-3 py-2">Away</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
