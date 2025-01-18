import express, { Request, Response } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Route pour créer un utilisateur
router.post('/', (req: Request, res: Response) => createUser(req, res));

// Route pour lire tous les utilisateurs
router.get('/', (req: Request, res: Response) => getUsers(req, res));

// Route pour mettre à jour un utilisateur
router.put('/:id', (req: Request, res: Response) => updateUser(req, res));

// Route pour supprimer un utilisateur
router.delete('/:id', (req: Request, res: Response) => deleteUser(req, res));

export default router;
