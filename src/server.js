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

// TODO: add same 404 logic from brendanbeckcom
app.get('/', (req, res) => {
    res.render('pages/index.ejs');
});

// TODO: make /json/* return the json parsed file in pages
app.use('/json', mds.middleware({
    rootDirectory: path.resolve(__dirname, 'views/pages'),
}));

// TODO: right now, markdown.ejs has to be in /views
app.use(mds.middleware({
    rootDirectory: path.resolve(__dirname, 'views/pages'),
    view: 'markdown'
}));



app.listen(PORT, HOST, () => {
    console.log(`blog.brendanbeck.com running on http://${HOST}:${PORT}`);
});
