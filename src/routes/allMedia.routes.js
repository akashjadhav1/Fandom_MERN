const { addAllMediaData,getAllMediaData } = require("../controllers/allData.controller");

const express = require('express');


const allDataRouter = express.Router();


allDataRouter.post("/data",addAllMediaData);
allDataRouter.get("/data",getAllMediaData);



module.exports = allDataRouter;