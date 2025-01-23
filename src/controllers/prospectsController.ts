import { Request, Response } from 'express';
import { Prospect } from '../models/Prospect';

// GET /prospects
export const getProspects = async (req: Request, res: Response) => {
  try {
    const userId = req.body?._id // Accès correct au champ `userId`

    // if (!userId) {
    //   return res.status(401).json({ message: 'Utilisateur non authentifié' });
    // }

    const prospects = await Prospect.find({ userId });
    res.json(prospects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des prospects' });
  }
};


// POST /prospects
export const createProspect = async (req: Request, res: Response) => {
  try {
    const { name, managerName, address, phone, mail, website, sector, interest, action, comment, postalSector, appointmentDate, appointmentTime } = req.body;

    const userId = req.body?._id;
    // if (!userId) {
    //   return res.status(401).json({ message: 'Utilisateur non authentifié' });
    // }

    const newProspect = new Prospect({
      name,
      managerName,
      address,
      phone,
      mail,
      website,
      sector,
      interest,
      action,
      comment,
      postalSector,
      appointmentDate,
      appointmentTime,
      userId,
    });

    const savedProspect = await newProspect.save();
    res.status(201).json(savedProspect);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du prospect' });
  }
};

// DELETE /prospects/:id
export const deleteProspect = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body?._id;

    const prospect = await Prospect.findOneAndDelete({ _id: id, userId });
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect non trouvé ou non autorisé' });
    }

    res.json({ message: 'Prospect supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du prospect' });
  }
};

// PATCH /prospects/:id
export const updateProspect = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body?._id;

    // Les champs modifiables du prospect
    const updatedFields = req.body;

    // On vérifie que le prospect existe et que l'utilisateur a l'autorisation de le modifier
    const updatedProspect = await Prospect.findOneAndUpdate(
      { _id: id, userId }, // Vérifier que l'utilisateur peut modifier ce prospect
      updatedFields, // Mettre à jour uniquement les champs spécifiés dans la requête
      { new: true } // Retourner le prospect mis à jour
    );

    if (!updatedProspect) {
      return res.status(404).json({ message: 'Prospect non trouvé ou non autorisé' });
    }

    res.json(updatedProspect);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du prospect' });
  }
};
