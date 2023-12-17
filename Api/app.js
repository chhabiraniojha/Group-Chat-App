const express = require('express');

require('dotenv').config()
const bodyParser = require('body-parser');
const userRoute = require('./routes/User');
const chatRoute = require('./routes/Chat');
const groupRoute = require('./routes/Group')

const sequelize = require('./Utill/database')
const Users = require('./models/User')
const Chats = require('./models/Chat')
const Groups = require('./models/Group')
const cors = require('cors');
const { HasMany } = require('sequelize');



const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors())




app.use("/users", userRoute);
app.use('/', chatRoute);
app.use("/groups", groupRoute)


Users.hasMany(Chats)
Chats.belongsTo(Users)

Users.belongsToMany(Groups, { through: 'User_Groups' });
Groups.belongsToMany(Users, { through: 'User_Groups' });

Groups.hasMany(Chats)
Chats.belongsTo(Groups)

sequelize.sync({})
    .then(res => {
        const server = app.listen(3000);

        const io = require('socket.io')(server, {
            cors: {
                origin: "*"
            },
            pingTimeout: 60000
        })

        io.on("connection", (socket) => {
            console.log("connected to socket.io")
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



