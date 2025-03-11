import express, { Request, Response } from 'express';
import { getStopsByRoute, toggleStopCompletion } from '../controllers/routeStopController';

const router = express.Router();

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



export default router;
