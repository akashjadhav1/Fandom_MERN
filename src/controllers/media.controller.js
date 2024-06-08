const TrendingData = require("../models/moviesData.model");

const AddTrendingMoviesAndTv = async (req, res) => {
    try {
        const {
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            media_type,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count,
        } = req.body;

        // Create the movie or TV show entry
        const movieData = {
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            media_type, 
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count,
        };

        const newEntry = await TrendingData.create(movieData);
        return res.status(201).send({ message: "Movie or TV show added successfully", data: newEntry });
    } catch (error) {
        return res.status(500).send({ message: "Error adding movies and TV shows", error: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await TrendingData.findByIdAndDelete(id);
  
      if (!data) {
        return res.status(404).send({ message: "data not found" });
      }
      return res.status(200).send({ message: "data deleted successfully" });
    } catch (error) {
      return res
        .status(404)
        .send({ message: "error while deleting data", error: error });
    }
  };

  const getTrendingData = async (req, res) => {
    try {
      const allEntries = await TrendingData.find();
      return res.status(200).send({ data: allEntries });
    } catch (error) {
      return res.status(500).send({
        message: "Error retrieving movies and TV shows",
        error: error.message,
      });
    }
  };


module.exports = { AddTrendingMoviesAndTv,deleteData,getTrendingData};
