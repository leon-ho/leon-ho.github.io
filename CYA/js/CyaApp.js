var CyaApp = angular.module('CyaApp', []);

CyaApp.controller('MainCtrl', function($scope, Url, Adventure) {

    $scope.adventure = Adventure;
    $scope.loadedScene;
    $scope.loadedAdventure;

    var url = Url;

    function init() {

    	Adventure.loadList(['utflukt.json','wintercamp.json']);

    	var urlvars = url.getParams();
		if(urlvars) {
			$scope.loadedAdventure = urlvars.adventure[0];
			$scope.loadedScene = urlvars.scene[0];
		}

		/*
	      var cyaBase = new Firebase('https://cyadventure.firebaseio.com');
	      var auth = new FirebaseSimpleLogin(cyaBase, function(error, user) {
	        if (error) {
	          // an error occurred while attempting login
	          console.log(error);
	        } else if (user) {
	          // user authenticated with Firebase
	          user.img = 'http://graph.facebook.com/'+user.id+'/picture';
	          loadGame();
	        } else {
	          // user is logged out
	          auth.login('facebook', {preferRedirect: true});
	        }
	      });
		*/

    }

    init();

    $scope.startAdventure = function(adventureId) {
    	Adventure.startAdventure(adventureId);
    }

    $scope.continueAdventure = function(adventureId) {
		Adventure.startAdventure( $scope.loadedAdventure );
		Adventure.gotoScene( $scope.loadedScene );
    }

    $scope.gotoScene = function(destination) {
    	Adventure.gotoScene(destination);
    }

    function loadGame() {

      var sceneId = 'START';
      $scope.scene = adventure.scenes[sceneId]; 

    }

    //loadGame();
});

