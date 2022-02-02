const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");

// update

router.put("/:id", async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json(updatedUser);
        } catch {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("YOu can update only your account.");
    }
})

// delete

// get

// get all

// get user stats