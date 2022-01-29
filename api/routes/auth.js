const router = require("express").Router();
const User = require("../models/User");

// register
router.post("/register", (req, res) => {
    const newUser = new User({
        username: req.body.username
    })
})