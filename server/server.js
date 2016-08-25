const express = require('express');
const app = express();
const path = require('path');
const api = require('./api.js');

app
  .use(express.static(path.join(__dirname, 'views')))
  .use(express.static(path.join(__dirname, '..', 'build')))
  .use(api);

  console.log(path.join(__dirname, '..', 'build'));

app.listen(3000);
console.log('server listening on port 3000');

module.exports = app;
