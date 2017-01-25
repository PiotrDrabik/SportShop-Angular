//require('./node_modules/test.scss');
var app = angular.module('app', ['customFilter','ngRoute']);

	app.directive('navMenu', function() {
	  return {
	    restrict: 'AE',
	    templateUrl: './directives/my-nav.html'
	  };
	});

	app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
		$locationProvider.hashPrefix('');
		$routeProvider
		.when('/',
		{
			templateUrl: '/views/done.html',
			controller: 'main'
		})
		.when('/done2',
		{
			templateUrl: '/views/done2.html',
			controller: 'main'
		})
		.otherwise({
			template: 'Brak strony!'
		});
	}]);

	app.controller('main', ['$scope', '$http', '$log', function($scope, $http, $log) {
		$scope.checkdata = function(somedata) {
			$scope.status = somedata.status;
	        $scope.data = somedata.data;
	        $log.info($scope.data);
		};
		
		$scope.shoppingCard = [];

		$scope.categSelected = "";

		$scope.categHeader = "Wszystkie artykuły";		
		
		$scope.showCard = function() {
			console.log('your shopping card have:');
			console.log($scope.shoppingCard);
			var count = 0;
			for (var value3 in $scope.shoppingCard) {
				count += $scope.shoppingCard[value3].price;
				console.log(typeof(count));
			}
			console.log('wynik' + count);
		};

		$scope.AddToCard = function(item2) {
			$scope.shoppingCard.push(item2);
		};

		$http({
			module: "GET",
			url: 'http://localhost:2403/products/'
		}).
		 then(function(success) {
          $scope.checkdata(success);
        }, function(failure) {
          $scope.checkdata(failure);
      	});

		$scope.clicked = function(wasClick) {
			//search button
			if (wasClick[0]=='~') {
				wasClick = wasClick.replace('~','');
				$scope.categSelected = wasClick;
				$scope.categHeader = "Rezultat wyszukiwania: " + wasClick;
			} else {
				//category change
				$scope.categSelected = wasClick;
				$scope.categHeader = wasClick;
				if (wasClick=="") {
					$scope.categHeader = "Wszystkie artykuły";
				}
			}
		};
	}]);