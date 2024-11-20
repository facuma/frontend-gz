"use client"; // Si estás usando Next.js

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Asegúrate de tener el componente ProductCard
import { fetchProducts } from '../../utils/api'; // Importa la función para obtener productos

function ProductList() {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para mostrar un spinner de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(); // Llama a la API para obtener los productos
        setProducts(data); // Actualiza el estado con los productos
        setLoading(false); // Cambia el estado de carga
      } catch (err) {
        setError(err.message); // Maneja errores si ocurren
        setLoading(false); // Cambia el estado de carga
      }
    }

    loadProducts();
  }, []); // El efecto se ejecuta solo una vez al cargar el componente

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error}</p>;
  }

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5 px-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
