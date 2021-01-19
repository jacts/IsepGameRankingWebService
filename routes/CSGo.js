const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const router = express.Router();
const Post = require("../Models/User.model.js");

router.post("/", async (req, res) => {
    var id = req.body.CSGoId;

    try {
        var savedPost = await Post.findOneAndUpdate({name:req.body.name}, {CSGoId: id});
        } catch(err){
            console.log(err);
            res.json({message : err});
        }

        var URL ="https://csgo-stats.com/player/" + id;
        request(URL, async(error, response, html) => {
            if(!error && response.statusCode == 200){
                const $ = cheerio.load(html);
        
                const pourc_win =$("#main-stats-win-percentage").parent().parent().children("div")
                .next().children("span").next();
                const headshot =$("#main-stats-headshot-percentage").parent().parent().children("div")
                .next().children("span").next();
                const kills =$("#main-stats-kills").parent().parent().children("div").next().children("span").next();
                const death = $("#other-stats-deaths").parent().next().children("p");
                const rank =$(".rank-name");


                if(rank.html() == null){
                    console.log("pas de rank");
                    var second_savedPost = await Post.findOneAndUpdate({steamId:id}, {CSGoRank: "not ranked"});
                }
                else{
        
                console.log(kills.html());
                var second_savedPost = await Post.findOneAndUpdate({CSGoId:id}, {CSGoWinPourc: pourc_win.html()});
                second_savedPost = await Post.findOneAndUpdate({CSGoId:id}, {CSGoHeadShot: headshot.html()});
                second_savedPost = await Post.findOneAndUpdate({CSGoId:id}, {CSGoKills: kills.html()});
                second_savedPost = await Post.findOneAndUpdate({CSGoId:id}, {CSGoDeaths: death.html()});
                second_savedPost = await Post.findOneAndUpdate({CSGoId:id}, {CSGoRank: rank.html()});
                }

                console.log("done for csgo");

                
        
            }
        
        });
    
})


router.get("/:pseudo", async(req, res) => {
    try {
        const posts = await Post.find({LolPseudo:req.params.pseudo});
        res.json(posts[0]);
    } catch (err){
        res.json({message : err});
    }

})




module.exports = router;