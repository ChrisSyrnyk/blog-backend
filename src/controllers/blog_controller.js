const BlogPost = require('../models/blog_post_model');
const jwt = require('jsonwebtoken');

exports.createBlogPost = async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
       if(err){
        res.sendStatus(403);
       } else {
            if(authData.type == 'admin'){
                const {title, content, created} = req.body;
                try{
                    const blog = await BlogPost.create({
                        title,
                        content,
                        created,
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