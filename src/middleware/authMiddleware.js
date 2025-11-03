import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async(req, res, next) => {
    try{
        const authHeader = req.header("authorization");
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res
            .status(401)
            .json({ msg: "No token provided" });
        }
        const token = authHeader.split(" ")[1];

        if (!token) {
          return res
            .status(401)
            .json({ msg: "No token, authorization denied" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.tokenVersion !== verify.tokenVersion) {
          return res.status(401).json({ message: "Token expired or invalid" });
        }

        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json({ msg: "token is invalid" });
    }

}
