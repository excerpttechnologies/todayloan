// app/models/Blog.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  author: string;
  authorAvatar: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
  readTime: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: number;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  authorAvatar: { type: String, default: '' },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: null },
  readTime: { type: String, default: '5 min' },
  status: { 
    type: String, 
    enum: ['Published', 'Draft', 'Archived'], 
    default: 'Draft' 
  },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);