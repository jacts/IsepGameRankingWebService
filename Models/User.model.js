const mongoose = require("mongoose")

const Schema = mongoose.Schema


const UserSchema = new Schema({
        name: {
            type : String
        },
        mail: {
            type : String
        },
        prenom: {
            type : String
        },
        password: {
            type : String
        },
        steamId: {
            type : String
        },
        LolId: {
            type : String
        },
        LolPseudo: {
            type : String
        },
        LolRank: {
            type : String
        },
        LolTier: {
            type : String
        },
        LolPoints: {
            type : String
        },
        LolWins: {
            type : String
        },
        LolLosses: {
            type : String
        },
        CSGoId: {
            type : String
        },
        CSGoWinPourc: {
            type : String
        },
        CSGoHeadShot: {
            type : String
        },
        CSGoKills: {
            type : String
        },
        CSGoDeaths: {
            type : String
        },
        CSGoRank: {
            type : String
        },
        RLId: {
            type : String
        },
        RL3v3: {
            type : String
        },
        RL2v2: {
            type : String
        },
        RLRating3v3: {
            type : String
        },
        RLRating2v2: {
            type : String
        },




    


})



const User = mongoose.model('user', UserSchema)
module.exports = User;