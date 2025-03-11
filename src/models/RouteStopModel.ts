// models/RouteStop.ts
import mongoose from 'mongoose';

const routeStopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, default: null },
  notes: { type: String, default: null },
  completed: { type: Boolean, required: true },
  contactType: { type: String, required: true },
  appointmentDate: { type: String, default: null },
  appointmentTime: { type: String, default: null },
  interest: { type: String, default: null },
  managerName: { type: String, default: null },
  email: { type: String, default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

export default mongoose.model('RouteStop', routeStopSchema);
