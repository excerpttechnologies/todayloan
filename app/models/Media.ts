// models/Media.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  name: string;
  filename: string;
  originalName: string;
  size: string;
  sizeBytes: number;
  type: string;
  mimeType: string;
  format: string;
  url: string;
  path: string;
  thumbnail: string;
  category: string;
  dimensions?: {
    width: number;
    height: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true, unique: true },
  originalName: { type: String, required: true },
  size: { type: String, required: true },
  sizeBytes: { type: Number, required: true },
  type: { type: String, required: true, enum: ['image', 'pdf', 'presentation', 'video', 'document'] },
  mimeType: { type: String, required: true },
  format: { type: String, required: true },
  url: { type: String, required: true },
  path: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String, default: 'uploads' },
  dimensions: {
    width: { type: Number },
    height: { type: Number }
  }
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);