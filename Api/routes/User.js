const express=require("express");
const userController=require("../controller/user");
const authenticateUser=require('../middleWire/auth')



const router=express.Router();

// router.get("/tokenVerification",authenticateUser,userController.tokenVerification)
router.post("/signup",userController.signup);
router.post('/signin',userController.signin);
router.get('/onLineusers',userController.onlineUser);
router.get('/allusers',authenticateUser,userController.allUsers);
router.get('/currentuser',authenticateUser,userController.currentUser);




module.exports=router;