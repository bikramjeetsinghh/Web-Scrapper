const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

const PORT = process.env.PORT || 8004;

const http = require('http');

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(__dirname + '/screenshots'));

const dbConnection = require('./app/dbConnection');
const websites = require('./app/Websites/index');

app.options('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Referer,Origin,X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


app.use('/websites', websites);

const server = http.createServer(app).listen(PORT, () => {
  console.log(`server listening on port ${PORT}!`);
  dbConnection();
});
