const util = require('util');
const fs = require('fs');
const chat = require('../models/Chat');
const user = require('../models/User');
const { Op } = require('sequelize');
const AWS = require('aws-sdk');




const readFileAsync = util.promisify(fs.readFile);

exports.messages = async (req, res, next) => {
  const { message, groupId } = req.fields;
  // console.log(req.fields)
  console.log('Content-Type Header:', req.get('Content-Type'));

  try {
    const chats = await chat.create({ message, groupId, userId: req.user.id })
    res.status(200).json({ message: "message successfully inserted", data: chats })
  } catch (error) {
    res.json(error)
  }


}

const uploadToS3 = (data, fileName) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET_KEY = process.env.IAM_USER_SECRET_KEY;

  const s3 = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET_KEY,
  });
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });


}

exports.mediaMessages = async (req, res, next) => {
  // const {data,currentGroup}=req.body;
   
  try {
    const formData = req.files.data;
    const groupData = JSON.parse(req.query.groupData);
    // console.log(formData)
    // console.log(groupData)
    const fileContentBuffer = await readFileAsync(formData.path);
    const fileName = `${groupData.groupName}-${groupData.User_Groups.userId}-${formData.name}`;
    const fileUrl = await uploadToS3(fileContentBuffer, fileName);
    // console.log(fileUrl)

    const chats = await chat.create({ message: fileUrl.Location, groupId: groupData.id, userId: groupData.User_Groups.userId })
    // console.log(chats)
    res.status(200).json({ fileUrl, success: true,data:chats })
  } catch (error) {
    res.json(error)
  }

  // console.log(fileUrl.Location)

  // res.status(200).json({ fileUrl, success: true });

}


exports.getMessages = async (req, res, next) => {
  const chatId = req.params.id
  const groupId = req.params.groupid
  //  console.log(chatId,groupId)
  try {
    if (chatId != undefined) {
      const messages = await chat.findAll({
        where: {
          id: { [Op.gt]: chatId },
          groupId: req.params.groupid
        }
      });
      // console.log(messages)
      res.status(200).json(messages)
    } else {
      const messages = await chat.findAll(
        {
          where: {
            groupId: groupId
          }
        }
      );
      // console.log(messages)
      res.status(201).json(messages)
    }
    // const messages=await chat.findAll();

  } catch (error) {
    res.json(error)
  }
}