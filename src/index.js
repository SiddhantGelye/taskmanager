const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const port =process.env.PORT||3000;

require('./db/mongoose');
const userRouter  = require('./routers/user-router');
const taskRouter = require('./routers/task-routes');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log(`post listening at ${port}`);
});


