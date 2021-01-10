const express = require("express");
const mongoose = require("mongoose");
const userSchema= require("./Models/User.model.js");
const bodyParser = require("body-parser");
const app = express();
const inscriptionRoute = require("./routes/inscription")
const postsRoute = require("./routes/posts")
const lolRoute = require("./routes/riot")
const CSGoRoute = require("./routes/CSGo")
const RocketLeagueRoute = require("./routes/RocketLeague")
const RankingRoute = require("./routes/ranking")


//connection to DB
mongoose.connect("mongodb://localhost:27017/IsepGameRankingDB", {useNewUrlParser: true, 
    useUnifiedTopology: true }).then(() => {
    console.log("mongoDB connected");
})


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
      extended: false
}));
app.use(bodyParser.json());


app.use("/inscription", inscriptionRoute);
app.use("/posts", postsRoute);
app.use("/lol", lolRoute);
app.use("/CSGo", CSGoRoute);
app.use("/rocketLeague", RocketLeagueRoute);
app.use("/ranking", RankingRoute);



app.listen(3000);