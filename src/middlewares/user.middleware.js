const { verifyToken } = require('../utilities/jwt');
const User = require('../models/user.model');

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).send({ message: 'Unauthorized: No token provided' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).send({ message: 'Unauthorized: Invalid token' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).send({ message: 'Error in authorizing the user', error: error.message });
    }
};

module.exports = { authentication };
