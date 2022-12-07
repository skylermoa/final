const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } else {
    throw new Error('Not authorized');
  }
});


module.exports = { auth }