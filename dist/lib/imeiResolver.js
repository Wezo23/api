import { connectDB } from '../db/connect.js';
import { PlantModel } from '../models/Plant.js';
export async function resolvePlantByIMEI(imei) {
    await connectDB(); // Ensure DB is connected
    const plant = await PlantModel.findOne({ loggers: { $in: [imei] } });
    console.log(plant, "🔍 Found plant by IMEI");
    return plant?.plantName || null;
}
