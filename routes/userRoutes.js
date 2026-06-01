const express = require('express');
const router = express.Router();

// Import the controller functions we created in the previous step
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// Map the HTTP methods and endpoints to the controller functions

// Route for dealing with all users
router.route('/')
    .post(createUser)    // POST /api/users - Creates a new user
    .get(getAllUsers);   // GET /api/users - Retrieves all users

// Route for dealing with a specific user by their ID
router.route('/:id')
    .get(getUserById)    // GET /api/users/:id - Retrieves one user
    .put(updateUser)     // PUT /api/users/:id - Updates a user's details
    .delete(deleteUser); // DELETE /api/users/:id - Deletes a user

module.exports = router;