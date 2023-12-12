const express=require('express');
const chatController=require('../controller/Chat')
const authenticateUser=require('../middleWire/Auth')
const router=express.Router();

router.post("/chat",authenticateUser,chatController.messages)



module.exports=router;
