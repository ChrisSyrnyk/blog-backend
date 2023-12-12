const Comment = require('../models/comment_model');
const User = require('../models/user_model');
const BlogPost = require('../models/blog_post_model');
const jwt = require('jsonwebtoken');

exports.createComment = async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
       if(err){
        res.sendStatus(403);
       } else {
            if(authData.type == 'admin' || authData.type == 'user'){
                const {content, created, blogPostId} = req.body;
                const user = await User.findById(authData.id);
                const blog_post = await BlogPost.findById(blogPostId);

                try{
                    const comment = await Comment.create({
                        content,
                        created,
                        user,
                        blog_post,
                    })
                    res.status(200).json({comment});
                } catch(error){
                    res.status(500).json({message: error});
                }
            } else {
                //Forbidden
                res.sendStatus(403);
            }
       }
    });
} 