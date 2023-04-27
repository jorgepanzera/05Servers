const  Router = require('express')
const  controller = require ('../controllers/employee.controller.js')

const router = Router();

// Routes here
router.get("/employees", controller.getAllEmployees)
router.post("/employees", controller.createEmployee)

module.exports = router;
