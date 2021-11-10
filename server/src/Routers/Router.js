const express = require("express");
const router = express.Router();
const veryfiTokenMiddleware = require('../middleWares/authen');
const registerController = require("../app/Controllers/authenController");
const postsController = require('../app/Controllers/postsController');

//Authentication
router.post("/auth/register", registerController.register);
router.post("/auth/login", registerController.login);

//Posts
router.post("/posts/createPost",veryfiTokenMiddleware.veryfiToken, postsController.post);
router.get("/posts",veryfiTokenMiddleware.veryfiToken, postsController.getPosts);
router.put("/posts/:id", veryfiTokenMiddleware.veryfiToken, postsController.updatePost);
router.delete("/posts/:id", veryfiTokenMiddleware.veryfiToken, postsController.deletePost);

module.exports = router;
