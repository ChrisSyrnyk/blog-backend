
const User = require('./user_model');
const BlogPost = require('./blog_post_model');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {type: String, required: true},
    created: {type: Date, required: true},
    user: {type: Schema.type.ObjectId, ref: "User", required: true},
    blog_post: {type: Schema.type.ObjectId, ref: "BlogPost", required: true},
});

//Export module
module.exports =  mongoose.model("Comment", CommentSchema);