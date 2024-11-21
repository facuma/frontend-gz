import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discount: { type: String },
  category: { type: String },
  stock: { type: Number, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
