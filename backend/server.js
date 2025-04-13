import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth-route.js';

dotenv.config();
const app = express();

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('Server started');
});
