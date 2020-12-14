const express = require("express");
const mongoose = require("mongoose");
const userSchema= require("./Models/User.model.js");
const bodyParser = require("body-parser");
const app = express();
const postsRoute = require("./routes/posts")


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



app.use("/posts", postsRoute);




app.listen(3000);