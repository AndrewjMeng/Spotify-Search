'use strict';

const express = require('express');
const http = require('http');
const jquery = require('jquery')
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('.'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/spotify_search.html');
});
// function test() {
//   console.log('dog')
//   jquery.post("dev.getethos.com")
// }
// test()

app.set('port', port);
const ip = `127.0.0.1`;
const server = app.listen(app.get('port'));
console.log('Listening on port ', port);
