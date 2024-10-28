// const mongoose = require('mongoose');


// const access = new mongoose.Schema({
//     name:{
//         type : String,
//     },
//     email:{
//         type : String,

//     },
//     password : {
//         type : String
//     },
//     usertype: {
//         type: Schema.Types.ObjectId, // Must be ObjectId
//         ref: 'UserType' // Refers to the UserType model
//     }




// });

//  let add= mongoose.model("accesscontrol", access);
//  module.exports = add

const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // Import Schema from mongoose

const accessSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    usertype: {
        type: Schema.Types.ObjectId, // Reference to another schema
        ref: 'usertypes' // Refers to the 'UserType' model
    }
});

const Access = mongoose.model('AccessControl', accessSchema); // Capitalized and renamed the model to follow common conventions
module.exports = Access;
