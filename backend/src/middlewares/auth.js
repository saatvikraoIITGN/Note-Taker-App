const jwt = require('jsonwebtoken'); 

const User = require('../models/user.js'); 

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.NOTER_JWT_SECRET);
        const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token }); 

        if (!user) {
            throw new Error(); 
        }

        req.token = token;
        req.user = user; 
        next();
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate' });
    }
}

module.exports = auth; 