import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        {id: user._id , email: user.email , tokenVersion: user.tokenVersion}
        , process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}
