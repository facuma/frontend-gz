// src/app/page.js
"use client";

import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import Hero from './components/Hero';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch('/api/products'); // Ruta API
      const data = await response.json();
      setProducts(data.data || []);
    }
    loadProducts();
  }, []);

  return (
    <div>
      <Hero />
      <ProductList products={products} />
    </div>
  );
}
