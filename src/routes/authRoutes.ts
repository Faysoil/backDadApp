import express, { Request, Response } from 'express';
import { register, login } from '../controllers/authControllers'

const router = express.Router();

// Routes d'authentification
router.post('/register', (req: Request, res: Response) => register(req, res));
router.post('/login', (req: Request, res: Response) => login(req, res));

export default router;
