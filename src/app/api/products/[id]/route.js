import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';

// Validar si un ID es válido
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Manejar solicitudes GET para obtener un producto por ID
// Obtener un producto por ID o slug
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // Asegúrate de usar `await` para acceder a los parámetros

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Manejar solicitudes DELETE para eliminar un producto por ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; // Accede al parámetro `id`

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: 'ID de producto inválido' },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Producto eliminado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Manejar solicitudes PUT para actualizar un producto por ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; // Obtén el ID del producto
    const body = await req.json(); // Datos del cuerpo de la solicitud

    // Actualizar el producto sin validaciones adicionales
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // Retorna el documento actualizado
      runValidators: false, // Desactiva las validaciones
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedProduct, message: 'Producto actualizado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}