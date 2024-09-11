const express = require('express');
const router = require('./src/routes/routes');
const session = require('express-session');

const sequelize = require('./src/database/db');

const app = express();

app.use(express.json());

app.use(session({
    secret: '*@SeCrEt@242628asd@*', // Substitua com uma chave secreta segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Certifique-se de configurar isso corretamente, especialmente se estiver usando HTTPS
}));

// Use EJS 
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// Testar a conexão com o banco de dados
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.listen(3030, () => {
    console.log('Server is running in PORT 3030...');
});
