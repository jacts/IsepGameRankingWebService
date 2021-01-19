const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");

const router = express.Router();
var flag = 0;

//submits the post in the database
router.post('/', async (req, res) => {
    console.log("new!")
    console.log(req.body);
    const post = new Post({
        name : req.body.name,
        mail: req.body.mail,
        prenom: req.body.prenom,
        password: req.body.password,
        LolPseudo : req.body.LolPseudo,
        steamId: req.body.steamID,
        discord: req.body.discord
    })
    
    console.log(post.prenom);
    console.log(post.name);
    console.log(post.mail);
    console.log(flag);
    try {
        const temp = await Post.find(); //Met dans la variable temp les informations qui vont etre lu dans la base de donnée mongoDB
        for (let pas = 0; pas < temp.length; pas++) {
            console.log(temp[pas].prenom);
            console.log(post.prenom);
            console.log(temp[pas].name);
            console.log(post.name);
            console.log(post.discord);
            console.log(temp[pas].discord);
            if(temp[pas].mail == post.mail){
                //change la valeur de flag pour indiquer ulterieurement qu'il n'y aura pas a sauvegarder les infos dans la base de données
                flag = 1;
                res.json({name :"mail"});
            }
            else if(temp[pas].name== post.name && temp[pas].prenom==post.prenom){
                
                flag = 2;
                res.json({name :"prenom"});
            }
            else if(temp[pas].LolPseudo == post.LolPseudo){
                flag = 3;
                res.json({name :"pseudolol"});
            }
            else if(temp[pas].steamId == post.steamId){
                flag = 4;
                res.json({name :"comptesteam"});
            }
            else if(temp[pas].discord == post.discord){
                flag = 5
                res.json({name : "discord"});
            }
        }
        
    } catch (err){
        console.log("mesfesses");
        console.log(err);
        res.json({message : err});
    }
    console.log(flag);
    if (flag == 0){
        res.json({name : "done"});
        console.log(post);
    try {
    const savedPost = await post.save()
    
    } catch(err){
        res.json({message : err});
    }
    }
    else{
        flag = 0;
    }
    
    
    
})





module.exports = router;