const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const key = "sonu1234"
const auth = async (req, res, next) => {
   
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, key );
    const user = await User.findOne({ _id: decoded._id, 'tokens': token });

    if (!user) {
        throw new Error();
    }
    
    req.token = token;
    req.user = user;
 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// authMiddleware.js



module.exports = auth ;
