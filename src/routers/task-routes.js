const express = require('express');
const router = express.Router();
const {Task} = require('../models/task');


router.post('/task',async(req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/task',async(req,res)=>{
    try{
        const tasks =  await Task.find();
        if(!tasks){
            res.send("no pending task currently");
        }
        res.send(tasks);
    }
    catch(e){
        res.status(500).send(error);
    }
    
})

router.get('/task/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task){
            res.status(404);
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.patch('/task/:id',async(req,res)=>{
    
    const num = req.params.id;
    const body = Object.keys(req.body);
    
    const field = ['description','completed','deadline'];
    const Ok = body.every(p=>{
        return field.includes(p);
    })
    if(!Ok){
        return res.status(401).send('Error:invalid updates');
    }
    try{
        // const user = await Task.findByIdAndUpdate(num,req.body,{new:true,runValidators:true});
        const task = await Task.findById(num);
        if(!task){
            res.status(404).send('No taks found');
        }
        body.forEach((updateField)=>{
            task[updateField] = req.body[updateField];
        })
        const updateTaks = await task.save();
        res.send(updateTaks);
    }catch(e){
        res.status(500);
    }
})

router.delete('/task/:id',async(req,res)=>{
    const num = req.params.id;
    try{
        const user = await Task.findByIdAndDelete(num);
        if(!user){
            res.send('No user found');
        }
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;