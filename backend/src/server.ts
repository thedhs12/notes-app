import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
