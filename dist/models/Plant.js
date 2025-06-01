// models/Plant.ts
import mongoose, { Schema } from 'mongoose';
const plantSchema = new Schema({
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
export const PlantModel = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
