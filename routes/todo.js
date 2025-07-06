const todo=require("../controllers/todo")
const express=require("express");
const router=express.Router();
router.get("/",todo.homeController);
router.get("/add-todo",todo.addTodoFormController);
router.get("/update-todo",todo.updateTodoFormController);
router.get("/delete-todo",todo.deleteTodoFormController);
router.post("/add-todo", todo.addTodoController);
module.exports=router;