const chat=require('../models/Chat');
const user=require('../models/User')

exports.messages=async (req,res,next)=>{
    console.log(req.body)

    try {
        const chats=await chat.create({message:req.body.message,userId:req.user.id})
        res.status(200).json({message:"message successfully inserted",data:chats})
    } catch (error) {
        res.json(error)
    }


}