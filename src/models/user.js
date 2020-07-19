const bcrypt = require('bcryptjs');
const mongoose= require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        validate(value){
            if(!(validator.isEmail(value))){
                throw new Error("email required")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        validate(value){
            if(value.includes('password')){
                throw new Error(`should not contain word "password"`);
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be greater than 0');
            }
        }
    },
    tokens:[{
        token : {
            type:String,
            required:true
        }
    }]
})

//hash password
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){//this means that user has add the password or edited the password or not
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})
userSchema.plugin(uniqueValidator);

//our own defination
userSchema.statics.findByCredential = async(email, password)=>{
    const user =await User.findOne({email:email});
    if(!user){
        throw new Error('Email is not registered');
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        throw new Error('Wrong password');
    }
    return user;
}

userSchema.methods.generateToken = async function(id){
    const user = this;
    const token = await jwt.sign({_id:id},'thisprivatestring');
    user.tokens = user.tokens.concat({token:token});
    await user.save();
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports={
    User:User
}