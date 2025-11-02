import passport from "passport";
import express from "express";

const router = express.Router();

router.get("/google", passport.authenticate("google",  { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {session: false}) , (req, res) => {
    const {user ,token} = req.user;
    res.status(200).json({ msg: "Google google login successful", user, token});
})
export default router;
