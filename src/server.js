'use strict';

const express = require('express');
const favicon = require('express-favicon');
const fs = require('fs');
const mds = require('markdown-serve');
const path = require('path');
const url = require('url');

// Constants
var HOST = process.env.HOST || '127.0.0.1';
var PORT = process.env.PORT || 8080;

var app = express();

//app.use(express.static(__dirname + '/static/'));
app.set('views', path.join(__dirname, 'views'));

//app.use(favicon(__dirname + '/static/img/favicon.ico'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index.ejs');
});

// TODO: make /json/* return the json parsed file in pages
app.use('/json', mds.middleware({
    rootDirectory: path.resolve(__dirname, 'views/mkdown'),
}));

//app.use(mds.middleware({
//    rootDirectory: path.resolve(__dirname, 'views/pages'),
//    view: 'markdown'
//}));

// any url that was not caught before now, try to render as markdown
app.get('*', (req, res, next) => {
    if (req.method !== 'GET') next();

    // add the path + extension, so that the fs.access can find it
    var pathPrepend = "./views/";
    var pathname = 'mkdown' + url.parse(req.url, true).pathname;
    var extenstion = ".md"
    var fullpath = pathPrepend.concat(pathname).concat(extenstion);

    // check if the file exists in the pages directory
    fs.access(fullpath, fs.F_OK, (err) => {
        // if it does not exist, display the 404 page
        if (err) {
            res.render("pages/404");
            next();
            return
        }

        // otherwise render the markdown
        var markdownServer = new mds.MarkdownServer(path.resolve(__dirname, 'views/mkdown') );
        markdownServer.get(req.path, function(err, result) {
            if (err) {
                console.log(err);
                next();
                return;
            }

            // 'markdown' says to use markdown.ejs in the views dir
            res.render('markdown', { markdownFile: result });
        });
    });

});




app.listen(PORT, HOST, () => {
    console.log(`blog.brendanbeck.com running on http://${HOST}:${PORT}`);
});
