const {verifyToken} = require('../utilities/jwt')
const User = require('../models/user.model')



const authentication = async (req, res, next) => {
    try {
       const token = req.cookies.authToken;
       if (!token) {
        return res.status(401).send({message : "Unauthorized"})
       } 
       const decoded = verifyToken(token);
       const user = await User.findById(decoded.id);
       req.user = user;
       next();
    } catch (error) {
        return res.status(500).send({message : "Error in authorizing the user", error : error.message})
    }
}



module.exports = {authentication}