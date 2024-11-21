"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";

export default function ProductPage({ params }) {
    const { addToCart } = useContext(CartContext);
  const { id } = params; // Obtenemos el ID del producto desde la URL dinámica
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500">Cargando producto...</p>;
  }

  const whatsappbuy = `https://wa.me/543625190474?text=Hola, quiero comprar estos dispositivos: ${encodeURIComponent(
    `${product.name} - Cantidad: ${quantity}`
  )}`;

  

  const handleAddToCart = () => {
    addToCart(product); // Agrega el producto al carrito
  };

  return (
    <div className="container mx-auto p-6">
      <nav className="text-gray-500 text-sm mb-6">
        <a href="/" className="hover:text-pink-500">Inicio</a> /{" "}
        <a href="/products" className="hover:text-pink-500">General</a> /{" "}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen y miniaturas */}
        <div className="flex flex-col">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <div className="flex gap-2">
            {[product.image, product.image, product.image].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniatura ${index}`}
                className="w-16 h-16 object-cover rounded-lg border border-gray-300 cursor-pointer hover:border-pink-500"
              />
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div>
          <h1 className="text-3xl text-black font-bold mb-4">{product.name}</h1>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              className="w-20 border border-gray-300 rounded p-2 text-gray-900"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Agregar al carrito
            </button>
            <a
              href={whatsappbuy}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            >
              Comprar directamente
            </a>
          </div>

          {/* Características del producto */}
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>
              <span className="font-bold">Tamaño de pantalla:</span> 6.1"
              Super Retina XDR OLED
            </li>
            <li>
              <span className="font-bold">Resolución:</span> 1179 x 2556p
            </li>
            <li>
              <span className="font-bold">Cámara principal:</span> Dual 48Mp -
              12Mp
            </li>
            <li>
              <span className="font-bold">Cámara frontal:</span> 12Mp
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
