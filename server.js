import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';
import mongoose from 'mongoose';
import oauthRoutes from './src/routes/oauth.js';
import passport from './src/config/passport.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const PORT = process.env.PORT 

mongoose.connect(process.env.MONGO_URI,).then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});



app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
