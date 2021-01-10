const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const Post = require("../Models/User.model.js");

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

router.get("/:pseudo", async(req, res) => {
        var data = {};
        var api_key ="RGAPI-2d7c77b1-1d1f-4ed6-9939-a24836f30b61";
        var pseudo = req.params.pseudo;
        var id;
        var URL ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + pseudo + "?api_key=" + api_key;
        let rep = await fetch(URL);
        let reponse = await rep.json();
        //res.json(reponse);
        var savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolId: reponse.id});


        //TEST
        var LOL_URL ="https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + reponse.id + "?api_key=" + api_key;
        let second_rep = await fetch(LOL_URL);
        let second_reponse = await second_rep.json();
        res.json(second_reponse[0]);
        var second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolRank: second_reponse[0].rank});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolTier: second_reponse[0].tier});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolLosses: second_reponse[0].losses});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolWins: second_reponse[0].wins});
        second_savedPost = await Post.findOneAndUpdate({LolPseudo:pseudo}, {LolPoints: second_reponse[0].leaguePoints});
})




module.exports = router;