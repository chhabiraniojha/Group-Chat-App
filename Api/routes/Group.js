const express=require("express");
const groupController=require("../controller/group");
const authenticateUser=require('../middleWire/auth')



const router=express.Router();


router.post("/creategroup",authenticateUser,groupController.createGroup);
router.get("/allgroups",authenticateUser,groupController.getGroups)





module.exports=router;