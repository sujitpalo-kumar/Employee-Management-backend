const  mongoose  = require("mongoose");

const employeeModel = new mongoose.Schema({
    employeeCode:{
        type: Number,
        // required: true
    },
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
    },address:{
        type: String,
        // required: true,
        min: 8,
        max: 255
    },
    designation:{
        type: String,
        // required: true,
        min: 3,
        max: 255
    },
    salary:{
        type: Number,
        // required: true
    },
    leave:{
        type: Number,
        // required: true
    }

})

module.exports= mongoose.model('employee-dashboard', employeeModel)