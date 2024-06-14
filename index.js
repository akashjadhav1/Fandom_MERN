const express = require('express'); 
const dotenv = require('dotenv');
const app = express();
const connectToDatabase = require("./src/config/db"); 
const cors = require('cors'); 
const userRouter = require('./src/routes/user.routes'); 
const cookieParser = require('cookie-parser');
const mediaRouter = require('./src/routes/media.routes');
const allDataRouter = require('./src/routes/allMedia.routes'); 

dotenv.config(); 
const PORT = process.env.PORT; 

// Middlewares
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.use("/api/user", userRouter); // Use the user routes for requests to /api/user
app.use("/api/trending", mediaRouter); // Use the media routes for requests to /api/trending
app.use("/api/all", allDataRouter); // Use the all data routes for requests to /api/all

// Root route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Fandom app"); // Send a welcome message for the root URL
});

// Start the server
app.listen(PORT, () => { 
    try {
        connectToDatabase(); // Connect to the database
        console.log("Server listening on port ", PORT); // Log a success message
    } catch (error) {
        console.log("Error on listening port", PORT); // Log an error message if there's an issue
    }
});
