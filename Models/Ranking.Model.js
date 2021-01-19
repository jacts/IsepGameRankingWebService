const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RankingSchema = new Schema({
    LolPseudo: {
        type : String
    },
    LolGameRank: {
        type : String
    },
    LolGameTier: {
        type : String
    },
    LolOurRank: {
        type : String
    },
    CSGoOurRank:{
        type : String
    },
    RLOurRank:{
        type : String
    },
    name:{
        type : String
    }


})

const Ranking = mongoose.model('RankingInfo', RankingSchema)
module.exports = Ranking;