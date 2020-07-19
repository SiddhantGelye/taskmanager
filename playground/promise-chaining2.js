const {Task} = require('../src/models/task');
require('../src/db/mongoose');


const findAndDelete = async(id)=>{
    const task = await  Task.findByIdAndDelete(id);
    const count = await Task.count({completed:false});
    const t = await Task.inspect();
    return {task, count,t}
}
findAndDelete('5ee384dfe3f4bd6ba111d354').then(res=>{
    const {task, count,t}  =res;
    console.log(`the deleted task ${task}`);
    console.log(`there are ${count} task which are incomplete`)
    console.log(t);
})
