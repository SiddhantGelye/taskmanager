const mongoose= require('mongoose')
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean
    },
    deadline:{
        type:String,
        required:true
    }
})
taskSchema.pre('save',async function(next){
    const task = this;
    if(task.isModified('description')){
        task.description =await task.description;
    }
    next();
})

const Task = mongoose.model('Task',taskSchema)

module.exports={
    Task:Task
}