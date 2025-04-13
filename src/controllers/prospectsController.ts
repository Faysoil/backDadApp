// controller/prospectController.ts
import { Request, Response } from 'express';
import { Prospect } from '../models/Prospect';
import RouteStopModel from '../models/RouteStopModel';
import { Types } from 'mongoose'; 

// GET /prospects
// controller/prospectController.ts

export const getProspects = async (req: Request, res: Response) => {
  try {
    // Recherche de tous les prospects sans condition particulière
    const prospects = await Prospect.find();

    if (!prospects || prospects.length === 0) {
      return res.status(404).json({ message: 'Aucun prospect trouvé' });
    }

    res.json(prospects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des prospects' });
  }
};



// POST /prospects
export const createProspect = async (req: Request, res: Response) => {
  try {
    const { name, managerName, address, phone, mail, website, sector, interest, action, comment, postalSector, appointmentDate, appointmentTime, userId, routeStopId } = req.body;

    // Conversion de `userId` en ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'userId invalide' });
    }
    
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
      routeStopId, // 🔥 On lie le prospect au stop ici
      userId: new Types.ObjectId(userId),  // Conversion ici
    });

    const savedProspect = await newProspect.save();
    res.status(201).json(savedProspect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du prospect' });
  }
};

// DELETE /prospects/:id
export const deleteProspect = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //const userId = req.body?._id;

    const prospect = await Prospect.findOneAndDelete({ _id: id });
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
    const userId = req.body?.userId;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID prospect invalide' });
    }

    // Vérifier si le prospect existe
    const existingProspect = await Prospect.findOne({ _id: id, userId });
    if (!existingProspect) {
      return res.status(404).json({ message: 'Prospect non trouvé ou non autorisé' });
    }

    // Mise à jour du prospect
    const updatedProspect = await Prospect.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // Si le prospect a un routeStopId, mettre à jour le stop correspondant
    if (existingProspect.routeStopId) {
      console.log('Route Stop ID:', updatedProspect?.routeStopId);
      await RouteStopModel.findByIdAndUpdate(
        existingProspect.routeStopId,
        { 
          name: updatedProspect?.name,
          address: updatedProspect?.address,
          phone: updatedProspect?.phone,
          email: updatedProspect?.mail, 
        },
        { new: true }
      );
    }

    res.json(updatedProspect);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prospect :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du prospect' });
  }
};