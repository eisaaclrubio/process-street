var express = require('express');
var http = require('http')

var app = express();
var port = process.env.PORT || '5000';
app.set('port', port);
app.use(express.static('public'));
var server = http.createServer(app);
server.listen(port);
server.on('error', function(error){
  console.error(error);
});
server.on('listening', function() {
  console.log('The app is running on port 5000');
});