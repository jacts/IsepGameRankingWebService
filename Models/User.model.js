const mongoose = require("mongoose")

const Schema = mongoose.Schema


const UserSchema = new Schema({
    general: {
        name: {
            type : String
        },
        mail: {
            type : String
        }
    }/*,
    LOL: {
        Rang: {
            type : String
        },
        Win: {
            type : String
        },
        Nbgames: {
            type : String
        },

    }

    */


})



const User = mongoose.model('user', UserSchema)
module.exports = User;