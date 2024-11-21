import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Importa el modelo de usuario
import dbConnect from '@/utils/dbConnect'; // Importa la conexión a la base de datos

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function POST(req) {
  await dbConnect(); // Conecta a la base de datos al inicio

  try {
    const { username, password } = await req.json(); // Parsear el cuerpo de la solicitud

    // Validar si faltan campos
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Verificar la contraseña
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json(
      {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        user: { id: user._id, username: user.username }, // Devuelve datos mínimos del usuario
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message || error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
