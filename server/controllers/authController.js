const authService = require('../services/auth');
const User = require('../models/user');
const { USER_ROLE } = require('../constant');

const users = [
  new User(1, 'admin', 'password', USER_ROLE.ADMIN),
  new User(2, 'user', 'password', USER_ROLE.USER)
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = authService.sign({ id: user.id, username: user.username, role: user.role });
    res.json({ token });
  } else {
    res.status(401).send('Username or password is incorrect');
  }
};
