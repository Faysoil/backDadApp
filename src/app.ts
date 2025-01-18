import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

const app: Application = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
