const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const verify = require("../verifyToken")

// update

router.put("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body
                },
                {
                    new: true
                }
                );
            res.status(200).json(updatedUser);
        } catch {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account.");
    }
})


// delete
router.delete("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
        } catch {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account.");
    }
})


// get
router.get("/find/:id", async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc;
            res.status(200).json(info);
        } catch {
            res.status(500).json(err);
        }
    } 
)

// get all

// get user stats


module.exports = router