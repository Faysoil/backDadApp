//authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Vérifier si l'utilisateur existe déjà
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Utilisateur déjà existant' });
//     }

//     // Hash du mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Créer un nouvel utilisateur
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'Utilisateur créé avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// };

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email reçu:', email);  // Log pour vérifier ce qui est envoyé

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Envoyer les informations de l'utilisateur et le token
    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: { 
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        trigram: user.trigram
      }
    });
  } catch (error) {
    console.log('Erreur serveur', error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
