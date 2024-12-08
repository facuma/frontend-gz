"use client";

import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Hero from "./components/Hero";
import LoadingSpinner from "./components/LoadingSpinner"; // Indicador de carga
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products"); // Ruta API
        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }
        const data = await response.json();
        setProducts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Finalizar carga
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className={montserrat.className}>
      <Hero />
      <ProductList products={products} />
    </div>
  );
}
