import React, { useDeferredValue, useState } from 'react';

// example useTransition
const dummyProducts = generateProducts();

function NoOptimizedExample() {
  const [filterTerm, setFilterTerm] = useState('');

  function updateFilterHandler(event: any) {
    setFilterTerm(event.target.value)
  }
  const filteredProducts = dummyProducts.filter((product) => product.includes(filterTerm));

  return (
    <div>
    <h1>No Optimized Demo </h1>
      <input type="text" onChange={updateFilterHandler} placeholder="Type and delete numbers"/>
      <ProductList products={filteredProducts} />
    </div>
  );
}

function ProductList({ products }: any) {
  return (
    <ul>
      {
        products.map((product: any) => <li key={product}>{product}</li>)
      }
    </ul>
  );
}

export default NoOptimizedExample;

/**
 * DUMMY PRODUCTS
 */
export function generateProducts() {
  const products = [];
  for (let i = 0; i < 20000; i++) {
    products.push(`Product ${i+1}`);
  }
  return products;
}
