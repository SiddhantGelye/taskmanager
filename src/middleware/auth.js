const auth  = async(req,res,next)=>{
    res.send('auth middleware');
    console.log('auth Middleware');
    next();
}
module.exports = auth;

