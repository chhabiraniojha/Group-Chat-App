const express=require('express');

require('dotenv').config()
const bodyParser=require('body-parser');
const userRoute=require('./routes/User');
const chatRoute=require('./routes/Chat')

const sequelize=require('./Utill/database')
const Users=require('./models/User')
const Chats=require('./models/Chat')
const cors=require('cors');
const { HasMany } = require('sequelize');



const app=express();
app.use(bodyParser.json({extended:false}));
app.use(cors())




app.use("/users",userRoute);
app.use('/',chatRoute);


Users.hasMany(Chats)
Chats.belongsTo(Users)

sequelize.sync({})
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
