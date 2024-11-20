"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import ProductManager from './components/ProductManager';

export default function Dashboard() {
  const { user, handleLogin } = useAuth();
  const router = useRouter();

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Si el usuario ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetear errores
    try {
      await handleLogin(credentials.username, credentials.password);
      router.push("/dashboard"); // Redirigir al dashboard después de iniciar sesión
    } catch (err) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  if (!user) {
    // Si no está autenticado, mostrar formulario de inicio de sesión
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-black text-center mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Usuario</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Si el usuario está autenticado, mostrar el contenido del panel de administración
  return (
    <div>
      <h1 className="text-3xl mt-12 text-black text-center font-bold">Panel de Administración</h1>
      <p>Bienvenido, {user.username}</p>
      <ProductManager/>
    </div>
  );
}
