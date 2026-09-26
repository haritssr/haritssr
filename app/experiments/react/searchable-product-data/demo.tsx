"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

interface productDataType {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

//e.g. data from API
const productData: productDataType[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

const ProductCategoryRow = ({ category }: { category: string }) => (
  <tr>
    <th colSpan={2} scope="rowgroup">
      {category}
    </th>
  </tr>
);

const ProductRow = ({ product }: { product: productDataType }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable = ({
  products,
  filterText,
  inStockOnly,
}: {
  products: productDataType[];
  filterText: string;
  inStockOnly: boolean;
}) => {
  const groups = new Map<string, productDataType[]>();
  for (const product of products) {
    if (
      !product.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (inStockOnly && !product.stocked)
    ) {
      continue;
    }
    const group = groups.get(product.category);
    if (group) {
      group.push(product);
    } else {
      groups.set(product.category, [product]);
    }
  }

  return (
    <table className="rounded border p-2">
      <caption className="sr-only">Products and prices</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      {Array.from(groups, ([category, items]) => (
        <tbody key={category}>
          <ProductCategoryRow category={category} />
          {items.map((product) => (
            <ProductRow key={product.name} product={product} />
          ))}
        </tbody>
      ))}
    </table>
  );
};

const SearchBarWithFilter = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: Dispatch<SetStateAction<string>>;
  onInStockOnlyChange: Dispatch<SetStateAction<boolean>>;
}) => (
  <form className="flex w-fit flex-col gap-2">
    <input
      aria-label="Search products"
      onChange={(e) => {
        onFilterTextChange(e.target.value);
      }}
      placeholder="Search..."
      type="text"
      value={filterText}
    />
    <label className="text-sm text-zinc-400">
      <input
        checked={inStockOnly}
        onChange={(e) => {
          onInStockOnlyChange(e.target.checked);
        }}
        type="checkbox"
      />{" "}
      Only show products in stock
    </label>
  </form>
);

const FilterableProductTable = ({
  products,
}: {
  products: productDataType[];
}) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div className="space-y-2">
      <SearchBarWithFilter
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products}
      />
    </div>
  );
};

export default function ReactSearchableProductDataDemo() {
  return (
    <>
      <SubTitle>
        By
        <ExternalLink
          href="https://beta.reactjs.org/learn/thinking-in-react"
          name="beta.reactjs.org"
        />
        <ExplanationList>
          <li>Stock finder with filter.</li>
          <li>Haven&#39;t applied debounce.</li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />
      <FilterableProductTable products={productData} />
    </>
  );
}
