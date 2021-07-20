const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
var mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '****',
    database: '****'
});

app.listen(4200, () => console.log(`Example app listening on port 4200!`));

app.post('/addCandidate', function (req, res) {
    var name = req.body.name;
    var votes = 0;
    var c = req.body.code;
    con.query('select  * from codes where codes="' + c + '"', (err, response1) => {
        if (response1.length == 0) {
            con.query('insert into codes values("' + c + '")', (err, response) => {
                if (err) throw err;
                
            })
        }
        con.query('insert into candidates values("' + c + '","' + name + '","' + votes + '")', (err, response) => {
            if (err) throw err;
            else {
                
                res.json("1")
            }
        })
    })
    
});



var code;
app.post('/code', function (req, res) {
    console.log(req.body.code);
    code = req.body.code;
    res.json("1")
});


app.post("/allcodes", (req, res) => {
    var sql = "select * from codes where codes ='" + req.body.code + "';";
    con.query(sql, function (err, rows) {
        if (err) { sendError(err, res); }
        if(rows.length==0)
        res.json("false");
        else
        res.json("true");
    })
});


app.post("/allusers", (req, res) => {
    var sql = "select name from candidates where code ='" + req.body.code + "';";
    con.query(sql, function (err, rows) {
        if (err) { sendError(err, res); }
        res.json(rows);
    })
});

app.post("/get", (req, res) => {
    var sql = "select name from candidates where code ='" + req.body.code + "';";
    con.query(sql, function (err, rows) {
        if (err) { sendError(err, res); }
        res.json(rows);
    })
});

app.post("/allvotes", (req, res) => {
    var sql = "select votes from candidates where code='" + req.body.code + "';";
    con.query(sql, function (err, rows) {
        if (err) { sendError(err, res); }

        res.json(rows);
    })
});


app.post("/id", (req, res) => {
    var sql = "select * from voters where code ='" + req.body.code + "' and id='"+req.body.id+"';";
    con.query(sql, function (err, rows) {
        if (err) { sendError(err, res); }
        if(rows.length==1){
            res.json("1");
        }
        else{
            res.json("0");
        }
    })
});


app.post('/voteAperson', function (req, res) {
    sql = 'update candidates set votes=votes+1 where name="' + req.body.name + '" and code="' + req.body.code + '" ;'
    sql2='insert into voters values("'+req.body.code+'","'+req.body.id+'");'
    con.query(sql, function (err, response) {
        if (err) { throw err; }
        else{
            con.query(sql2, function (err, rp) {
                if (err) { throw err; }
                
            })
        console.log((response));
        res.json(response);
        }
    });
})


