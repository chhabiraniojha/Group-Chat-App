const express=require("express");
const userController=require("../controller/User");



const router=express.Router();


router.post("/signup",userController.signup);
router.post('/signin',userController.signin);
router.get('/onLineusers',userController.onlineUser)



module.exports=router;