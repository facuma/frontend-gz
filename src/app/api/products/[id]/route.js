import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';

export async function GET(req, { params }) {
    try {
      await dbConnect();
      const { id } = params; // Obtener el ID del producto
  
      // Validar que el ID sea válido
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json(
          { success: false, message: "ID de producto inválido" },
          { status: 400 }
        );
      }
  
      const product = await Product.findById(id); // Buscar producto en la BD
      if (!product) {
        return NextResponse.json(
          { success: false, message: "Producto no encontrado" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, data: product },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return NextResponse.json(
        { success: false, message: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID no proporcionado' },
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
};

export async function PUT(req) {
    try {
      await dbConnect(); // Conectar a la base de datos
  
      const id = req.url.split('/').pop(); // Extraer el ID desde la URL
      const body = await req.json(); // Obtener datos del cuerpo de la solicitud
  
      // Actualizar el producto en la base de datos
      const updatedProduct = await Product.findByIdAndUpdate(id, body, {
        new: true, // Devuelve el producto actualizado
        runValidators: true, // Asegura que los datos cumplen con el esquema
      });
  
      if (!updatedProduct) {
        return NextResponse.json(
          { success: false, message: 'Producto no encontrado' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, data: updatedProduct },
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
