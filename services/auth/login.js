const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const loginService = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return { status: 400, data: { message: 'User doesnot exist' } };

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return {
        status: 400,
        data: { message: 'Incorrect password, please try again' },
      };
    }
    
    const token = jwt.sign({ email: existingUser.email }, process.env.JWTSECRET, { expiresIn: '3d' });

    return {
      status: 201,
      data: { message: 'Login successful', data: { email , token} },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = loginService;
