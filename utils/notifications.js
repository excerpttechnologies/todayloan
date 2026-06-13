const { Notification } = require('../models/index');

let io = null;

const setIO = (socketIO) => { io = socketIO; };

const sendNotification = async (userId, title, message, type = 'general', relatedId = null) => {
  try {
    const notification = await Notification.create({ userId, title, message, type, relatedId });
    if (io) {
      io.to(userId.toString()).emit('notification', notification);
    }
    return notification;
  } catch (err) {
    console.error('Notification error:', err);
  }
};

const sendNotificationToMany = async (userIds, title, message, type = 'general', relatedId = null) => {
  for (const userId of userIds) {
    await sendNotification(userId, title, message, type, relatedId);
  }
};

module.exports = { setIO, sendNotification, sendNotificationToMany };
