const User = require('./user_model');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    created: {type: Date, required: true},
    user: {type: Schema.type.ObjectId, ref: "User", required: true},
});

//Export model
module.exports = mongoose.model("BlogPost", BlogPostSchema);