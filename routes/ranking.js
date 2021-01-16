const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");
const LolRanking = require("../Models/LolRanking.model.js");
const { deleteMany } = require("../Models/User.model.js");

const router = express.Router();



router.post("/", async(req, res) => {
    var tier;
    var rank;
    var array = [];
    
    try {
        const posts = await Post.find();
        for (let pas = 0; pas < posts.length; pas++) {
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
            
            const lolRanking = new LolRanking({
                    LolPseudo: posts[pas].LolPseudo,
                    LolGameRank: posts[pas].LolRank,
                    LolGameTier: posts[pas].LolTier,
                    LolOurRank: (rank+tier).toString()
                })
                try {
                    //const deleted = await deleteMany();
                    //console.log(deleted);
                    const savedPost = await LolRanking.findOneAndUpdate({LolPseudo:posts[pas].LolPseudo}, {LolOurRank: (rank+tier).toString()});
                   
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

router.get("/", async(req, res) => {
    try {
        const rank = await LolRanking.find();
        res.json(rank);
    } catch (err){
        res.json({message : err});
    }


})




module.exports = router;