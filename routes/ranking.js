const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");
const LolRanking = require("../Models/LolRanking.model.js");

const router = express.Router();



router.get("/", async(req, res) => {
    var tier;
    var rank;
    
    try {
        const posts = await Post.find();
        for (let pas = 0; pas < 1; pas++) {
            if(posts[0].LolTier=="IRON"){
                tier=27
            }
            else if(posts[0].LolTier=="BRONZE"){
                tier=23
            }
            else if(posts[0].LolTier=="SILVER"){
                tier=15
            }
            else if(posts[0].LolTier=="GOLD"){
                tier=11
            }
            else if(posts[0].LolTier=="PLATINIUM"){
                tier=7
            }
            else if(posts[0].LolTier=="DIAMOND"){
                tier=3
            }
            else if(posts[0].LolTier=="MASTER"){
                tier=2
            }
            else if(posts[0].LolTier=="GRANDMASTER"){
                tier=1
            }
            else if(posts[0].LolTier=="CHALLENGER"){
                tier=0
            }
            if(posts[0].LolRank=="I"){
                rank=1
            }
            else if(posts[0].LolRank=="II"){
                rank=2
            }
            else if(posts[0].LolRank=="III"){
                rank=3
            }
            else if(posts[0].LolRank=="IV"){
                rank=4
            }
            
            const lolRanking = new LolRanking({
                    LolPseudo: posts[0].LolPseudo,
                    LolGameRank: posts[0].LolRank,
                    LolGameTier: posts[0].LolTier,
                    LolOurRank: (rank+tier).toString()
                })
                console.log(lolRanking);
                try {
                    const savedPost = await lolRanking.save()
                    res.json(savedPost);
                    } catch(err){
                        res.json({message : err});
                    }
        }
    } catch (err){
        res.json({message : err});
    }



})


module.exports = router;