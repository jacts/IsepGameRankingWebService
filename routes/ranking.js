const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");
const Ranking = require("../Models/Ranking.Model.js");
const { deleteMany } = require("../Models/User.model.js");

const router = express.Router();



router.post("/lol", async(req, res) => {
    var tier = 0;
    var rank = 150;
    var array = [];
    
    try {
        const posts = await Post.find();
        for (let pas = 0; pas < posts.length; pas++) {
            if(posts[pas].LolRank=="unranked"){
                tier=32
            }
            if(posts[pas].LolTier=="IRON"){
                tier=27
            }
            else if(posts[pas].LolTier=="BRONZE"){
                tier=23
            }
            else if(posts[pas].LolTier=="SILVER"){
                tier=15
            }
            else if(posts[pas].LolTier=="GOLD"){
                tier=11
            }
            else if(posts[pas].LolTier=="PLATINUM"){
                tier=7
            }
            else if(posts[pas].LolTier=="DIAMOND"){
                tier=3
            }
            else if(posts[pas].LolTier=="MASTER"){
                tier=2
            }
            else if(posts[pas].LolTier=="GRANDMASTER"){
                tier=1
            }
            else if(posts[pas].LolTier=="CHALLENGER"){
                tier=0
            }
            if(posts[pas].LolRank=="I"){
                rank=1
            }
            else if(posts[pas].LolRank=="II"){
                rank=2
            }
            else if(posts[pas].LolRank=="III"){
                rank=3
            }
            else if(posts[pas].LolRank=="IV"){
                rank=4
            }
            
            const lolRanking = new Ranking({
                    LolPseudo: posts[pas].LolPseudo,
                    LolGameRank: posts[pas].LolRank,
                    LolGameTier: posts[pas].LolTier,
                    LolOurRank: (rank+tier).toString()
                })
                try {
                    //const deleted = await deleteMany();
                    //console.log(deleted);
                    const savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {LolOurRank: (rank+tier).toString()});
                   
                    //const savedPost = await lolRanking.save()
                    array.push(savedPost);
                    } catch(err){
                        res.json({message : err});
                    }
        }
        //res.json(array);
    } catch (err){
        res.json({message : err});
    }



})

router.get("/lol", async(req, res) => {
    try {
        const rank = await Ranking.find();
        res.json(rank);
    } catch (err){
        res.json({message : err});
    }


})



router.post("/CSGo", async(req, res) => {
    var pourcVictory;
    var rank=150;
    var array = [];
   
    
    try {
        const posts = await Post.find();
        for (let pas = 0; pas < posts.length; pas++) {
            console.log(posts[pas].CSGoRank.toUpperCase());
            if(posts[pas].CSGoRank.toUpperCase()=="SILVER I"){
                rank=18
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="SILVER II"){
                rank=17
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="SILVER III"){
                rank=16
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="SILVER IV"){
                rank=15
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="SILVER ELITE"){
                rank=14
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="SILVER ELITE MASTER"){
                rank=13
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="GOLD NOVA I"){
                rank=12
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="GOLD NOVA II"){
                rank=11
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="GOLD NOVA III"){
                rank=10
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="GOLD NOVA MASTER"){
                rank=9
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="MASTER GUARDIAN I"){
                rank=8
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="MASTER GUARDIAN II"){
                rank=7
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="MASTER GUARDIAN ELITE"){
                rank=6
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="DISTINGUISHED MASTER GUARDIAN"){
                rank=5
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="LEGENDARY EAGLE"){
                rank=4
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="LEGENDARY EAGLE MASTER"){
                rank=3
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="SUPREME MASTER FIRST CLASS"){
                rank=2
            }
            else if(posts[pas].CSGoRank.toUpperCase()=="THE GLOBAL ELITE"){
                rank=1
            }
            else{
                rank=128
            }

            console.log("yghjniuui")
            
                try {
                    
                    var savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {CSGoOurRank: rank.toString()});
                    savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {name: posts[pas].name});
                    savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {CSGoGameRank: posts[pas].CSGoRank});
                    
                    array.push(savedPost);
                    } catch(err){
                        res.json({message : err});
                    }
        }
        
    } catch (err){
        res.json({message : err});
    }



})


router.get("/CSGo", async(req, res) => {
    try {
        const rank = await Ranking.find();
        res.json(rank);
    } catch (err){
        res.json({message : err});
    }


})



router.post("/RL", async(req, res) => {
    var pourcVictory;
    var rank = 150;
    var rank3v3;
    var division;
    var array = [];
    console.log("coucou on est dans rocket league");
    
    try {
        const posts = await Post.find();
        for (let pas = 0; pas < posts.length; pas++) {
            const arr = posts[pas].RL3v3.split(" ");
            console.log(posts.length);
            if(arr[0]=="Unranked"){
                rank=23
            }
            else if((arr[0]+" "+ arr[1])=="Bronze I"){
                rank=22
            }
            else if((arr[0]+" "+ arr[1])=="Bronze II"){
                rank=21
            }
            else if((arr[0]+" "+ arr[1])=="Bronze III"){
                rank=20
            }
            else if((arr[0]+" "+ arr[1])=="Silver I"){
                rank=19
            }
            else if((arr[0]+" "+ arr[1])=="Silver II"){
                rank=18
            }
            else if((arr[0]+" "+ arr[1])=="Silver III"){
                rank=17
            }
            else if((arr[0]+" "+ arr[1])=="Gold I"){
                rank=16
            }
            else if((arr[0]+" "+ arr[1])=="Gold II"){
                rank=15
            }
            else if((arr[0]+" "+ arr[1])=="Gold III"){
                rank=14
            }
            else if((arr[0]+" "+ arr[1])=="Platinum I"){
                rank=13
            }
            else if((arr[0]+" "+ arr[1])=="Platinum II"){
                rank=12
            }
            else if((arr[0]+" "+ arr[1])=="Platinum III"){
                rank=11
            }
            else if((arr[0]+" "+ arr[1])=="Diamond I"){
                rank=10
            }
            else if((arr[0]+" "+ arr[1])=="Diamond II"){
                rank=9
            }
            else if((arr[0]+" "+ arr[1])=="Diamond III"){
                rank=8
            }
            else if((arr[0]+" "+ arr[1])=="Champion I"){
                rank=7
            }
            else if((arr[0]+" "+ arr[1])=="Champion II"){
                rank=6
            }
            else if((arr[0]+" "+ arr[1])=="Champion III"){
                rank=5
            }
            else if((arr[0]+" "+ arr[1])=="Grand Champion"){
                rank=4
            }
            else if((arr[0]+" "+ arr[1])=="Grand Champion II"){
                rank=3
            }
            else if((arr[0]+" "+ arr[1])=="Grand Champion III"){
                rank=2
            }
            else if((arr[0]+" "+ arr[1])=="Supersonic Legend"){
                rank=1
            }
            else{
                rank=127
            }
            
            
                try {
                    
                    var savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {RLOurRank: rank.toString()});
                    savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {name: posts[pas].name});
                    savedPost = await Ranking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {RLGameRank: posts[pas].RL3v3});
                   console.log(savedPost);
                    
                    array.push(savedPost);
                    } catch(err){
                        res.json({message : err});
                    }
        }
        
    } catch (err){
        res.json({message : err});
    }



})


router.get("/RL", async(req, res) => {
    try {
        const rank = await Ranking.find();
        res.json(rank);
    } catch (err){
        res.json({message : err});
    }


})




module.exports = router;