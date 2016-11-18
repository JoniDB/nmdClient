'use strict';

angular.module('app')

  .controller('indexController', function($scope, $location, $mdToast, osc) {

    $scope.status = 'not connected';
    $scope.sentence = 'no sentence requested';

    /****************
     * OSC Over UDP *
     ****************/

    // Also bind to a UDP socket.
    var udpPort = new osc.UDPPort({
        localAddress: "127.0.0.1",
        localPort: 57121
    });

    udpPort.on("message", function (oscMsg) {
      console.log("An OSC message was received!", oscMsg);
    });

    udpPort.on("error", function (err) {
        console.log(err);
    });

    udpPort.open();


    // SOCKET.IO
    //var socket = io.connect('http://localhost:3000');
    var socket = io.connect('http://nmdserver.herokuapp.com');

    $scope.getNewSentence = function() {
      console.log('get new sentence');
      socket.emit('getNewSentence');
    };

    socket.on('connect', function(){
      $scope.status = 'connected';
      //TO DO: replace by getCurrentSentence
      socket.emit('getNewSentence');
    });

    socket.on('disconnect', function(){
      $scope.status = 'disconnected';
    });

    socket.on('newSentence', function(data) {
      //console.log(data);
      $scope.$apply(function() {
        $scope.sentence = data.string;
        $scope.score = data.score;
        $scope.scoreWord = data.scorePerWord;//.status.string;
      });

      udpPort.send({
          address: "/newSentence",
          args: [data.string, 100]
      }, "127.0.0.1", 57121);
    });

  });
