export default function TableDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-70 border-collapse divide-y divide-zinc-300 border border-zinc-300 text-sm text-zinc-800">
        <caption className="sr-only">Example data table</caption>
        <thead>
          <tr className="divide-x divide-zinc-300 bg-zinc-50">
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
        <tbody className="divide-y divide-zinc-200">
          <tr className="divide-x divide-zinc-200">
            <td className="px-3 py-2">Ada</td>
            <td className="px-3 py-2">Engineer</td>
            <td className="px-3 py-2">Active</td>
          </tr>
          <tr className="divide-x divide-zinc-200">
            <td className="px-3 py-2">Grace</td>
            <td className="px-3 py-2">Designer</td>
            <td className="px-3 py-2">Away</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
