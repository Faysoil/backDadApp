//authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwtUtils from '../utils/jwtUtils';

// Inscription
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Utilisateur déjà existant' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Connexion
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Mot de passe incorrect' });
      return;
    }

    const token = jwtUtils.generateToken(user._id!.toString());
    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { _id: user._id, userId: user.userId, firstName: user.firstName, lastName: user.lastName, email: user.email, trigram: user.trigram },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
