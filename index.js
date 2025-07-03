const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 8000;
const connectMongodb=require("./init/mongodb")
const todoroute=require("./routes/todo")
//init app
const app = express();
//mongodb connection
connectMongodb();
//view engine

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",todoroute);


//listen server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

});