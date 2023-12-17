const chat=require('../models/Chat');
const user=require('../models/User');
const { Op } = require('sequelize')

exports.messages=async (req,res,next)=>{
    const {message,groupId}=req.body;

    try {
        const chats=await chat.create({message,groupId,userId:req.user.id})
        res.status(200).json({message:"message successfully inserted",data:chats})
    } catch (error) {
        res.json(error)
    }


}

exports.getMessages=async(req,res,next)=>{
     const chatId=req.params.id
     const groupId=req.params.groupid
    //  console.log(chatId,groupId)
      try {
        if(chatId!=undefined){
           const messages=await chat.findAll({where:{
            id:{[Op.gt]: chatId},
            groupId:req.params.groupid
          }});
          // console.log(messages)
          res.status(200).json(messages)
        }else{
          const messages=await chat.findAll(
            {where:{
              groupId:groupId
            }}
          );
          // console.log(messages)
          res.status(201).json(messages)
        }
        // const messages=await chat.findAll();
        
      } catch (error) {
        res.json(error)
      }
}