import express  from "express";
import mongoose from "mongoose";
import todoRoutes from './routes/todoRoutes.mjs';

const PORT = 3000;
const app = express();
app.use(express.json())
app.use("/api/todo/",todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/ToDoList",(error) => {
    if(error){
        console.assert(error);
    }
    else{
        app.listen(PORT,() => {
            console.log(`Server started on PORT ${PORT}`)
        })
    }
});