const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Página de login
exports.getLogin = (req, res) => {
  res.render('login');
};

// Processar login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    return res.redirect('/recipes');
  } else {
    return res.redirect('/login');
  }
};

// Página de cadastro
exports.getRegister = (req, res) => {
  res.render('register');
};

// Processar cadastro
exports.postRegister = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.redirect('/register');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await User.create({ name, email, password: hashedPassword });

  res.redirect('/login');
};

// Processar logout
exports.postLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
