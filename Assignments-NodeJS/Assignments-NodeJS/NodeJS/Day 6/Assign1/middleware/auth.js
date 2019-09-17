const jwt = require('jsonwebtoken');
const config = require('config');

const auth = function(req,res,next){
    
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Please provide auth token");
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(401).send("Invalid token");
    }   
}
module.exports = auth;