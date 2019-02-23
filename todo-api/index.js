var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var passport = require('passport');
var auth = require('./auth');
passport.use(auth);

var multer  = require('multer');
var upload = multer({ dest: 'banner/' });

var { check, validationResult } = require('express-validator/check');

var app = express();
var db = mongojs('todo', ['tasks', 'users']);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post('/upload', upload.single('banner'), function(req, res) {
    res.json(req.file);
});

app.get('/tasks', function(req, res) {
    var status = req.query.status;

    if(status == undefined) {
        db.tasks.find(function(err, data) {
            res.json(data);
        });
    } else {
        db.tasks.find({
            status: parseInt(status)
        }, function(err, data) {
            res.json(data);
        });
    }
});

// curl -X POST localhost:3000/tasks -d "subject=Bread"
app.post('/tasks', [
    check('subject').isLength({ min: 3 })
], function(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var subject = req.body.subject;

    db.tasks.insert({
        "subject": subject,
        "status": 0
    }, function(err, data) {
        res.json(data);
    });
});

// curl -X DELETE localhost:3000/tasks/<38924kjsdfi92342jrwe>
app.delete('/tasks/:id', function(req, res) {
    var id = req.params.id;
    db.tasks.remove({
        "_id": mongojs.ObjectId(id)
    }, function(err, data) {
        res.json(data);
    });
});

app.delete('/tasks', function(req, res) {
    db.tasks.remove({
        "status": 1
    }, function(err, data) {
        res.json(data);
    });
});

// curl -X PUT localhost:3000/tasks/<id> -d "status=1"
app.put('/tasks/:id', function(req, res) {
    var id = req.params.id;
    var status = req.body.status;

    db.tasks.update(
        { "_id": mongojs.ObjectId(id) },
        { $set: { status: parseInt(status) } },
        { "multi": true },
        function(err, data) {
        res.json(data);
    });
});

app.get('/tasks/:id', function(req, res) {
    var id = req.params.id;
    db.tasks.find({
        "_id": mongojs.ObjectId(id)
    }, function(err, data) {
        res.json(data);
    });
});
// curl -X POST localhost:8000/login -d "username=bob&password=123456"
app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.users.find({ username, password }, function(err, data) {
        if(data.length) {
            var token = jwt.sign(data[0], 'secret');
            res.status(200).json({ token });
        } else {
            res.status(401).json({ msg: 'Unauthorize' });
        }
    });
});

// curl -X GET localhost:8000/admin -H "Authorization: Bearer <token>"
app.get('/admin', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ content: 'Admin Panel' });
});

app.listen(8000, function() {
    console.log('Express server running at 8000');
});
