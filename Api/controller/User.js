const Users = require('../models/User')
const bcrypt = require('bcrypt')
const User=require('../models/User')



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

