const express = require('express');

const {AddTrendingMoviesAndTv, deleteData, getTrendingData} = require('../controllers/media.controller')


const mediaRouter = express.Router();
// send movies to api

mediaRouter.post('/data',AddTrendingMoviesAndTv);
mediaRouter.delete('/:id',deleteData);
mediaRouter.get('/data',getTrendingData);






module.exports = mediaRouter;