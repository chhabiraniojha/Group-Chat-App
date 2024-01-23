const Users = require('../models/user')
const Groups = require('../models/group')
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
    // res.json("hii")

    try {
        const userId=req.user.id;
        const user = await Users.findByPk(userId);
        if(user){
            
            // console.log(userId instanceof Users);
            const allGroups=await user.getGroups();
            console.log(allGroups)
            
            res.status(200).json(allGroups)
        }
        
        
    } catch (error) {
        res.status(500).json({error})
    }
}