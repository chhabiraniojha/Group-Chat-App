const { Op } = require('sequelize');
const Chat = require('../models/chat');
const ArchivedChat = require('../models/archived-chat');

async function moveChatsToArchive() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Fetch chats from the previous day
  const chatsToMove = await Chat.findAll({
    where: {
      createdAt: {
        [Op.lt]: yesterday,
      },
    },
  });

  // Move fetched chats to the archived chat table
  await ArchivedChat.bulkCreate(chatsToMove.map(chat => chat.toJSON()));

  // Delete the chats from the original chat table
  await Chat.destroy({
    where: {
      createdAt: {
        [Op.lt]: yesterday,
      },
    },
  });

  console.log('Chats moved to archive successfully');
}

module.exports = {
  moveChatsToArchive,
};
