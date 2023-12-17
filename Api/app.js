const express=require('express');

require('dotenv').config()
const bodyParser=require('body-parser');
const userRoute=require('./routes/User');
const chatRoute=require('./routes/Chat');
const groupRoute=require('./routes/Group')

const sequelize=require('./Utill/database')
const Users=require('./models/User')
const Chats=require('./models/Chat')
const Groups=require('./models/Group')
const cors=require('cors');
const { HasMany } = require('sequelize');



const app=express();
app.use(bodyParser.json({extended:false}));
app.use(cors())




app.use("/users",userRoute);
app.use('/',chatRoute);
app.use("/groups",groupRoute)


Users.hasMany(Chats)
Chats.belongsTo(Users)

Users.belongsToMany(Groups, { through: 'User_Groups' });
Groups.belongsToMany(Users, { through: 'User_Groups' });

Groups.hasMany(Chats)
Chats.belongsTo(Groups)

sequelize.sync({})
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
