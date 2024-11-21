const BASE_URL = '/api'; // Usamos las API Routes de Next.js

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  return response.json();
}

export async function createProduct(product, token) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Error al crear producto');
  }
  return response.json();
}

export async function deleteProduct(id, token) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Incluye el token
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar producto');
  }
  return response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas');
  }
  return response.json();
}

export async function registerUser(credentials) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      return response.json();
    }
