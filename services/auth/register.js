const bcrypt = require('bcrypt');
const User = require('../../models/User');

// Register a new user
const registerService = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 400, data: { message: 'Email is already in use' } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return { status: 201, data: { message: 'User registered successfully', user: { name, email } } };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerService;