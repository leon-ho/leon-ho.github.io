CyaApp.service('Adventure', function($http, $timeout, Url){

	this.list = [];
	this.scenes = {};
	this.scene = {};
	this.showSurprise = false;
	this.active = false;
	this.currentId = null;

    var rain = document.getElementById('rain');
    var scream = document.getElementById('scream');
    scream.volume = 0.1;

	this.loadList = function(adventureList) {
		console.log('Loading list of adventures', adventureList.length);
		for(var i=0; i<adventureList.length; i++){
			this.getAdventure(adventureList[i]);
		}
	}

    this.getAdventure = function(adventureFile) {
    	var that = this;
    	console.log('Loading adventure', adventureFile);
		$http.get('adventures/'+adventureFile).success(function (data) {
			console.log('Successfully loaded', adventureFile);
			that.list.push(data);
		});
    }

    this.startAdventure = function(adventureId) {
    	var adventure = this.list[adventureId];
    	console.log('Starting adventure', adventure.title, adventure.description);
    	this.scenes = adventure.scenes;
    	this.active = true;
    	this.currentId = adventureId;
    	this.gotoScene('START');
    }

    this.gotoScene = function(destination) {
    	
    	if(destination=='END') {
    		console.log('END reached, returning to start.');
    		this.scene={};
    		this.scenes={};
    		this.currentId=null;
    		this.active = false;
    		return;
    	}

    	console.log('Going to scene', destination);

		// Flash the lightning
		restartAnimationById('foreground');

		// Go to the destination
		this.scene = this.scenes[destination];
		console.log(this.scene);

		// Reduce or increase Ambient Noise
		rain.currentTime = 9;
		if(this.scene.ambientNoise) {
			rain.volume = 1;
		} else {
			rain.volume = 0.5;
		}

		if(this.timeout){
			$timeout.cancel(this.timeout);
			console.log('Timeout was cancelled.');
		}

		// Check for Surprise
		if(this.scene.surprise) {
			var that = this;
			var timeUntilSurprise = 3000;
			var surpriseDuration = 2500;
			this.timeout = $timeout(function(){
				that.surpriseToggle(true);
				that.timeout = $timeout(function(){
					that.surpriseToggle(false);
					that.gotoScene(that.scene.choices[0].destination);
				}, surpriseDuration);
			}, timeUntilSurprise);
		}

		Url.updateParams(this.currentId, destination);

    }

    this.surpriseToggle = function(state) {
      console.log('Surprise!');
      this.showSurprise = state;
      if(this.showSurprise){
        scream.currentTime = 0;
        scream.play();
      } else {
        scream.pause();
      }
    }

    function restartAnimationById(id) {
      var el = document.getElementById(id);
      el.classList.remove('lightning');
      el.offsetWidth = foreground.offsetWidth;
      el.classList.add('lightning');
    }



});