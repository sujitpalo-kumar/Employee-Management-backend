const  mongoose  = require("mongoose");

const adminModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 255
    }

})

module.exports= mongoose.model('admin-dashboard', adminModel)