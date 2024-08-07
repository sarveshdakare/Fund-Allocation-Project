

const jwt = require('jsonwebtoken');
const { jwt_token } = require('../Config');
// const User = require('../Db/index')
const { User} = require("../Db");

async function usermiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            msg: "A token is required for authentication"
        });
    }

    const word = token.split(" ");
    if (word.length !== 2) {
        return res.status(400).json({
            msg: "Invalid token format"
        });
    }

    const token1 = word[1];
console.log(token1)
    console.log(token1)

    try {
        const decodevalue = jwt.verify(token1, jwt_token);
        console.log(decodevalue)
        const user = await User.findById(decodevalue._id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        req.user = user;  // Attach the user object to the request
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error);
        res.status(401).json({
            msg: "Invalid Token"
        });
    }
}

module.exports = usermiddleware;
