const Controller = require('../controller/controller')
const express = require('express')
const routes = express.Router();
const verify = require('../route/auth-route')



routes.get('/', Controller.setIndex)

// ADMIN ROUTES

routes.post('/adminSignUp', Controller.adminSignUp)
routes.post('/adminSignIn', Controller.adminSignIn)
routes.post('/adminEmployeeSignUp', verify,Controller.adminEmployeeSignUp)

// EMPLOYEE ROUTES

routes.post('/employeeSignUp', Controller.employeeSignUp)
routes.post('/employeeSignIn', Controller.employeeSignIn)

// EMPLOYEE DETAILS

routes.post('/addEmployeeDetails', Controller.addEmployeeDetail)
routes.get('/allEmployee',verify, Controller.showAllEmployee)
routes.get('/viewEmployee/:id', Controller.viewEmployee)
routes.put('/updateEmployee/:id',verify, Controller.modifyEmployee)
routes.delete('/deleteEmployee/:id',verify, Controller.deleteEmployee)


module.exports= routes