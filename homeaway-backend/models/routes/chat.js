const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const io = require('../server').io;

io.on('connection', socket => {
    socket.on('join', ({ userId }) => {
        socket.join(userId);
    });

    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
        io.to(receiverId).emit('receiveMessage', { senderId, message });
    });
});

module.exports = router;
