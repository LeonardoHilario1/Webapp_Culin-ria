const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const ejs = require('ejs');
const sequelize = require('./src/db'); // Importar a instância do Sequelize

const app = express();

// Configurar o middleware method-override
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src/views'));

const authRoutes = require('./src/routes/authRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');

app.use(authRoutes);
app.use(recipeRoutes);

// Adicionar rota para a URL raiz
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Sincronizar modelos com o banco de dados
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
