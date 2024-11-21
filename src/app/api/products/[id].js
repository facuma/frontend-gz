import dbConnect from '@/app/utils/dbConnect';
import Product from '@/app/models/Product';
import authenticate from '@/app/api/middleware/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      authenticate(req, res, async () => {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado con éxito' });
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar producto' });
    }
  } else if (req.method === 'PATCH') {
    try {
      authenticate(req, res, async () => {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar producto' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
