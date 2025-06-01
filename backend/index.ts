import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import loggerRoute from './routes/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();
app.use(express.json({ limit: '2mb' }));
app.use('/api/logger', loggerRoute);

// app.get('/', (req, res) => res.send('🌞 Logger API Running'));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
