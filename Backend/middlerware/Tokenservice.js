const jwt = require('jsonwebtoken');
const { jwt_token } = require('../Config');

function generateToken(user) {
    const payload = {
        _id: user._id,  // Ensure _id is included in the payload
        username: user.username
    };
    return jwt.sign(payload, jwt_token, { expiresIn: '1h' });  // Adjust expiration time as needed
}
