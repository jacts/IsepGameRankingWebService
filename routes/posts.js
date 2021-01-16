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

router.get("/names", async (req, res) => {
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
        name : req.body.name,
        mail: req.body.mail,
        LolPseudo : null,
        LolId : null,
        CSGoId: null
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