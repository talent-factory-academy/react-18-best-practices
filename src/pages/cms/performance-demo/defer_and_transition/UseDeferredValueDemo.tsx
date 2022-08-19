import React, { useDeferredValue, useState, useTransition } from 'react';

// example useTransition
const dummyProducts = generateProducts();

function UseTransitionDemo() {
  const [filterTerm, setFilterTerm] = useState('');

  function updateFilterHandler(event: any) {
    setFilterTerm(event.target.value)
  }
  const filteredProducts = dummyProducts.filter((product) => product.includes(filterTerm));

  return (
    <div>
    <h1>useDeferredValue Demo </h1>
      <input type="text" onChange={updateFilterHandler} />
      <ProductList products={filteredProducts} />
    </div>
  );
}

function ProductList({ products }: any) {
  // 1. With Optimization
  const deferredProducts = useDeferredValue(products);
  // 2. Without Optimization
  // const deferredProducts = products

  return (
    <ul>
      {
        deferredProducts.map((product: any) => <li key={product}>{product}</li>)
      }
    </ul>
  );
}

export default UseTransitionDemo;

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
