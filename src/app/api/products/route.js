import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';

// Función para generar un slug a partir del nombre
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza caracteres no alfanuméricos con "-"
    .replace(/^-+|-+$/g, ''); // Elimina guiones al principio y al final
};

// Manejar solicitudes GET para obtener todos los productos
export async function GET(req) {
  try {
    await dbConnect(); // Conexión a la base de datos

    // Implementación de paginación
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Consulta con paginación
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    return NextResponse.json({
      success: true,
      data: products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    console.error('Error al obtener productos:', err);
    return NextResponse.json(
      { success: false, message: `Error interno del servidor: ${err.message}` },
      { status: 500 }
    );
  }
}

// Manejar solicitudes POST para crear un producto
export async function POST(req) {
  try {
    await dbConnect(); // Conexión a la base de datos

    const body = await req.json(); // Obtener los datos enviados en la solicitud

    // Validar campos requeridos
    const {
      name,
      description,
      image,
      originalPrice,
      discountedPrice,
      stock,
    } = body;

    if (
      !name ||
      !description ||
      !image ||
      originalPrice === undefined ||
      discountedPrice === undefined ||
      stock === undefined
    ) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Generar un slug único basado en el nombre
    const slug = generateSlug(name);

    // Crear un nuevo producto
    const newProduct = await Product.create({
      ...body,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: 'Producto creado exitosamente',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear el producto:', error);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: `Error de validación: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
