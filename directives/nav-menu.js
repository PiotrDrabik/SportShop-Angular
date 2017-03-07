module.exports = function(app) { 	
	app.directive('navMenu', function() {
	  return {
	    restrict: 'AE',
	    templateUrl: './directives/my-nav.html'
	  };
	});
}