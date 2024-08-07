

const jwt = require('jsonwebtoken');
const { jwt_token } = require('../Config');

const { Admin} = require("../Db");


const adminmiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwt_token);
        console.log(decoded)
        const userId = decoded._id; 
        const user = await Admin.find({ _id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = adminmiddleware;


