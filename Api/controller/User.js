const bcrypt = require('bcrypt')
const User=require('../models/User')
const jwt=require('jsonwebtoken')


const generateAccessToken=(id,name)=>{
  return jwt.sign({userId:id,userName:name},process.env.SECRET_KEY)
}
exports.signup = async (req, res, next) => {
  const { name, email,phone, password } = req.body;
  try {
    const userCheck = await User.findOne({ where: { email } });
    if (userCheck === null) {
      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        const user = await Users.create({ name, email,phone, password: hash });
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
  const { email, password } = req.body;
  try {
    const user = await User.findAll({
      where: {
        email: email
      }
    })
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        // result == true
        if (result) {
          return res.status(200).json({data:user[0],message:"success loged in",token:generateAccessToken(user[0].id,user[0].name)})
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