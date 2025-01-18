import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur', error });
  }
};
