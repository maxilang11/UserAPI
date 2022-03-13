var express = require('express');
var app = express();
var fs = require("fs");
const readline = require('readline');



app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.txt", 'utf8', function (err, data) {
        res.end(data);
    });
})


app.get('/getNewUser/:number', function (req, res) {
    async function processLineByLine() {
        const fileStream = fs.createReadStream(__dirname + "/" + "users.txt");
        var exists = false

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            if (line === req.params.number){
                exists = true
            }
        }
        if(exists === true){
            console.log("User already exists")
            exists = false
        }
        else{
            fs.appendFile(__dirname + "/" + "users.txt", req.params.number + "\n", function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            res.end(req.params.number);
        }
    }
    processLineByLine();
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
