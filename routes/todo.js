const Todo=require("../models/Todo");
const express=require("express");
const router=express.Router();
const moment=require("moment");
router.get("/", async(req, res, next) => {
    try {
        const todos=await Todo.find({}).sort({createdAt:-1});
        res.locals.moment=moment;

        res.render("index", { title: "List todo",todos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/add-todo", (req, res, next) => {
    try {
        res.render("newTodo", { title: "Add todo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/update-todo", (req, res, next) => {
    try {
        res.render("updateTodo", { title: "Update todo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/delete-todo", (req, res, next) => {
    try {
        res.render("deleteTodo", { title: "Delete todo" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/add-todo", async(req, res, next) => {
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
module.exports=router;