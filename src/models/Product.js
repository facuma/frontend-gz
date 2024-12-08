import mongoose from 'mongoose';
import slugify from 'slugify';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      index: true, // Índice para búsquedas rápidas
    },
    description: {
      type: String,
      required: [true, 'La descripción del producto es obligatoria'],
    },
    image: {
      type: String,
      required: [true, 'La imagen del producto es obligatoria'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'El precio original es obligatorio'],
      min: [0, 'El precio original debe ser mayor o igual a 0'],
    },
    discountedPrice: { type: Number, required: true },
    discount: {
      type: String,
      default: '0%', // Valor predeterminado
    },
    category: {
      type: String,
      index: true, // Índice para filtrar por categorías
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock debe ser mayor o igual a 0'],
    },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

// Índice compuesto opcional para búsquedas combinadas (ejemplo: categoría y precio)
ProductSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
