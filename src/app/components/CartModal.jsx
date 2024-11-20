// src/app/components/CartModal.jsx
import React from 'react';

function CartModal({ show, onClose, cartItems, removeFromCart }) {
  // Calcular el monto total del carrito
  const totalAmount = cartItems.reduce((total, item) => total + (item.discountedPrice || 0), 0);

  // Formatear la lista de productos para el mensaje de WhatsApp
  const cartList = cartItems.map(item => `${item.name} - $${item.discountedPrice.toFixed(2)}`).join(', ');

  // Enlace de WhatsApp con el mensaje predefinido
  const whatsappLink = `https://wa.me/543625190474?text=Hola, quiero comprar estos dispositivos: ${encodeURIComponent(cartList)}`;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${show ? 'block' : 'hidden'}`} style={{ zIndex: 1000 }}>
      <div className="bg-white p-4 rounded-lg w-96 shadow-lg relative overflow-y-auto max-h-[80vh]">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl text-pink-500 font-bold mb-4">Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-2 text-gray-700">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} alt={item.name} className="w-16 h-16 object-cover text-pink-500 mr-4" />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-pink-500">${item.discountedPrice ? item.discountedPrice.toFixed(2) : 'N/A'}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(index)}
                    >
                      &#x2716;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {/* Monto total */}
            <div className="mt-4 flex justify-between items-center font-bold text-gray-700">
              <span>Total:</span>
              <span className="text-pink-500">${totalAmount.toFixed(2)}</span>
            </div>
            {/* Botón de comprar con enlace a WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 block text-center"
            >
              Comprar
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
