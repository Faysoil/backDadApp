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
      });

      await newProspect.save();
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
