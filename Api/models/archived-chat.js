const Sequelize=require('sequelize');

const sequelize=require('../Utill/database');


const archivedChat=sequelize.define('archived_chat',{
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
  },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  groupId:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
});

module.exports=archivedChat;