// models/Settings.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  tagline: string;
  logo: string | null;
  email: string;
  phone: string;
  address: string;
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
  theme: string;
  primaryColor: string;
  accentColor: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    facebook: string;
    github: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema({
  siteName: { type: String, default: 'SmartScope Technologies' },
  tagline: { type: String, default: 'Premium Semiconductor Solutions' },
  logo: { type: String, default: null },
  email: { type: String, default: 'info@smartscope.com' },
  phone: { type: String, default: '+1 (408) 555-0100' },
  address: { type: String, default: '123 Innovation Drive, San Jose, CA 95110' },
  seoTitle: { type: String, default: 'SmartScope - Premium Semiconductor Solutions' },
  seoDesc: { type: String, default: 'Cutting-edge semiconductor technology for signal processing, data conversion, and AI-enhanced analog systems.' },
  seoKeywords: { type: String, default: 'semiconductor, analog design, digital IP, AI converters' },
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
  primaryColor: { type: String, default: '#0ea5e9' },
  accentColor: { type: String, default: '#06b6d4' },
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: false },
  weeklyDigest: { type: Boolean, default: true },
  twoFactorAuth: { type: Boolean, default: false },
  sessionTimeout: { type: String, default: '30' },
  socialLinks: {
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' },
    github: { type: String, default: '' },
  },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);