const  Router = require('express')
const  controller = require('../controllers/posts.controller.js')

const router = Router();

// Routes here
router.get("/posts", controller.getPosts)
//router.get("/posts/:id", controller.getEmployeesByName)
router.post("/posts", controller.createPost)
//router.patch("/posts/:id", controller.createEmployee)
//router.delete("/posts/:id", controller.createEmployee)

module.exports = router;
