const express = require("express");

const router = express.Router();
const Post = require("../Models/User.model.js");

//get back all the posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err){
        res.json({message : err});
    }
})



//submits the post
router.post('/', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        general : {
        name : req.body.name,
        mail: req.body.mail
        }
    })
    console.log(post);
    try {
    const savedPost = await post.save()
    res.json(savedPost);
    } catch(err){
        res.json({message : err});
    }
    
    
})

module.exports = router;