const  Router = require('express')
const postController = require('../controllers/posts.controller.js')
const userController = require('../controllers/users.controller')
const {authenticateJWT} = require('../middlewares/jwt.middleware')

const router = Router();

// Routes here
router.get("/posts",authenticateJWT, postController.getPosts)
router.get("/posts/:id",authenticateJWT, postController.getPostById)
router.post("/posts", authenticateJWT, postController.createPost)
router.patch("/posts/:id", authenticateJWT, postController.updatePost)
router.delete("/posts/:id", authenticateJWT, postController.deletePost)

router.post("/users", userController.createUser)
router.post("/login",userController.login)

module.exports = router;
