// routes/routeCsvRoutes.ts
import express, { Request, Response } from 'express';
import { importRouteData, getRouteCSVData, deleteRoute, getRouteById } from '../controllers/routeCsvController';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    await importRouteData(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la route' });
  }
});

router.get('/', async (req: Request, res: Response) => getRouteCSVData(req, res));

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await getRouteById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche de la route et de ses stops' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteRoute(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la supression de la route et de ses stops' });
  }
});

export default router;
