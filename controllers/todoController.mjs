import ToDoModel from "../models/ToDoModel.mjs";

const generateID = async () => {
    const lastID = await ToDoModel.find().sort({_id: "desc"});
    if(lastID.length > 0){
        return lastID[0].id+1;
    }else{
        return 1;
    }
}

const Result = todo => {
    return {
        id: todo.id,
        description: todo.description,
        status: todo.status
    }
} 

// POST /api/todo/
const createToDo= async (req,res) => {
    try {
        const {description} = req.body;
        const status = "Pending";
        const id = await generateID();
        const ToDo = await ToDoModel.create({id,description, status});
        res.status(201).json({id: ToDo.id});
    } catch (error) {
        console.assert(error);
        res.status(400).json({error});
    }
}

// GET /api/todo/
const getToDoList = async (req,res) => {
    try {
        const ToDo = await ToDoModel.find({});
        if(ToDo.length === 0){
            res.status(404).send("No TODO Tasks Founds");
        }else{
            const ToDoList = ToDo.map(Result);
            res.status(200).json(ToDoList);
        }
    } catch (error) {
        console.assert(error);
        res.status(400).json({error});
    }
}

// GET /api/todo/{todoId}
const getToDoById = async (req, res) => {
    try {
        const {todoId} = req.params;
        const ToDoTask = await ToDoModel.findOne({id: todoId});
        if(!ToDoTask){
            res.status(404).send("TODO Task Not Found");
        }else{
            res.status(200).json(Result(ToDoTask));
        }
    } catch (error) {
        console.assert(error);
        res.status(400).json({error});
    }

}

// POST /api/todo/{todoId}/done
const markAsDone = async (req,res) => {
    try {
        const {todoId} = req.params;
        const ToDoTask = await ToDoModel.updateOne({id: todoId}, {status: "done"});
        if(ToDoTask.matchedCount > 0){
            res.status(204).send();
        }else{
            res.status(404).send("No TODO Task Found");
        }
    } catch (error) {
        console.assert(error);
        res.status(400).json({error});
    }
}


// DELETE /api/todo/{todoId}/delete
const deleteToDo = async (req, res) => {
    try {
        const {todoId} = req.params;
        const ToDoTask = await ToDoModel.deleteOne({id: todoId});
        if(ToDoTask.deletedCount > 0){
            res.status(200).send("deleted");
        }else{
            res.status(404).send("No TODO Task Found");
        }
    } catch (error) {
        console.assert(error);
        res.status(400).json({error});
    }
}

export {createToDo,getToDoList, getToDoById, markAsDone, deleteToDo}