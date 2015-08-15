var fs=require("fs");
var config=require("./config.js");
var path = require('path');
function isDirectory(str){
    return fs.lstatSync(str).isDirectory();
}

var extAudios=[".mp3", ".ogg", ".m4a"];

function isAudio(str){
    return extAudios.indexOf(path.extname(str))>-1;
}



module.exports={


    initFiles:function(cb, path){
        var actual=path===undefined?config.init_path:path;
    fs.readdir(actual, function (err, files) {

        if (err) throw err;
        var obj={success:true, path:actual};

        obj.data=files.map(function(a){
            return {name:a, directory:isDirectory(actual+"/"+a)};
        }).filter(function(a){

            return a.directory || isAudio(a.name);
        });

        cb(obj);


    });
    }

};
