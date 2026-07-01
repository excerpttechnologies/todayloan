// models/Job.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  status: 'Open' | 'Closed' | 'On Hold';
  applications: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: String, required: true },
  salary: { type: String },
  experience: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  status: { type: String, enum: ['Open', 'Closed', 'On Hold'], default: 'Open' },
  applications: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);