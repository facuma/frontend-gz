import dbConnect from '@/app/utils/dbConnect';
import Product from '@/app/models/Product';
import authenticate from '@/app/api/middleware/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener productos' });
    }
  } else if (req.method === 'POST') {
    try {
      authenticate(req, res, async () => {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al crear producto' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
