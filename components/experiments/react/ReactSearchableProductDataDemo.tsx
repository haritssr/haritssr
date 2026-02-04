"use client";

import { type Dispatch, type JSX, type SetStateAction, useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
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

const ProductCategoryRow = ({ category }: { category: string }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }: { product: productDataType }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr className="">
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
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  // for (const product of products) {
  products.forEach((product: productDataType) => {
    //couldn't destructure product in as a '({caterogry, name, stocked} : productDataType)' in forEach callback parameter because <ProductRow/> below need 'product' variabel
    const { category, name, stocked } = product;

    if (name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !stocked) {
      return;
    }

    if (category !== lastCategory) {
      rows.push(<ProductCategoryRow category={category} key={category} />);
    }

    rows.push(<ProductRow key={name} product={product} />);
    lastCategory = category;
  });
  // products.forEach((product: productDataType) => {});

  return (
    <table className="rounded border p-2">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
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
}) => {
  return (
    <form className="flex w-fit flex-col gap-2">
      <input
        onChange={(e) => onFilterTextChange(e.target.value)}
        placeholder="Search..."
        type="text"
        value={filterText}
      />
      <label className="text-sm text-zinc-400">
        <input
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          type="checkbox"
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
};

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
      <FilterableProductTable products={productData} />
    </>
  );
}
