//require('./node_modules/test.scss');
var app = angular.module('app', ['customFilter','ngRoute', 'ngAnimate']);

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
			templateUrl: 'views/productList.html'//,
			//controller: 'main'
		})
		.when('/card',
		{
			templateUrl: 'views/shoppingcard.html'//,
			//controller: 'main'
		})
		.otherwise({
			template: 'Brak strony!'
		});
	}]);

	app.controller('main', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) { 
		$scope.checkdata = function(somedata) {
			$scope.status = somedata.status;
	        $scope.data = somedata.data;
	        $log.info($scope.data);
		};
		
		$scope.shoppingCard = [];

		$scope.categSelected = "";

		$scope.categHeader = "Wszystkie artykuły";		
		
		$scope.back = function() {
			$location.url('/');
		};

		$scope.countCard = function() {
			$scope.count = 0;
			for (var value3 in $scope.shoppingCard) {
				$scope.count += $scope.shoppingCard[value3].price;
			}
		};

		$scope.showCard = function() {
			$scope.countCard();
			$location.url('/card');
		};

		$scope.remove = function(index) {
			$scope.shoppingCard.splice(index,1);
			$scope.countCard();
		};

		$scope.AddToCard = function(item2) {
			item2.amount = 1;
			$scope.shoppingCard.push(item2);
			$log.info($scope.shoppingCard);
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