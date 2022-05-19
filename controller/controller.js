const adminData = require('../model/Admin-model')
const employeeData = require('../model/Employee-model')
const bcrypt = require('bcryptjs')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

exports.setIndex = (req,res) =>{
    res.send('backend is running')
}

//  ADMIN MODEL

exports.adminSignUp = async (req,res) =>{
    const emailExist = await adminData.findOne({email:req.body.email})
    if(emailExist){
        res.send('admin already exists')
        return;
    }

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)


    const adminUser = new adminData({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const adminSchema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
        })

        const {error} = await adminSchema.validateAsync(req.body)

        if(error){
            res.send(error.details[0].message)
        }

        const saveAdmin = await adminUser.save()
        res.send('admin created successfully')

    } catch (error) {
        res.send(error)
    }

}

exports.adminSignIn = async (req,res) =>{
    const adminUser = await adminData.findOne({email:req.body.email})

    if(!adminUser) return res.status(400).send('Please SignUp First')
    

    const validatePassword = await bcrypt.compare(req.body.password,adminUser.password)
    if(!validatePassword) return res.status(400).send('incorrect password')

    try {
        const adminSchema = Joi.object({
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required()
        })

        const {error} = await adminSchema.validateAsync(req.body)

        if(error) return res.send(error.details[0].message)

        else{
            const token = jwt.sign({_id: adminUser._id}, process.env.ADMIN_SECRET)

            res.header("auth-token", token)
            res.send(token)
        }
    } catch (error) {
        res.send(error)
    }
}

// ADMIN CREATE EMPLOYEE

exports.adminEmployeeSignUp = async (req,res) =>{
    const emailExist = await employeeData.findOne({email:req.body.email})
    if(emailExist){
        res.send('employee already exists')
        return;
    }

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)


    const employeeUser = new employeeData({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const employeeSchema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
        })

        const {error} = await employeeSchema.validateAsync(req.body)

        if(error){
            res.send(error.details[0].message)
        }

        const saveAdmin = await employeeUser.save()
        res.send('employee created successfully')

    } catch (error) {
        res.send(error)
    }

}

// EMPLOYEE MODEL


exports.employeeSignUp = async (req,res) =>{
    const emailExist = await employeeData.findOne({email:req.body.email})
    if(emailExist){
        res.send('employee already exists')
        return;
    }

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)


    const employeeUser = new employeeData({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const employeeSchema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
        })

        const {error} = await employeeSchema.validateAsync(req.body)

        if(error){
            res.send(error.details[0].message)
        }

        const saveAdmin = await employeeUser.save()
        res.send('employee created successfully')

    } catch (error) {
        res.send(error)
    }

}

exports.employeeSignIn = async (req,res) =>{
    const employeeUser = await employeeData.findOne({email:req.body.email})

    if(!employeeUser) return res.status(400).send('Please SignUp First')
    

    const validatePassword = await bcrypt.compare(req.body.password,employeeUser.password)
    if(!validatePassword) return res.status(400).send('incorrect password')

    try {
        const adminSchema = Joi.object({
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required()
        })

        const {error} = await adminSchema.validateAsync(req.body)

        if(error) return res.send(error.details[0].message)

        else{
            res.send(employeeUser)
        }
    } catch (error) {
        res.send(error)
    }
}


// EMPLOYEE DETAILS


exports.addEmployeeDetail = async (req,res) =>{
    try{
        const details = await new employeeData({
            employeeCode: req.body.employeeCode,
            address: req.body.address,
            designation: req.body.designation,
            salary: req.body.salary,
            leave: req.body.leave
        })
        const saveData = details.save()
        res.status(200).send('Employee Details Saved Successfully')
    }
    catch (error){
        res.send(error)
    }
}

exports.viewEmployee = (req,res) => {
    employeeData.findById(req.params.id)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
}


exports.showAllEmployee =async (req,res) =>{
    const allEmployee = await employeeData.find()
    try{
        res.send(allEmployee)
    }catch(error){
        res.send(error)
    }
}

exports.modifyEmployee = (req,res) =>{
    employeeData.findById(req.params.id , (err,employee)=>{
        if(err)
        res.send(err)
        
        employee.employeeCode = req.body.employeeCode ? req.body.employeeCode : employee.employeeCode
        employee.name = req.body.name ? req.body.name : employee.name
        employee.email = req.body.email ? req.body.email : employee.email
        employee.address = req.body.address ? req.body.address : employee.address
        employee.designation = req.body.designation ? req.body.designation : employee.designation
        employee.salary = req.body.salary ? req.body.salary : employee.salary
        employee.leave = req.body.leave ? req.body.leave : employee.leave
        
        employee.save((err) => {
            if(err)
            res.send(err)
            res.json({
                data: employee
            })
        })
    })
}


exports.deleteEmployee = async (req,res) =>{
    const delete_Employee = await employeeData.deleteOne({_id:req.params.id})
    try {
        res.send(`successfully deleted employee: ${req.params.id}`)
        
    } catch (error) {
        res.send(error)
    }
}

