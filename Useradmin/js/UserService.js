UseradminApp.service('Users', function($http){
	
	this.list = [];
	this.selected = false;
	this.applications = [];
	this.applicationFilter = [];

	this.search = function(searchQuery) {
		console.log('Searching for users...');
		var that = this;
		$http({
			method: 'GET',
			url: 'json/users.json'
		}).success(function (data) {
			that.list = data.result;
		});
		return this;
	};
	
	this.loadApplications = function() {
		console.log('Searching for users...');
		var that = this;
		$http({
			method: 'GET',
			url: 'json/applications.json'
		}).success(function (data) {
			that.applications = data.applications;
		});
		return this;
	};

});