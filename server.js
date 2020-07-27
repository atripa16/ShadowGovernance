var express = require('express');
var app = express();

// define routes here..

app.get('/create -user', function (req, res) {
    console.log("Req came")
    res.send("Hello World").status(200)
})

var server = app.listen(5000, function () {
    console.log('Node Exptress server is running..');
});