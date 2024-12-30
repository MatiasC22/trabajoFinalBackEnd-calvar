import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
  available: Boolean,
});

productSchema.plugin(require('mongoose-paginate-v2'));

export const Product = mongoose.model('Product', productSchema);
