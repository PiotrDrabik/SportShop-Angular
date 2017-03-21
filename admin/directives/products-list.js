//require('./../services/data.js');

module.exports = function(admapp) { 	
	admapp.directive('prodList', function() {
	  return {
	    restrict: 'AE',
	    templateUrl: './directives/products-list.html'
	  };
	});
}