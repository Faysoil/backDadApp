import dotenv from 'dotenv';
import app from './src/app';

// Chargement des variables d'environnement
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
