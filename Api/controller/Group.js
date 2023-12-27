const Users = require('../models/User')
const Groups = require('../models/Group')
const sequelize=require('../Utill/database')

exports.createGroup = async (req, res, next) => {
    const { group, groupName } = req.fields
    const groupAdmin=req.user.id;
    const t = await sequelize.transaction();
    
    const groupFormation = group.map((g) => {
              return g.id
    })
    groupFormation.push(req.user.id)
  
    try {
        const groups=await Groups.create({groupName,groupAdmin},{ transaction: t })
        if(groups){
            await groups.addUsers(groupFormation,{ transaction: t })
        }
        await t.commit();
        res.status(200).json("group created")
    } catch (error) {
        await t.rollback();
        res.status(500).json({error})
    }
}


exports.getGroups=async(req,res,next)=>{
    
    try {
        const user=req.user;
        if(user){
            const allGroups=await user.getGroups();
            
            res.status(200).json(allGroups)
        }
        
        
    } catch (error) {
        res.status(500).json("internal server error")
    }
}