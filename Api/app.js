const express=require('express');

require('dotenv').config()
const bodyParser=require('body-parser');
const userRoute=require('./routes/User')

const sequelize=require('./Utill/database')
const userModel=require('./models/User')
const cors=require('cors')



const app=express();
app.use(bodyParser.json({extended:false}));
app.use(cors())




app.use("/users",userRoute)


sequelize.sync({})
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
