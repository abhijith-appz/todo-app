const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const moment=require("moment");
const PORT = 8000;
const connectMongodb=require("./init/mongodb")

//init app
const app = express();
//mongodb connection
connectMongodb();


const todoSchema = mongoose.Schema({ title: { type: String, required: true }, desc: String }, { timestamps: true });

const Todo = mongoose.model("todo", todoSchema);

//view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async(req, res, next) => {
    try {
        const todos=await Todo.find({}).sort({createdAt:-1});
        res.locals.moment=moment;

        res.render("index", { title: "List todo",todos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/add-todo", (req, res, next) => {
    try {
        res.render("newTodo", { title: "Add todo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/update-todo", (req, res, next) => {
    try {
        res.render("updateTodo", { title: "Update todo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/delete-todo", (req, res, next) => {
    try {
        res.render("deleteTodo", { title: "Delete todo" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/add-todo", async(req, res, next) => {
    try{
        const { title, desc } = req.body;
        if(!title){
            return res.status(400).json({message :"title is required"});
        }
        const newTodo = new Todo({ title, desc });
        await newTodo.save();
        res.redirect("/")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//listen server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

});