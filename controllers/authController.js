const registerService = require('../services/auth/register');
const loginService = require('../services/auth/login');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerService(name, email, password);
    res.status(result.status).json(result.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const {  email, password } = req.body;
    const result = await loginService(email, password);
    res.status(result.status).json(result.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
