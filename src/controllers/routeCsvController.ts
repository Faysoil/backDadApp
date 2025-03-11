import { Request, Response } from 'express';
import RouteModel from '../models/RouteCsvModel';
import RouteStopModel from '../models/RouteStopModel';

// Fonction pour importer une route et ses stops
export const importRouteData = async (req: Request, res: Response) => {
  try {
    const { name, sector, stops, isOptimized } = req.body;

    if (!name || !Array.isArray(stops)) {
      return res.status(400).json({ message: 'Données invalides' });
    }

    // 1️⃣ Créer les stops et récupérer leurs IDs
    const createdStops = await RouteStopModel.insertMany(stops);
    const stopIds = createdStops.map(stop => stop._id); // Récupération des ObjectId des stops créés

    // 2️⃣ Créer la route avec les IDs des stops
    const newRoute = new RouteModel({
      name,
      sector,
      stops: stopIds,
      isOptimized
    });

    // 3️⃣ Sauvegarde de la route
    await newRoute.save();

    res.status(201).json({ message: 'Route et stops importés avec succès', data: newRoute });
  } catch (error) {
    console.error('Erreur d\'importation des routes :', error);
    res.status(500).json({ message: 'Erreur lors de l\'importation des données' });
  }
};

// Fonction pour récupérer toutes les routes et leurs stops
export const getRouteCSVData = async (_req: Request, res: Response) => {
  try {
    const routes = await RouteModel.find().populate('stops'); // Récupération des stops liés
    res.status(200).json(routes);
  } catch (error) {
    console.error('Erreur de récupération des routes :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
};

export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Trouver la route
    const route = await RouteModel.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route non trouvée' });
    }

    // Supprimer tous les stops liés à cette route
    await RouteStopModel.deleteMany({ _id: { $in: route.stops } });

    // Supprimer la route
    await RouteModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Route et stops supprimés avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const getRouteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Trouver la route et peupler les stops associés
    const route = await RouteModel.findById(id).populate('stops');

    if (!route) {
      return res.status(404).json({ message: 'Route non trouvée' });
    }

    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};