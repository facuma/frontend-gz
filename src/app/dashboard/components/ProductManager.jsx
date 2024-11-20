"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '@/app/context/AuthContext';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    originalPrice: 0,
    discountedPrice: 0,
    category: "",
    stock: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Cambia esto según tu backend

  // Obtener productos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchProducts();
  }, []);

  // Manejo del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Crear o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
  
    try {
      if (isEditing) {
        // Actualizar producto existente
        const response = await axios.put(`${API_URL}/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(products.map((p) => (p._id === editId ? response.data.data : p)));
      } else {
        // Crear un nuevo producto
        const response = await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts([...products, response.data.data]); // Asegúrate de usar el producto con _id generado
      }
  
      // Restablecer el formulario
      setFormData({
        name: "",
        description: "",
        image: "",
        originalPrice: 0,
        discountedPrice: 0,
        category: "",
        stock: 0,
      });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Error al enviar el formulario:", err.message);
    }
  };
  

  const { token } = useAuth(); // Llamada dentro de un componente funcional

  const handleDelete = async (_id) => {
    console.log("ID recibido para eliminar:", _id);

    if (!_id) {
      console.error('El ID del producto es inválido o no se ha proporcionado.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Asegúrate de pasar el token de autorización
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error desconocido');
      }
  
      setProducts(products.filter((product) => product._id !== _id)); // Actualiza la lista local de productos
    } catch (err) {
      console.error('Error al eliminar el producto:', err.message);
    }
  };

  // Preparar edición
  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setEditId(product._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black mx-auto justify-center text-center font-bold mb-4">Gestión de Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="p-2 border text-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="p-2 border text-gray-800 rounded"
          />
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL de la imagen"
            className="p-2 border text-gray-800 rounded"
          />
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            placeholder="Precio original"
            className="p-2 border text-gray-800 rounded"
          />
          <input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleChange}
            
            placeholder="Precio con descuento"
            className="p-2 border text-gray-800 rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            
            placeholder="Categoría"
            className="p-2 border text-gray-800 rounded"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="p-2 border text-gray-800 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </form>

      {/* Lista de productos */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="border  text-gray-800 p-2">Nombre</th>
            <th className="border text-gray-800 p-2">Descripción</th>
            <th className="border text-gray-800 p-2">Precio</th>
            <th className="border text-gray-800 p-2">Stock</th>
            <th className="border text-gray-800 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
            <td className="border text-gray-800 p-2">{product._id}</td>
              <td className="border text-gray-800 p-2">{product.name}</td>
              <td className="border text-gray-800 p-2">{product.description}</td>
              <td className="border text-gray-800 p-2">${product.discountedPrice}</td>
              <td className="border text-gray-800 p-2">{product.stock}</td>
              <td className="border text-gray-800 p-2 space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
