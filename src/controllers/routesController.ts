import { Request, Response } from "express";
import Route from "../models/Route";

// Créer une route
export const createRoute = async (req: Request, res: Response) => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ message: "Failed to create route", error });
  }
};

// Récupérer toutes les routes
export const getRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch routes", error });
  }
};

// Supprimer une route
export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Route.findByIdAndDelete(id);
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete route", error });
  }
};
