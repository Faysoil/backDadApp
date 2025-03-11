// controllers/csvController.ts
import { Request, Response } from 'express';
import CsvModel from '../models/CsvModel';

export const saveCSVData = async (req: Request, res: Response) => {
  try {
    console.log("Données reçues :", req.body);  // Ajout du log

    const { csvData } = req.body;
    if (!csvData || !Array.isArray(csvData)) {
      return res.status(400).json({ message: "Données CSV invalides" });
    }

    const insertedDocs = await CsvModel.insertMany(csvData);
    res.status(201).json({ message: "Données CSV enregistrées avec succès", data: insertedDocs });
  } catch (error) {
    console.error("Erreur de sauvegarde :", error);
    res.status(500).json({ message: "Erreur lors de la sauvegarde des données" });
  }
};


// Fonction pour récupérer les données CSV
export const getCSVData = async (req: Request, res: Response) => {
  try {
    const records = await CsvModel.find(); // Récupère toutes les entrées
    res.status(200).json(records);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
};
