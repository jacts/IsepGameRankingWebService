const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const router = express.Router();
const Post = require("../Models/User.model.js");

router.post("/", async (req, res) => {
    var id = req.body.RLId;

    try {
        var savedPost = await Post.findOneAndUpdate({name:req.body.name}, {RLId: id});
        } catch(err){
            console.log(err);
            res.json({message : err});
        }

        var URL ="https://rocketleague.tracker.network/rocket-league/profile/steam/" + id +"/overview";
        request(URL, async(error, response, html) => {
            if(!error && response.statusCode == 200){
                const $ = cheerio.load(html);
        
                const ranked3v3 =$(".trn-table").children("tbody").children("tr").next().children(".name").children(".rank");
                const ranked2v2 =$(".trn-table").children("tbody").children("tr").next().next().children(".name").children(".rank");
                const rating3v3 =$(".trn-table").children("tbody").children("tr").next().children(".rating").children(".wrapper").children("div").next()
                .children("div").children(".value");
                const rating2v2 = $(".trn-table").children("tbody").children("tr").next().next().children(".rating").children(".wrapper").children("div").next()
                .children("div").children(".value");
        
                console.log(rating2v2.html());
                var second_savedPost = await Post.findOneAndUpdate({steamId:id}, {RL3v3: ranked3v3.html()});
                second_savedPost = await Post.findOneAndUpdate({steamId:id}, {RL2v2: ranked2v2.html()});
                second_savedPost = await Post.findOneAndUpdate({steamId:id}, {RLRating3v3: rating3v3.html()});
                second_savedPost = await Post.findOneAndUpdate({steamId:id}, {RLRating2v2: rating2v2.html()});
                
                console.log("done for rocket league");
                
        
            }
        
        });
    
})

module.exports = router;