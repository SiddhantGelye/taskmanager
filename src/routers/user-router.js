const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {User} = require('../models/user');

router.get('/',(req,res)=>{
    res.send('This is home page')
})

router.post('/users',async(req,res)=>{
    const user= new User(req.body)
    try{
        const singleuser = await user.save();
        const userToken = await user.generateToken(singleuser._id.toString());
        res.status(201).send({user,userToken});
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/users',auth,async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(501);
    }
})

router.get('/users/:id',async(req,res)=>{
    
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        if(!user){
            res.status(404).send();
        }
        res.status(200).send(user)
        
    }catch(e){
        res.status(500).send(e);
    }
})

router.patch('/users/:id',async(req,res)=>{
    
    const num = req.params.id;
    const body = Object.keys(req.body);
    
    const field = ['name','email','password','age'];
    const Ok = body.every(p=>{
        return field.includes(p);
    })
    if(!Ok){
        return res.status(401).send('Error:invalid updates');
    }
    try{
        // const user = await User.findByIdAndUpdate(num,req.body,{new:true,runValidators:true});
        const user = await User.findById(num);
        if(!user){
            return res.status(404).send("no user found")
        }
        body.forEach((updateField)=>{
            user[updateField] = req.body[updateField];
        })
        const updatedUser = await user.save();
        
        res.send(updatedUser);

    }catch(e){
        res.status(500).send();
    }
})

router.delete('/users/:id',async(req,res)=>{
    const _id = req.params.id;
    console.log(req.params.id)
    try{
        const user =await User.findByIdAndDelete(_id);
        if(!user){
            res.send('No user found')
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredential(req.body.email,req.body.password);
        const userToken = await user.generateToken(user._id.toString());
        res.send({user,userToken});
    }catch(Error){
        res.status(400).send({Error});
        console.log(Error)
    }
})
module.exports = router;