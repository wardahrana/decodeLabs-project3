// 1. Import required external modules
const express = require('express');
require('dotenv').config(); // Loads environment variables from your .env file

// 2. Import internal modules based on your folder structure
const connectDB = require('./db/connection');
const userRoutes = require('./routes/userRoutes');

// 3. Initialize the Express application
const app = express();

// 4. Connect to the MongoDB database
connectDB();

// 5. Middleware to parse incoming JSON request bodies
app.use(express.json());

// 6. Mount the user routes onto a specific base URL path
app.use('/api/users', userRoutes);

// 7. Define a generic fallback route for testing server availability
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is up and running smoothly!' });
});

// 8. Define the network port and start listening for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening and running on port ${PORT}...`);
});