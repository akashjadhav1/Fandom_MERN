const User = require('../models/user.model');

const addFavorites = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available on the request object
    const { movieId } = req.body; // Extract movieId from the request body

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const movieIdStr = String(movieId); // Ensure movieId is a string

        if (!user.favorites.includes(movieIdStr)) {
            user.favorites.push(movieIdStr);
            await user.save();
            res.status(200).send({ success: true, message: 'Movie added to favorites' });
        } else {
            res.status(200).send({ success: true, message: 'Movie already in favorites' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error adding movie to favorites', error: error.message });
    }
};

const getFavorites = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available on the request object

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const favorites = user.favorites || [];
        res.status(200).send({ success: true, favorites });
    } catch (error) {
        res.status (500).send({ success: false, message: 'Error fetching favorites', error: error.message });
    }
};

const removeFavorites = async (req, res) => {
    const userId = req.user._id;
    const { movieId } = req.body;



  

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const movieIdStr = String(movieId); // Ensure movieId is a string

       

        user.favorites = user.favorites.filter(fav => fav !== movieIdStr);

 

        await user.save();
        res.status(200).send({ success: true, message: 'Movie removed from favorites' });
    } catch (error) {
        
        res.status(500).send({ success: false, message: 'Error while removing movie from favorites', error: error.message });
    }
};




module.exports = { addFavorites, getFavorites, removeFavorites };
