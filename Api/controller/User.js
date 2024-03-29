const bcrypt = require('bcrypt')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const { Op } =require('sequelize');


const generateAccessToken=(id)=>{
  return jwt.sign({userId:id},process.env.SECRET_KEY)
}

exports.currentUser=(req,res,next)=>{
    res.json(req.user)
}

exports.signup = async (req, res, next) => {
  const { name, email,phone, password } = req.fields;
  // console.log(req.fields)
  try {
    const userCheck = await User.findOne({ where: { email } });
    if (userCheck === null) {
      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        const user = await User.create({ name, email,phone, password: hash });
        return res.status(200).json({success:true,message:"successfully signedup"});
      });
    } else {
       return res.status(203).json({success:true,message:"user already exists"})
    } 

  } catch (error) {
    res.status(501).json(error)
  }
}

exports.signin = async (req, res, next) => {
  const { email, password } = req.fields;
  try {
    const user = await User.findAll({
      where: {
        email: email
      }
    })
    console.log(user.length)
    
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password,async function (err, result) {
        // result == true
        if (result) {
          await User.update({ loggedInStatus: true }, {
            where: {
              id: user[0].id
            }
          });
          return res.status(200).json({data:user[0],message:"success loged in",token:generateAccessToken(user[0].id)})
        } else {
          return res.status(401).json("password mismatch")
        }
      });


    } else {
      return res.status(404).json('user not found')
    }

  } catch (error) {
    res.json(error)
  }

}

exports.onlineUser=async(req,res,next)=>{
   try {
    const onlineUserList = await User.findAll({
      where: {
        loggedInStatus: true
      }
    })
    if(onlineUserList.length>0){
      res.json(onlineUserList)
    }
   } catch (error) {
    
   }
}


exports.allUsers=async(req,res,next)=>{
  
  try {
   const userList = await User.findAll({
    where: {
      [Op.not]: {
        id: req.user.id
      },
    },
   })
   
     res.status(200).json(userList)
   
  } catch (error) {
     res.json(error)
  }
}