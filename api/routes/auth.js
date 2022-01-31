const router = require("express").Router();
const User = require("../models/User");

// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch(err) {
        res.status(200).json(err)
    }
    
});

module.exports = router;