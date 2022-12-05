import express from "express";
import ToDoModel from "../models/ToDoModel.mjs";
import {createToDo, getToDoList, getToDoById, markAsDone, deleteToDo} from "../controllers/todoController.mjs"; 

const router = express.Router();

router.post("/", createToDo);

router.get("/", getToDoList);

router.get("/:todoId", getToDoById);

router.post("/:todoId/done", markAsDone);

router.delete("/:todoId/delete",deleteToDo)



export default router;