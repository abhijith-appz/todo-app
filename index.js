const express=require("express");
const mongoose=require("mongoose");
const PORT=8000;

//init app
const app=express();
const connectionUrl="mongodb://localhost:27017/todoDb";

mongoose.connect(connectionUrl).then(()=> console.log("Database connected succesfully")).catch((error)=>console.log(error.message));

//view engine
app.set("view engine","ejs");

//listen server
app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);

});