const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");

const router = express.Router();


console.log("buya");
//submits the post in the database
router.post('/', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        name : req.body.name,
        mail: req.body.mail,
        prenom: req.body.prenom,
        password: req.body.password,
        LolPseudo : req.body.LolPseudo,
        steamId: req.body.steamID
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