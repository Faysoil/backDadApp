import express, { Request, Response } from 'express';
import { getProspects, createProspect, deleteProspect, updateProspect } from '../controllers/prospectsController';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await getProspects(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des prospects' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await createProspect(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du prospect' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    await updateProspect(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du prospect' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteProspect(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du prospect' });
  }
});

export default router;
