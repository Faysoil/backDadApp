// models/RouteCsvModel.ts
import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sector: {
    id: { type: String, default: null },
    code: { type: String, default: null },
    name: { type: String, default: null },
    city: { type: String, default: null },
  },
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RouteStop' }], // Référence à RouteStop
  isOptimized: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Route', routeSchema);
