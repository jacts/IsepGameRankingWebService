const express = require("express");

const router = express.Router();
const Post = require("../Models/User.model.js");





//submits the post
router.post('/', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        mail : req.body.mail,
        password : req.body.password
    })
    console.log(post);

    try {
        const temp = await Post.find({mail : post.mail}); 
        console.log(temp);
        if(temp[0] == null){
            console.log("cbonb");
            res.json({name : "mauvaismail"});
        }
        else{
            console.log(temp[0].mail);
            console.log(temp[0].password);
        
            if (temp[0].password == post.password){
            console.log("ca match");
            res.json({name: temp[0].name});
        }
            else{
            console.log("camatchpas");
            res.json({name : "mauvaispassword"});
        }
        }
        
    } catch (err){
        console.log("mesfesses");
        console.log(err);
        res.json({message : err});
    }
    
    
    
})

module.exports = router;