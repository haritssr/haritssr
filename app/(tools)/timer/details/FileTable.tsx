import Table from "@/components/Table";

export default function FileTable({
  caption,
  files,
}: {
  caption: string;
  files: readonly (readonly [string, string])[];
}) {
  return (
    <Table className="whitespace-nowrap">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 text-left font-medium" scope="col">
            File location
          </th>
          <th className="px-3 text-left font-medium" scope="col">
            Purpose
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {files.map(([path, purpose]) => (
          <tr className="divide-border divide-x" key={path}>
            <th
              className="px-3 py-3 text-left align-top font-normal"
              scope="row"
            >
              <code>{path}</code>
            </th>
            <td className="px-3 py-3 align-top">{purpose}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
