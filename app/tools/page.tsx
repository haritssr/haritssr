import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import { createTool, listTools } from "./db";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Tools",
  description: "Create and inspect tools in the experiment database.",
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function parsePositiveInt(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

async function createToolAction(formData: FormData) {
  "use server";
  const name = formData.get("name");
  const price = parsePositiveInt(formData.get("price"));
  const amount = parsePositiveInt(formData.get("amount"));

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    price === null ||
    amount === null
  ) {
    redirect("/tools?error=invalid-input");
  }

  try {
    await Promise.resolve(
      createTool({
        name: name.trim(),
        price,
        amount,
      })
    );
  } catch {
    redirect("/tools?error=create-failed");
  }

  revalidatePath("/tools");
}

interface ToolsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const tools = listTools();
  const resolvedParams = searchParams ? await searchParams : {};
  const error =
    typeof resolvedParams.error === "string" ? resolvedParams.error : null;

  return (
    <div>
      <PageTitle title="Tools" />
      <PageDescription description="Manage tools in experiment database." />

      {!!error && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-sm">
          Error: {error}
        </div>
      )}

      <section className="mt-6 rounded-lg border border-neutral-200 p-4">
        <h2 className="font-semibold text-lg">Manage Tools</h2>
        <form
          action={createToolAction}
          className="mt-3 grid gap-3 sm:grid-cols-4"
        >
          <label className="grid gap-1 text-sm">
            Name
            <input className="rounded border px-3 py-2" name="name" required />
          </label>
          <label className="grid gap-1 text-sm">
            Price (IDR)
            <input
              className="rounded border px-3 py-2"
              min="0"
              name="price"
              required
              step="1"
              type="number"
            />
          </label>
          <label className="grid gap-1 text-sm">
            Amount
            <input
              className="rounded border px-3 py-2"
              min="0"
              name="amount"
              required
              step="1"
              type="number"
            />
          </label>
          <div className="flex items-end">
            <button
              className="w-full rounded bg-black px-3 py-2 text-white"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </section>

      <section className="mt-6 rounded-lg border border-neutral-200 p-4">
        <h2 className="font-semibold text-lg">Current Tools</h2>

        {tools.length === 0 ? (
          <p className="mt-3 text-neutral-500 text-sm">No tools yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-neutral-200 border-b text-left">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr className="border-neutral-100 border-b" key={tool.id}>
                    <td className="py-2 pr-4">{tool.name}</td>
                    <td className="py-2 pr-4">
                      {currencyFormatter.format(tool.price)}
                    </td>
                    <td className="py-2 pr-4">{tool.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
