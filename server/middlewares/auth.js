const jwt = require('jsonwebtoken');

const User = require("../models/User");

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        // token taking
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (error,payload) => {
            try{
                if(error) {
                    return res.status(401).json({error:"Unauthorised"});
                }
                const user = await User.findOne({_id:payload._id}).select("-password");
                req.user = user;
                next();
            } catch (error) {
                return res.status(403).json({error:"Forbidden"});
            }
        })
    }
}