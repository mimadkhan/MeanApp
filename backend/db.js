const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meanDb',err=>{
    if(!err){
        console.log('Connection Successfull');
    }
    else{
        console.log('Error in Connection',err);
    }
})
module.exports=mongoose;