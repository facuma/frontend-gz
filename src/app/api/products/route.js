import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';

// Conexión a la base de datos
dbConnect();

// Manejar solicitudes GET para obtener todos los productos
export async function GET() {
  try {
    const products = await Product.find(); // Consultar todos los productos en la base de datos
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    return NextResponse.json({ success: false, message: `Error: ${err.message}` }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect(); // Conexión a la base de datos

    const body = await req.json(); // Obtener los datos enviados en la solicitud

    // Crear un nuevo producto
    const newProduct = await Product.create(body);

    return NextResponse.json(
      { success: true, data: newProduct, message: 'Producto creado exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}


