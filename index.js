var utils=require("./utils.js");
var express = require("express");

var bodyParser=require("body-parser");
var methodOverride=require("method-override");


var filesctrl=require("./filesctrl.js");
var express = require('express');
var app = express();
//Configuracion
//Localizar ficheros estaticos

// muestra todos las peticiones por consola


//Permite cambiar el html con el método POST
app.use(bodyParser.urlencoded({extended:false})); //parse x-www-form-urlencoded

app.use(bodyParser.json()); //parsea json;

//Simula delete y put
app.use(methodOverride());
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {



    var leds={};

    for(var i=0;i<8;i++){

        leds[i.toString()]=new five.Led(i+4);

    }


    var volume=express.Router();

    volume.route('/volume')

        .post(function(req, res){

        utils.offAll(leds);

        utils.onSecuence(req.body.text, leds);

        res.status(200).jsonp({success:true});

    });


    volume.route('/files')

        .get(function(req, res){

        filesctrl.initFiles(function(obj){
            res.status(200).jsonp(obj);
        });



    })

        .post(function(req, res){

        filesctrl.initFiles(function(obj){
            res.status(200).jsonp(obj);
        }, req.body.newpath);



                            });



        app.use('/api', volume);

        app.listen(app.get('port'), function() {
            console.log('Node app is running on port', app.get('port'));
        });



    });


