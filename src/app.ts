// utils/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';
import prospectRoutes from './routes/prospectsRoutes';
import csvRoutes from './routes/csvRoutes';
import routeCsvRoutes from './routes/routeCsvRoutes';
import routeStopRoutes from './routes/routeStopRoutes';

const app: Application = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/prospects', prospectRoutes);
app.use('/api/csv', csvRoutes);
app.use('/api/routeCsv', routeCsvRoutes);
app.use('/api/stops', routeStopRoutes);

export default app;
