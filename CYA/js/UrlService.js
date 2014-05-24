CyaApp.service('Url', function(){

  this.getParams = function() {
    if(location.href.indexOf('?')>-1) {
      var vars = {}, hash;
      var hashes = location.href.slice(location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if( vars[hash[0]] ) {
          vars[hash[0]].push(hash[1]);
        } else {
          vars[hash[0]] = [hash[1]];
        }
      }
      return vars;
    }
    return false;
  }

  this.updateParams = function(adventureId, destination) {

    // Update Window Location
    if( window.history.replaceState ) {
      var l = window.location;
      var newurl = l.protocol + '//' + l.host + l.pathname + "?adventure=" + adventureId + "&scene=" + destination;
      window.history.pushState({}, "title", newurl);
    }

  }

});