import mongoose  from "mongoose";

const ToDoSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
    }
});

export default mongoose.model("ToDo",ToDoSchema);