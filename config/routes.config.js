const  Router = require('express')
const  controller = require ('../controllers/employee.controller.js')

const router = Router();

// Routes here
router.get("/employees", controller.getEmployees)
router.get("/employees/oldest", controller.getOldestEmployee)
router.get("/employees/:name", controller.getEmployeesByName)
router.post("/employees", controller.createEmployee)

module.exports = router;
