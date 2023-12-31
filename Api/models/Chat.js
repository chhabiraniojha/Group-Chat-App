const Sequelize=require('sequelize');

const sequelize=require('../Utill/database');


const Chat=sequelize.define('chat',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  message:{
    type:Sequelize.STRING,
    allowNull:false
  },
  messageType:{
    type:Sequelize.STRING,
    allowNull:false,
    defaultValue:"text"
  }
});

module.exports=Chat;