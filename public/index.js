var app=angular.module("myApp", ['lumx']);

app.controller('MainController', function($scope, $http, $timeout){
    $scope.files=[];

    $scope.path="";
    $scope.ext="mp3";


    $scope.playing=false;
    $scope.paused=false;

    setupAudioNodes();

    $scope.loadSound=function(){
        loadSound("temp/temp."+"mp3", function(){
            $scope.playing=true;
            $id("button_icon").classList.remove("fa", "fa-refresh", "fa-spin");

            $id("button_icon").classList.add("mdi", "mdi-pause");
            console.log($scope.files);
        });
    };

    onplay(function(average2){

        if(average2>0){

            var temp=parseInt(parseInt(average2)/13);
            $scope.value={text:"s on "+range(temp).join(" ")};
            $scope.getData();

        }

    });

    $scope.playMusic=function(){

        if($scope.playing===false && $scope.paused===false){
            console.log("play first");
            $id("button_icon").classList.remove("mdi", "mdi-play");

            $id("button_icon").classList.add("fa", "fa-refresh", "fa-spin");
            $scope.loadSound();

        }else{
            if($scope.paused===false && $scope.playing===true){
                console.log("pause");
                $scope.paused=true;
                $scope.playing=false;
                $id("button_icon").classList.remove("mdi", "mdi-pause");
                $id("button_icon").classList.add("mdi", "mdi-play");
                pause();
            }else{
                $scope.paused=false;
                $scope.playing=true;
                console.log("resume");
                $id("button_icon").classList.remove("mdi", "mdi-play");
                $id("button_icon").classList.add("mdi", "mdi-pause");
                resume();
            }
        }


    };







    $scope.getInitFiles=function(){
        $http.get('api/files/')
            .success(function(data, status, headers, config) {

            $scope.path=data.path;
            $scope.files=data.data;

        });
    };

    $scope.getInitFiles();

    $scope.getData = function(){
        if($scope.value!==undefined){
        $http.post('api/volume/', $scope.value)
            .success(function(data, status, headers, config) {



        });
        }
    };



    $scope.changeDirectory=function(dir){

        $http.post('api/files/', {newpath:dir})
            .success(function(data, status, headers, config) {

            $scope.path=data.path;
            $scope.files=data.data;

        });

    };

    $scope.clickonFile=function(file){

        if(file.directory){
            $scope.changeDirectory($scope.path+"/"+file.name);

        }else{
            sourceNode.stop();
            delete sourceNode.buffer;
            $scope.loadSound();
        }
    };



});


