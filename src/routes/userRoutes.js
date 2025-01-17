const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

// Route pour créer un utilisateur
router.post('/', createUser);

// Route pour lire tous les utilisateurs
router.get('/', getUsers);

// Route pour mettre à jour un utilisateur
router.put('/:id', updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', deleteUser);

module.exports = router;