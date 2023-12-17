const express=require("express");
const groupController=require("../controller/Group");
const authenticateUser=require('../middleWire/Auth')



const router=express.Router();


router.post("/creategroup",authenticateUser,groupController.createGroup);
router.get("/allgroups",authenticateUser,groupController.getGroups)





module.exports=router;