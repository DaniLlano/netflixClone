const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
        title: {type: String, required: true, unique: true},
        type: {type: String},
        genre: {type: String},
        content: {type: array}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Movie", MovieSchema);