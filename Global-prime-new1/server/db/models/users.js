const mongoose = require('mongoose');


const users = new mongoose.Schema({
    name:{
        type : String,
    },
    email:{
        type : String,

    },
    profolio:{
        type : String,
   
    },
    imageInput :{
        type : String,
    },
    coverleter :{
        type : String
    },

});

 let add= mongoose.model("users", users);
 module.exports = add