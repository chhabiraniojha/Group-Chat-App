// services/cronService.js
const cron = require('node-cron');
const chatService = require('./chat-service'); // Adjust the path based on your project structure

function scheduleChatArchiving() {
  // Schedule the task to run at 12 noon every day
  cron.schedule('0 12 * * *', async () => {
    await chatService.moveChatsToArchive();
  });
}

module.exports = {
  scheduleChatArchiving,
};

