"use client";

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]); // Inicializa como un array vacío
  const [loading, setLoading] = useState(true); // Manejar el estado de carga
  const [error, setError] = useState(null); // Manejar errores

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true); // Inicia el estado de carga
        const response = await fetch('/api/products'); // Llama a la API
        const result = await response.json();
        if (result.success) {
          setProducts(result.data || []); // Asegúrate de que result.data sea un array
        } else {
          setError(result.message || 'Error desconocido al obtener los productos.');
        }
      } catch (error) {
        setError('Error de red al obtener los productos.');
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        {error} Por favor, intenta nuevamente más tarde.
      </p>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No se encontraron productos.</p>;
  }

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5 px-4">
      {products.map((product) => (
        <ProductCard key={product.slug || product._id} product={product} />
      ))}
    </div>
  );
}
