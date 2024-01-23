const Sequelize=require('sequelize');

const sequelize=require('../Utill/database');


const Group=sequelize.define('group',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  groupName:{
    type:Sequelize.STRING,
    allowNull:false
  }
  
});

module.exports=Group;