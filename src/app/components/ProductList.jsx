"use client";

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/utils/api';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]); // Inicializa como un array vacío

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products'); // Ajusta la URL según corresponda
        const result = await response.json();
        if (result.success) {
          setProducts(result.data || []); // Asegúrate de que result.data sea un array
        } else {
          console.error('Error fetching products:', result.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5 px-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
