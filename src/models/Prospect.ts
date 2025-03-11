// models/Prospect.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IProspect extends Document {
  name: string;
  managerName: string;
  address: string;
  phone: string;
  mail: string;
  website: string;
  sector: string;
  interest: string;
  action: string;
  comment?: string;
  postalSector?: {
    code: string;
    name: string;
  };
  appointmentDate?: Date;
  appointmentTime?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Types.ObjectId;
}

const ProspectSchema = new Schema<IProspect>(
  {
    name: { type: String, required: true },
    managerName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    mail: { type: String, required: true },
    website: { type: String, required: true },
    sector: { type: String, default: null },
    interest: { type: String, required: true },
    action: { type: String, default: null },
    comment: { type: String },
    postalSector: {
      code: { type: String },
      name: { type: String },
    },
    appointmentDate: { type: Date },
    appointmentTime: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Prospect = mongoose.model<IProspect>('Prospect', ProspectSchema);
