import React, { useState, useTransition } from 'react';

// example useTransition
const dummyProducts = generateProducts();

function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');

  function updateFilterHandler(event: any) {
    // 1. with optimization
    startTransition(() => setFilterTerm(event.target.value));
    // 2. without optimization
    // setFilterTerm(event.target.value)
  }
  const filteredProducts = dummyProducts.filter((product) => product.includes(filterTerm));

  return (
    <div>
      <h1>useTransition Demo</h1>
      <input type="text" onChange={updateFilterHandler} />
      {isPending && <pre style={{color: 'red'}}>Render List...</pre>}
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
