var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const cors = require('cors');

const db = require('./config/database')
db('mongodb://localhost:27017/4not2020')

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let teste = require('./routes/teste');
app.use('/teste', teste);

const responsavel = require('./routes/responsavel');
app.use('/responsavel', responsavel);

const cuidador = require('./routes/cuidador');
app.use('/cuidador', cuidador);

const idoso = require('./routes/idoso');
app.use('/idoso', idoso);

const medicamento = require('./routes/medicamento');
app.use('/medicamento', medicamento);

const horario = require('./routes/horario');
app.use('/horario', horario);

const confirmar_acao = require('./routes/confirmar_acao');
app.use('/confirmar-acao', confirmar_acao);

module.exports = app;
