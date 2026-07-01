// models/Inquiry.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied' | 'Resolved' | 'Archived';
  priority: 'High' | 'Medium' | 'Low';
  replied: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Replied', 'Resolved', 'Archived'], default: 'New' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  replied: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);