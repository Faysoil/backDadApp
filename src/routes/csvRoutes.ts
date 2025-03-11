// routes/csvRoutes.ts
import express, { Request, Response } from 'express';
import { saveCSVData, getCSVData } from '../controllers/csvController';
const router = express.Router();

router.post('/upload', async (req: Request, res: Response) => {
  try {
    await saveCSVData(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du csv' });
  }
});

router.get('/', async (req: Request, res: Response) => getCSVData(req, res));

export default router;
