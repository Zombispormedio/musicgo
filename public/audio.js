if(!window.AudioContext){
    if(!window.webkitAudioContext){
        alert('no audiocontext found');
    }
    window.AudioContext = window.webkitAudioContext;
}


var context=new AudioContext();



var sourceNode;

var splitter;

var analyser, analyser2;

var javascriptNode;

var ctx = $id("canvas").getContext("2d");



var gradient = ctx.createLinearGradient(0,0,0,130);
gradient.addColorStop(1,'#000000');
gradient.addColorStop(0.75,'#ff0000');
gradient.addColorStop(0.25,'#ffff00');
gradient.addColorStop(0,'#ffffff');


function setupAudioNodes(){

    javascriptNode=context.createScriptProcessor(2048, 1, 1);

    javascriptNode.connect(context.destination);

    analyser=context.createAnalyser();

    analyser.smoothingTimeConstant=0.3;

    analyser.fftSize=1024;

    analyser2=context.createAnalyser();

    analyser2.smoothingTimeConstant=0.0;

    analyser2.fftSize=1024;

    sourceNode=context.createBufferSource();
    splitter=context.createChannelSplitter();
    sourceNode.connect(splitter);

    splitter.connect(analyser, 0,0);
    splitter.connect(analyser2, 1,0);


    analyser.connect(javascriptNode);

    sourceNode.connect(context.destination);


}

function loadSound(url, cb){

    var request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.responseType="arraybuffer";

    request.onload=function(){
        context.decodeAudioData(request.response, function(buffer){

            playSound(buffer);
            cb();

        }, onError);
    };

    request.send();
}


function playSound(buffer){
    sourceNode.buffer=buffer;
    sourceNode.start(0);
}


function onError(e){
    console.log(e);
}




function getAverageVolume(array){
    var values=0;
    var average;
    var length=array.length;

    for(var i=0; i<length;i++){
        values+=array[i];
    }

    average=values/length;
    return average;
}


function onplay(fn){
    javascriptNode.onaudioprocess=function(){

        var array=new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var average=getAverageVolume(array);

        var array2=new Uint8Array(analyser2.frequencyBinCount);
        analyser2.getByteFrequencyData(array2);
        var average2=getAverageVolume(array2);

        ctx.clearRect(0, 0, 60, 130);

        // set the fill style
        ctx.fillStyle=gradient;

        // create the meters
        ctx.fillRect(0,130-average,25,130);
        ctx.fillRect(30,130-average2,25,130);

        fn(average2);




    };
    sourceNode.onended = function() {

        javascriptNode.disconnect();
    };

}

function pause() {
    javascriptNode.disconnect();
    splitter.disconnect(analyser2, 1,0);
    analyser.disconnect(javascriptNode);

    sourceNode.disconnect(context.destination);
}

function resume() {
    javascriptNode.connect(context.destination);
    splitter.connect(analyser2, 1,0);
    analyser.connect(javascriptNode);

    sourceNode.connect(context.destination);
}


