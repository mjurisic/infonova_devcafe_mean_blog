//var http = require('http');
//http.createServer(function(req, res) {
//    res.setHeader('Content-type', 'text/html');
//    res.end('It is alive!!!');
//}).listen(3000);

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blog');

var app = express();
app.use(bodyParser.json());

var Post = mongoose.model('Post',
    {
        title: String,
        text: String,
        modified: {type: Date, default: Date.now},
        tags: [{type: String}]
    });

app.post('/post', function (req, res) {
    var newpost = req.body.post;
    newpost.tags = newpost.tags.split(',');
    var post = new Post(newpost);
    post.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.send(post._id);
    });
});

app.get('/posts', function (req, res) {
    Post.find(function (err, posts) {
        if (err) {
            console.log(err);
            res.send();
        } else {
            res.send(posts);
        }

    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get(/(.+)/, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/' + req.params[0]));
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});
