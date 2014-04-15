UseradminApp.service('Apps', function($http){
	
	this.list = [];
	this.selected = false;

	this.search = function(searchQuery) {
		console.log('Searching for applications...');
		var that = this;
		$http({
			method: 'GET',
			url: 'json/applications.json'
		}).success(function (data) {
			that.list = data.applications;
		});
		return this;
	};

});