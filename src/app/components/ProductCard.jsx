"use client"; // Si estás usando Next.js

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Si tienes un contexto para el carrito

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product); // Agrega el producto al carrito
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
      {product.discount && (
        <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
          {product.discount}
        </span>
      )}
      <div className="h-60 w-50 py-5 overflow-hidden">
        <img
          src={product.image.url} // Utiliza la propiedad `url` del objeto de imagen
          alt={product.name}
          className="w-52 h-auto mx-auto"
        />
      </div>
      <div className="p-4">
        <h2 className="text-black font-semibold mb-2">{product.name}</h2>
        
        <div className="flex items-center space-x-2">
          {product.originalPrice && (
            <p className="text-gray-500 line-through text-sm">${product.originalPrice}</p>
          )}
          <p className="text-pink-500 font-bold text-lg">${product.discountedPrice}</p>
        </div>
        <button
          className="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
