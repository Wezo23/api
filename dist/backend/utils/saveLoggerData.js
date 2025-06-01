import { connectDB } from '../db/connect.js';
export async function saveLoggerData(plantName, packet) {
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    if (!db)
        throw new Error("MongoDB connection not available");
    const collection = db.collection(`plant_${plantName}`);
    await collection.insertOne({
        data: packet,
        receivedAt: new Date(),
    });
}
