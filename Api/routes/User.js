const express=require("express");
const userController=require("../controller/User");
const authenticateUser=require('../middleWire/Auth')



const router=express.Router();


router.post("/signup",userController.signup);
router.post('/signin',userController.signin);
router.get('/onLineusers',userController.onlineUser);
router.get('/allusers',authenticateUser,userController.allUsers);
router.get('/currentuser',authenticateUser,userController.currentUser);




module.exports=router;