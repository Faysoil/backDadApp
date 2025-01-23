// models/Route.ts
import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stops: { type: [String], required: true }, // Liste des arrêts
  },
  { timestamps: true }
);

export default mongoose.model("Route", RouteSchema);
