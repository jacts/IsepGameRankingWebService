const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

//get the level of the player
router.get("/:pseudo", async (req, res) => {
    console.log("rfvghj")
    console.log(req.params.pseudo);
        var data = {};
        var api_key ="RGAPI-1c26b9f3-cd28-4974-838e-3b98635c8b6c";
        var pseudo = req.params.pseudo;
        var URL ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + pseudo + "?api_key=" + api_key;
        fetch(URL)
            .then(res => res.json({message : "coucou"})
            )
            .then((out) => {
                res.json(out);
            console.log('Checkout this JSON! ', out);
        })
            .catch(err => { throw err });
    
})


module.exports = router;