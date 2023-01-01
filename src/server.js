'use strict';

const express = require('express'),
      mds = require('markdown-serve'),
      path = require('path'),
      favicon = require('express-favicon');

// Constants
var HOST = process.env.HOST || '127.0.0.1';
var PORT = process.env.PORT || 8080;

var app = express();

//app.use(express.static(__dirname + '/static/'));
app.set('views', path.join(__dirname, 'views'));

//app.use(favicon(__dirname + '/static/img/favicon.ico'));
app.set('view engine', 'ejs');

app.use('/json', mds.middleware({
    rootDirectory: path.resolve(__dirname, 'views/markdownsrc'),
}));


app.use(mds.middleware({
    rootDirectory: path.resolve(__dirname, 'views/markdownsrc'),
    view: 'markdown'
}));

//app.get('/', (req, res) => {
//    res.send('hello world');
//});


app.listen(PORT, HOST, () => {
    console.log(`blog.brendanbeck.com running on http://${HOST}:${PORT}`);
});
