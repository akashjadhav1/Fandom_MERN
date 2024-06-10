const User = require('../models/user.model');

const addFavorites = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available on the request object
    const { movieId } = req.body; // Extract movieId from the request body

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        // Ensure movieId is valid before adding to favorites
        // Add your validation logic here if necessary

        if (!user.favourites) {
            user.favourites = [];
        }

        if (!user.favourites.includes(movieId)) {
            user.favourites.push(movieId);
            await user.save();
            res.status(200).send({ success: true, message: 'Movie added to favorites' });
        } else {
            res.status(200).send({ success: true, message: 'Movie already in favorites' });
        }
    } catch (error) {
        // Handle errors with a centralized error handling middleware
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

        const favorites = user.favourites || [];
        res.status(200).send({ success: true, favorites });
    } catch (error) {
        // Handle errors with a centralized error handling middleware
        res.status(500).send({ success: false, message: 'Error fetching favorites', error: error.message });
    }
};

module.exports = { addFavorites, getFavorites };
