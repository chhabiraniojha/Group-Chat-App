const express=require('express');
const chatController=require('../controller/chat')
const authenticateUser=require('../middleWire/auth')
const router=express.Router();

router.post("/chat",authenticateUser,chatController.messages);
router.get("/chat/:id/:groupid",chatController.getMessages)
router.post("/mediachat",chatController.mediaMessages)



module.exports=router;
