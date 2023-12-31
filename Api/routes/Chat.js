const express=require('express');
const chatController=require('../controller/Chat')
const authenticateUser=require('../middleWire/Auth')
const router=express.Router();

router.post("/chat",authenticateUser,chatController.messages);
router.get("/chat/:id/:groupid",chatController.getMessages)
router.post("/mediachat",chatController.mediaMessages)



module.exports=router;
