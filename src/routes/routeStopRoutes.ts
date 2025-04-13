import express, { Request, Response } from 'express';
import { getStopsByRoute, toggleStopCompletion, updateRouteStop, getStopById, optimization, getAllStop } from '../controllers/routeStopController';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await getAllStop(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des prospects' });
  }
});

router.get('/route/:routeId', async (req: Request, res: Response) => {
  try {
    await getStopsByRoute(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des prospects' });
  }
});

router.patch("/:stopId/:state", async (req: Request, res: Response) => {
  try {
    await toggleStopCompletion(req, res);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du stop" });
  }
});

router.patch("/:stopId/", async (req: Request, res: Response) => {
  try {
    await updateRouteStop(req, res);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du stop" });
  }
});

router.get('/:stopId', async (req: Request, res: Response) => {
  try {
    await getStopById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des prospects' });
  }
});

// Ajout de la route pour optimiser les stops d'une route
router.patch('/route/:routeId/optimize', async (req: Request, res: Response) => {
  try {
    await optimization(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'optimisation des stops' });
  }
});

export default router;
