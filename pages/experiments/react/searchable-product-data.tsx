import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface dataType {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

const data: dataType[] = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

/*
    ALL PIECE OF DATA OF THIS APPLICATION
    1. The original list of products
    2. The search text the user has entered
    3. The value of the checkbox
    4. The filtered list of products


    WHICH ONE IS STATE?
    - Does it remain unchanged over time? If so, it is not state
    - Is it passed in from a parent via props? If so, it is not state
    - Can you compute it based on existing state or props in your component? If so, it is not state
    - The original list of products is passed as props, so it is not state.
    - The search text seems to be state since it changes over time and can't be computed from anything.
    - The value of the checkbox seems to be state since it change over time and can't be computed from anything.
    - The filtered list of products isn't state because it can be computed by taking the original list of products and filtering it according to the search text and value of the checkbox.

    STATE
    - Search text
    - Checkbox value

    STRATEGY FOR STATE
    1. Identify components that use state
       - ProductTable needs to filter the product list based on that state (search text and checkbox value)
       - SearchBar needs to display that state (search text and checkbox value)
    2. Find their common parent: The first parent components both components share is FilterableProductTable.

*/

export default function SearchableProductData() {
  return (
    <LayoutToExperiments domain='React' title='Searchable Product Data'>
      <SubTitle>
        By
        <ExternalLink
          name='beta.reactjs.org'
          href='https://beta.reactjs.org/learn/thinking-in-react'
        />
      </SubTitle>
      <FilterableProductTable products={data} />
    </LayoutToExperiments>
  );
}

const ProductCategoryRow = ({ category }: { category: string }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }: { product: dataType }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
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
  products: dataType[];
  filterText: string;
  inStockOnly: boolean;
}) => {
  const rows: Array<JSX.Element> = [];
  let lastCategory: string | null = null;

  products.forEach((product: dataType) => {
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

    rows.push(<ProductRow product={product} key={name} />);
    lastCategory = category;
  });

  return (
    <table>
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

const SearchBar = ({
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
    <form>
      <input
        type='text'
        placeholder='Search...'
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type='checkbox'
          checked={inStockOnly}
          onChange={e => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
};

const FilterableProductTable = ({ products }: { products: dataType[] }) => {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
};
