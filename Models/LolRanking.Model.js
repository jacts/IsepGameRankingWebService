const mongoose = require("mongoose")

const Schema = mongoose.Schema

const LolRankingSchema = new Schema({
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
    }


})

const LolRanking = mongoose.model('LolRankingInfo', LolRankingSchema)
module.exports = LolRanking;