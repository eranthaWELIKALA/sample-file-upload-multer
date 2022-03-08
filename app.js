var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');

// Save in upload folder
// const upload = multer({ dest: 'uploads/' });

// Save in memory
// const storage = multer.memoryStorage()
// const upload = multer({storage: storage, dest: 'uploads/'});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.parse(file.originalname).ext)
    }
})

var upload = multer({ storage: storage })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.status(201).send();
})

module.exports = app;
