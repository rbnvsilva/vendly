import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth-route.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started');
});
