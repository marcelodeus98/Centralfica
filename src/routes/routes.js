const express = require('express');
const router = express.Router();
const multer = require('multer');
const session = require('express-session');

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

const ChatsController = require('../controllers/ChatsController');
const CurriculosController = require('../controllers/CurriculosController');
const ImgerController = require('../controllers/ImgerController');
const ImgerBanController = require('../controllers/ImgerBanController');
const IndezController = require('../controllers/IndezController');
const MultiController = require('../controllers/MultiController');
const OuvidoriaController = require('../controllers/OuvidoriaController');
const PlanosController = require('../controllers/PlanosController');
const StreamController = require('../controllers/StreamController');

const storage = multer.memoryStorage();
const uploadSingleFile = multer({ storage: storage }).single('image');
const uploadTwoFiles = multer({ storage: storage }).fields([
    { name: 'imagePC', maxCount: 1 },
    { name: 'imageMobi', maxCount: 1 }
]);

router.use(session({
    secret: '*@SeCrEt@242628asd@*', // Substitua com uma chave secreta segura
    resave: false,
    saveUninitialized: false
}));

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/recoverypassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);

router.post('/user/create', UserController.create);
router.post('/chats/create', uploadSingleFile, ChatsController.create);
router.post('/imgers/create', uploadSingleFile, ImgerController.create);
router.post('/imgersban/create', uploadSingleFile, ImgerBanController.create);
router.post('/indez/create', uploadTwoFiles, IndezController.create);
router.post('/multi/create', uploadSingleFile, MultiController.create);
router.post('/planos/create', uploadSingleFile, PlanosController.create);
router.post('/stream/create', uploadSingleFile, StreamController.create);

router.get('/users', AuthController, UserController.list);
router.get('/user/:id', AuthController, UserController.listUserId);
router.get('/user/edit/:id', AuthController, UserController.editUserPage);
router.get('/chats', AuthController, ChatsController.list);
router.get('/curriculos', AuthController, CurriculosController.list);
router.get('/curriculos/view/:id', AuthController, CurriculosController.view);
router.get('/curriculos/download/:id', AuthController, CurriculosController.download);
router.get('/imgers', AuthController, ImgerController.list);
router.get('/imgersban', AuthController, ImgerBanController.list);
router.get('/indez', AuthController, IndezController.list);
router.get('/multi', AuthController, MultiController.list);
router.get('/ouvidoria', AuthController, OuvidoriaController.list);

router.post('/user/toAlter/:id', AuthController, UserController.toAlter);

router.delete('/user/delete/:id', AuthController, UserController.delete);
router.delete('/chats/delete/:id', AuthController, ChatsController.delete);
router.delete('/curriculos/delete/:id', AuthController, CurriculosController.delete);
router.delete('/imgers/delete/:id', AuthController, ImgerController.delete);
router.delete('/imgersban/delete/:id', AuthController, ImgerBanController.delete);
router.delete('/indez/delete/:id', AuthController, IndezController.delete);
router.delete('/multi/delete/:id', AuthController, MultiController.delete);
router.delete('/ouvidoria/delete/:id', AuthController, OuvidoriaController.delete);
router.delete('/planos/delete/:id', AuthController, PlanosController.delete);
router.delete('/stream/delete/:id', AuthController, StreamController.delete);

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/home', AuthController, (req, res) => {
    res.render('home');
});

router.get('/pagina_principal', AuthController, async (req, res) => {
    try {
        const result = await IndezController.list(req, res, true);
        res.render('pagePrincipal', { indez: result });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_fica_descomplica', AuthController, async (req, res) => {
    try {
        const resultImger = await ImgerController.list(req, res, true);
        const resultImgerBan = await ImgerBanController.list(req, res, true);
        res.render('pageDescomplica', { imgers: resultImger, imgersban: resultImgerBan });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_assine_ja', AuthController, async (req, res) => {
    try {
        const resultPlanos = await PlanosController.list(req, res, true);
        const resultStreamers = await StreamController.list(req, res, true);
        res.render('pageAssineJa', { resultPlanos, resultStreamers });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_chats', AuthController, async (req, res) => {
    try {
        const result = await ChatsController.list(req, res, true);
        res.render('pageChats', { result });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_servicos', AuthController, async (req, res) => {
    try {
        const result = await MultiController.list(req, res, true);
        res.render('pageMulti', { result });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_trabalhe_conosco', AuthController, async (req, res) => {
    try {
        const pdfs = await CurriculosController.list(req, res, true);
        res.render('pageCurriculos', { pdfs });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_ouvidoria', AuthController, async (req, res) => {
    try {
        const result = await OuvidoriaController.list(req, res, true);
        res.render('pageOuvidoria', { result });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

router.get('/pagina_usuarios', AuthController, async (req, res) => {
    try {
        const users = await UserController.list(req, res, true);
        res.render('pageUsers', { users });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página principal.');
    }
});

module.exports = router;
