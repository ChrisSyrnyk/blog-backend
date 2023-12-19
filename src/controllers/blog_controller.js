const BlogPost = require('../models/blog_post_model');
const User = require('../models/user_model');
const Comment = require('../models/comment_model');
const jwt = require('jsonwebtoken');

exports.createBlogPost = async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
       if(err){
        res.sendStatus(403);
       } else {
            if(authData.type == 'admin'){
                const {title, content, created} = req.body;
                const user = await User.findById(authData.id);
                try{
                    const blog = await BlogPost.create({
                        title,
                        content,
                        created,
                        user,
                    })
                    console.log(blog);
                    res.status(200).json({blog});
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

exports.getBlogPost = async (req, res) => {
    console.log(req.params.BlogPostId)
    const blog_post = await BlogPost.findById(req.params.BlogPostId).populate('user');
    const comments = await Comment.find({blog_post: req.params.BlogPostId}).populate('user');
    console.log(blog_post);
    if(blog_post === null){
        //No results
        res.status(500).json({message: 'No results'});
    } else {
        res.json({blog_post, comments});
    }
}


exports.getBlogPosts = async ( req, res) => {
    const blog_posts = await BlogPost.find().populate('user');
    if(blog_posts === null){
        //No results
        res.status(500).json({message: 'No results'})
    } else {
	console.log('ran');
        res.json(blog_posts);
    }
}
