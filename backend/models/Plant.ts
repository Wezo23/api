// models/Plant.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPlant extends Document {
  plantName: string;
  plantOwner: mongoose.Types.ObjectId;
  dcCapacity: number;
  inverters: number;
  smbs: number;
  modules: number;
  inverterTransformer: string;
  projectType: string;
  loggers: string[]; // 👈 array of IMEI numbers
}

const plantSchema = new Schema<IPlant>({
  plantName: { type: String, required: true },
  plantOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dcCapacity: { type: Number, required: true },
  inverters: { type: Number, required: true },
  smbs: { type: Number, required: true },
  modules: { type: Number, required: true },
  inverterTransformer: { type: String, required: true },
  projectType: { type: String, required: true },
  loggers: [{ type: String }] // 👈 add logger IMEIs
});

export const PlantModel = mongoose.models.Plant || mongoose.model<IPlant>('Plant', plantSchema);
