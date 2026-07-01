// app/models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  price: string;
  specs: string[];
  image: string | null;
  status: 'Active' | 'Draft' | 'Archived';
  sales: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ['Silicon IP', 'Technology', 'Service'] },
  description: { type: String, required: true },
  price: { type: String, required: true },
  specs: [{ type: String }],
  image: { type: String, default: null },
  status: { type: String, enum: ['Active', 'Draft', 'Archived'], default: 'Active' },
  sales: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);