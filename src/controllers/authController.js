import bcrypt from "bcryptjs";
import User from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";

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
    login: async(req, res) => {
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
            const token = generateToken(user);
            
            res.status(200).json({ token} );
        }
        catch(err){
            res.status(500).json({ message: "Internal Server error" });
        }
    },

    logout: async(req, res) =>{
      try{

        req.user.tokenVersion += 1;
        await req.user.save();

        res.status(200).json({ msg: "Logged out successfully" });

      }
      catch(err){
        res.status(400).json({ message: "logout failed" });
      }
    }
    
};
