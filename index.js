const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectToDatabase = require("./src/config/db")
const cors = require('cors')
const userRouter = require('./src/routes/user.routes');
const cookieParser = require('cookie-parser');
const mediaRouter = require('./src/routes/media.routes');
const allDataRouter = require('./src/routes/allMedia.routes');

dotenv.config();
const PORT = process.env.PORT 

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Routes
app.use("/api/user", userRouter);
app.use("/api/trending",mediaRouter);
app.use("/api/all",allDataRouter);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Fandom app")
})


app.listen(PORT,()=>{ 
    try {
        connectToDatabase();
        console.log("Server listening on port ",PORT);
    } catch (error) {
        console.log("error on listening port",PORT)
    }
})

