const jwt = require('jsonwebtoken');
const secret = "Kaushik@@$"; // Replace with your actual secret key
function setUser(user){
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    };
    return jwt.sign(payload,secret);
}

function getUser(userId){
    if(!userId) return null;
    try{
        return jwt.verify(userId,secret);
    }   
    catch(err){
        console.error("Token verification failed:", err.message);
        return null;
    }   
}

module.exports = {
    setUser,
    getUser
}