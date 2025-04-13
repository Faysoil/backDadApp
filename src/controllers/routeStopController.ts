//controllers//routeStopController.ts
import { Request, Response } from 'express';
import RouteModel from '../models/RouteCsvModel';
import RouteStopModel from '../models/RouteStopModel';
import { Prospect } from '../models/Prospect';
import { Types } from 'mongoose';

export const getStopsByRoute = async (req: Request, res: Response) => {
  try {
    const { routeId } = req.params;

    const route = await RouteModel.findById(routeId).populate('stops');
    if (!route) {
      return res.status(404).json({ message: 'Route non trouvée' });
    }

    res.status(200).json(route.stops);
  } catch (error) {
    console.error('Erreur de récupération des stops :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des stops' });
  }
};

export const toggleStopCompletion = async (req: Request, res: Response) => {
  try {
    const { stopId, state } = req.params;
    const { userId } = req.body;
    const newState = state === "true";

    if (!userId) {
      return res.status(400).json({ message: "L'ID utilisateur est requis" });
    }

    const stop = await RouteStopModel.findById(stopId);
    if (!stop) {
      return res.status(404).json({ message: "Stop non trouvé" });
    }

    stop.completed = newState;
    stop.updatedBy = userId;
    await stop.save();

    if (newState) {
      let postalCode = "0000";
      let cityName = "Ville inconnue";

      const addressParts = stop.address?.match(/,\s*(\d{4,5})[, ]\s*([\w\s-]+)/);
      if (addressParts) {
        postalCode = addressParts[1];
        cityName = addressParts[2].trim();
      }    

      const newProspect = new Prospect({
        name: stop.name || "Nom inconnu",
        managerName: stop.managerName || "Non spécifié",
        address: stop.address,
        phone: stop.phone || "Non renseigné",
        mail: stop.email || "Non renseigné",
        website: "Non renseigné",
        sector: "",
        interest: "not_interested",
        action: "",
        postalSector: {
          code: postalCode,
          name: cityName
        },
        appointmentDate: null,
        appointmentTime: null,
        userId: userId,
        routeStopId: stop._id, // 🔥 On associe le prospect au stop ici
      });
      const savedProspect = await newProspect.save();

      // 🔥 Ajouter l'ID du prospect au stop
      stop.prospectId = savedProspect._id as Types.ObjectId;
      await stop.save();
    }

    res.status(200).json({ 
      message: `Stop marqué comme ${stop.completed ? "complété" : "non complété"}`, 
      stop 
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du stop :", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du stop" });
  }
};

// PATCH /stops/:id
export const updateRouteStop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // if (!Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: 'ID de l’arrêt invalide' });
    // }

    // Vérifier si l'arrêt existe
    const existingStop = await RouteStopModel.findById(id);
    if (!existingStop) {
      return res.status(404).json({ message: 'Arrêt non trouvé' });
    }

    // Mise à jour de l'arrêt
    const updatedStop = await RouteStopModel.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // Si l'arrêt est lié à un prospect, mettre à jour les champs équivalents
    if (existingStop.prospectId) {
      await Prospect.findByIdAndUpdate(
        existingStop.prospectId,
        { 
          name: updatedStop?.name,
          address: updatedStop?.address,
          phone: updatedStop?.phone,
          managerName: updatedStop?.managerName,
          mail: updatedStop?.email,
          interest: updatedStop?.interest,
          appointmentDate: updatedStop?.appointmentDate,
          appointmentTime: updatedStop?.appointmentTime,
        },
        { new: true }
      );
    }

    res.json(updatedStop);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’arrêt :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l’arrêt' });
  }
};

export const getStopById = async (req: Request, res: Response) => {
  try {
    const { stopId } = req.params;

    const stop = await RouteStopModel.findById(stopId);
    if (!stop) {
      return res.status(404).json({ message: "Stop non trouvé" });
    }

    res.status(200).json(stop);
  } catch (error) {
    console.error("Erreur lors de la récupération du stop :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du stop" });
  }
};

export const optimization = async (req: Request, res: Response) => {
  try {
    const { routeId } = req.params;

    // Trouver la route et récupérer les stops
    const route = await RouteModel.findById(routeId);
    if (!route || !route.stops || route.stops.length === 0) {
      return res.status(404).json({ message: "Aucun arrêt trouvé pour cette route" });
    }

    // Mettre à jour tous les stops associés à cette route
    const updatedStops = await RouteStopModel.updateMany(
      { _id: { $in: route.stops } }, // Filtrer par les IDs des stops de la route
      { $set: { isOptimized: true } }
    );

    const updatedRoute = await RouteModel.updateOne(
      { _id: { $in: route } }, // Filtrer par les IDs des stops de la route
      { $set: { isOptimized: true } }
    );

    res.status(200).json({
      message: `Tous les stops de la route ${routeId} ont été optimisés.`,
      updatedRoute,
    });

  } catch (error) {
    console.error("Erreur lors de l'optimisation des stops :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'optimisation des stops" });
  }
};


export const getAllStop = async (req: Request, res: Response) => {
  try {
    // Récupérer tous les arrêts
    const stops = await RouteStopModel.find();

    // Renvoi des arrêts récupérés
    res.status(200).json(stops);
  } catch (error) {
    console.error('Erreur de récupération des stops :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des stops' });
  }
};
