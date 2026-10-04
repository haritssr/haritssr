import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";

import SubTitle from "@/components/SubTitle";
import { DATABASE_EXPERIMENTS_ENABLED } from "@/utils/databaseExperiments";
import { createPageMetadata } from "@/utils/pageMetadata";

import { createTool, listTools } from "./db";

export const runtime = "nodejs";

const TOOLS_PATH = "/experiments/ui-explorations/tools";

export const metadata: Metadata = createPageMetadata({
  title: "Tools",
  description: "Create and inspect tools in the experiment database.",
  path: TOOLS_PATH,
});

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

interface ToolsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  if (!DATABASE_EXPERIMENTS_ENABLED) {
    notFound();
  }

  await connection();
  const tools = listTools();
  const resolvedParams = searchParams ? await searchParams : {};
  const error =
    typeof resolvedParams.error === "string" ? resolvedParams.error : null;

  return (
    <div>
      <SubTitle>Manage tools in experiment database.</SubTitle>

      {error !== null && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      <div className="mt-6 space-y-16">
        <section className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-lg font-semibold">Manage Tools</h2>
          <form
            action={createToolAction}
            className="mt-3 grid gap-3 sm:grid-cols-4"
          >
            <label className="grid gap-1 text-sm">
              Name
              <input
                autoComplete="off"
                className="rounded border px-3 py-2"
                maxLength={100}
                name="name"
                required
              />
            </label>
            <label className="grid gap-1 text-sm">
              Price (IDR)
              <input
                className="rounded border px-3 py-2"
                inputMode="numeric"
                max="1000000000"
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
                inputMode="numeric"
                max="1000000000"
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

        <section className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-lg font-semibold">Current Tools</h2>

          {tools.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">No tools yet.</p>
          ) : (
            <div className="scrollbar-subtle mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">Current tools</caption>
                <thead>
                  <tr className="border-b border-neutral-200 text-left">
                    <th scope="col" className="py-2 pr-4">
                      Name
                    </th>
                    <th scope="col" className="py-2 pr-4">
                      Price
                    </th>
                    <th scope="col" className="py-2 pr-4">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr className="border-b border-neutral-100" key={tool.id}>
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
    </div>
  );
}

function parsePositiveInt(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > 1_000_000_000) {
    return null;
  }

  return parsed;
}

async function createToolAction(formData: FormData) {
  "use server";
  if (!DATABASE_EXPERIMENTS_ENABLED) {
    notFound();
  }

  const name = formData.get("name");
  const price = parsePositiveInt(formData.get("price"));
  const amount = parsePositiveInt(formData.get("amount"));

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    name.trim().length > 100 ||
    price === null ||
    amount === null
  ) {
    redirect(`${TOOLS_PATH}?error=invalid-input`);
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
    redirect(`${TOOLS_PATH}?error=create-failed`);
  }

  revalidatePath(TOOLS_PATH);
}
