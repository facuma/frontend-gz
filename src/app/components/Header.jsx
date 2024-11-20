// src/components/Header.jsx
"use client"; // Esta línea se añade para marcar el componente como un componente de cliente

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import CartModal from './CartModal';
import logo from '../../../public/chaos.png'

function Header() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <header className="bg-pink-500 text-white">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-2">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>ENVIOS A TODO EL NEA</span>
          <span>✉️ zonageek@gmail.com</span>
        </div>
        
      </div>
      <nav className="bg-white text-black">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-4">
          <Link href="/">
            <Image
              src={logo}
              alt="Zona Geek Logo"
              width="auto"
              height={50}
              priority
              className="cursor-pointer"
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/" className="hover:text-pink-500">Inicio</Link>
            <Link href="/products" className="hover:text-pink-500">Productos</Link>
            <Link href="/contact" className="hover:text-pink-500">Contacto</Link>
            <button className="relative hover:text-pink-500" onClick={() => setShowCartModal(true)}>
              🛒 {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-xs px-2">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <CartModal
        show={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
    </header>
  );
}

export default Header;
