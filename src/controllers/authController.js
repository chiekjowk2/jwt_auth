import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const authController = {
  signUp: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        console.error(err);
        
      res.status(500).json({ message: "Internal Server error here" });
    }
  },
    login: async (req, res) => {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            const payload = {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({ token} );
        }
        catch(err){
            res.status(500).json({ message: "Internal Server error" });
        }
    }
};
