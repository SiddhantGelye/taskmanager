const mongoose= require('mongoose')
require('../src/db/mongoose');
const {User} = require('../src/models/user');

const updatedName = async(num, name)=>{
    const user = await User.findByIdAndUpdate(num,{name:name});
    return user;
}

exports.module = {
    updatedName:updatedName
}