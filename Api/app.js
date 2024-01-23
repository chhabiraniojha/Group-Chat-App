const express = require('express');
const formidable = require('express-formidable');

require('dotenv').config()
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const groupRoute = require('./routes/group')

const sequelize = require('./Utill/database')
const Users = require('./models/user')
const Chats = require('./models/chat')
const Groups = require('./models/group')
const archivedChat=require("./models/archived-chat")
const cronService = require('./services/cron-service');
const cors = require('cors');
const { HasMany } = require('sequelize');



const app = express();
app.use(cors());  // Enable CORS
app.use(formidable({})); 


app.use("/users", userRoute);
app.use('/', chatRoute);
app.use("/groups", groupRoute)


Users.hasMany(Chats)
Chats.belongsTo(Users)

Users.belongsToMany(Groups, { through: 'User_Groups' });
Groups.belongsToMany(Users, { through: 'User_Groups' });
Groups.belongsTo(Users, { foreignKey: 'groupAdmin' });

Groups.hasMany(Chats);
Chats.belongsTo(Groups);


// Users.hasMany(Groups);
// Groups.belongsTo(Users);


sequelize.sync({})
    .then(res => {
        const server = app.listen(3000,()=>{
            cronService.scheduleChatArchiving();
        });
        

        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            },
            pingTimeout: 60000
        })

        io.on("connection", (socket) => {
            // console.log("connected to socket.io")
            socket.on('setup', (userData) => {
                // console.log(userData.id)
                socket.join(userData.id)
                socket.emit("connected")
            })
            socket.on('join chat', (room) => {
                socket.join(room);
                console.log("user joined room " + room)
            })

            socket.on("new message", (newMessageRecieved,room) => {
                console.log(newMessageRecieved)
                var chat =newMessageRecieved.data.data
                // console.log(chat.groupId)
                // console.log("my room"+room)
                // console.log(chat)
                
                io.in(room).emit("receive-message",chat)

                // if(!chat.userId)return console.log("chat user not defined")

                // chat.users.forEach(user=>{
                //     if(user.id=newMessageRecieved.sender.id) return;
                //     socket.in(user.id).emit("message received",newMessageRecieved)
                // })
            })

        })

    }).catch(err => {
        console.log(err)
    })



