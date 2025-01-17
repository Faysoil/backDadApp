const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtUtils');

// Inscription
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
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
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.generateToken(user._id);
    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email, trigram: user.trigram },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};