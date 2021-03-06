const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");
const LolRanking = require("../Models/Ranking.Model.js");

const router = express.Router();


router.post("/", async (req, res) => {
    console.log(req.body);
    var pseudo = req.body.LolPseudo;

    try {
        var savedPost = await Post.findOneAndUpdate({name:req.body.name}, {LolPseudo: pseudo});
        } catch(err){
            res.json({message : err});
        }
    
})

router.post("/:pseudo", async(req, res) => {
        var data = {};
        var api_key ="RGAPI-fc0ba118-df59-48ab-a42e-e6976b1660ef";
        var pseudo = req.params.pseudo;
        var id;
        var URL ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + pseudo + "?api_key=" + api_key;
        let rep = await fetch(URL);
        let reponse = await rep.json();
        var savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolId: reponse.id});


        //TEST
        var LOL_URL ="https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + reponse.id + "?api_key=" + api_key;
        let second_rep = await fetch(LOL_URL);
        let second_reponse = await second_rep.json();

        res.json(second_reponse[0]);

        if(second_reponse[0] == null){
            console.log("pas de rank");
            var second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolRank: "unranked"});


            const lolRanking = new LolRanking({
                LolPseudo: pseudo,
                LolGameRank: "unranked",
                LolGameTier: null,
                LolOurRank: "32",
                CSGoOurRank: "160",
                RLOurRank: "160",
                name: ""
            })
    
            const thirdPost = await lolRanking.save()
        }
        else{
        var second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolRank: second_reponse[0].rank});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolTier: second_reponse[0].tier});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolLosses: second_reponse[0].losses});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolWins: second_reponse[0].wins});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolPoints: second_reponse[0].leaguePoints});

        const lolRanking = new LolRanking({
            LolPseudo: pseudo,
            LolGameRank: second_reponse[0].rank,
            LolGameTier: second_reponse[0].tier,
            LolOurRank: "160",
            CSGoOurRank: "160",
            CSGoGameRank:"",
            RLGameRank:"",
            RLOurRank: "160", 
            name: ""
        })

        const thirdPost = await lolRanking.save()
    }
        
    


})

router.get("/:pseudo", async(req, res) => {
    try {
        const posts = await Post.find({LolPseudo:req.params.pseudo});
        res.json(posts[0]);
    } catch (err){
        res.json({message : err});
    }

})


router.get("/lol/:name", async(req, res) => {
    try {
        const posts = await Post.find({name:req.params.name});
        res.json(posts[0]);
    } catch (err){
        res.json({message : err});
    }

})





module.exports = router;