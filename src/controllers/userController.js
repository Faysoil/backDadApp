const User = require('../models/User');

// CREATE - Ajouter un utilisateur
const createUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur', error });
    }
  };

// READ - Lire tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};

// UPDATE - Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
  }
};

// DELETE - Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur', error });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
