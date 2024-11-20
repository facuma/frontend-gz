const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`); // Cambia esta URL si subes el backend a producción
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Error al obtener los productos');
    }

    return result.data; // Devuelve solo la lista de productos
  } catch (error) {
    console.error('Error en fetchProducts:', error);
    throw error;
  }
}

// Autenticación (Login)
export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }
  return await response.json(); // Retorna el token
}
