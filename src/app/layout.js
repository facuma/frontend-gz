// src/app/layout.js
import './globals.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';

export default function RootLayout({ children }) {
  const isDashboard = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      
      <body className="bg-gray-100 min-h-screen">
      <AuthProvider>
        <CartProvider>
          {!isDashboard && <Header />}
          <main className="flex-1">{children}</main>
          {!isDashboard && <Footer />}
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

