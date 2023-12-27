const User=require('../models/User');
const jwt=require('jsonwebtoken');

const Authenticate=async (req,res,next)=>{
     try {
        const token=req.header('authorization');
      //   console.log(token)
        const {userId}=jwt.verify(token,process.env.SECRET_KEY)
      //   console.log(userId)
        const user=await User.findByPk(userId);
      //   console.log(user)
      if(user){
        req.user=user;
        next()
      }else{
        res.status(203).json({message:"token invalid"})
      }
       
        
     } catch (error) {
        res.status(501).json({
            message:"error"
        })
        // console.log(error)
     }
}

module.exports=Authenticate;