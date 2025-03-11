// models/CsvModel.ts
import mongoose from 'mongoose';

const csvSchema = new mongoose.Schema({
  name: String,
  website: String,
  address: String,
  postal_code: String,
  city: String,
}, { timestamps: true });

export default mongoose.model('CsvRecord', csvSchema);
