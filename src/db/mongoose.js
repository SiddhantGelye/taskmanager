const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true ,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useNewUrlParser:true
})
// const social =  mongoose.createConnection('mongodb://127.0.0.1:27017/social-media-api');
