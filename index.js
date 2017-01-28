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
		})
		.when('/accept',
		{
			templateUrl: 'views/acceptcard.html'//,
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
		$scope.checkBehave = "";
		$scope.categHeader = "Wszystkie artykuły";		
		$scope.cardAmount = 0;
		$scope.back = function() {
			$scope.checkBehave = '';
			$location.url('/');
		};

		$scope.changeAmount = function(amount, index) {
			if (amount >= 1) {
				$scope.shoppingCard[index].amount = amount;
				$scope.checkBehave = 'add';
			}
			$scope.countCard();
		};

		$scope.countCard = function() {
			$scope.count = 0;
			$scope.cardAmount = 0;
			for (var value3 in $scope.shoppingCard) {
				$scope.count += $scope.shoppingCard[value3].price * $scope.shoppingCard[value3].amount;
				$scope.cardAmount += $scope.shoppingCard[value3].amount;
			}
		};

		$scope.showCard = function() {
			$scope.countCard();
			$scope.checkBehave = '';
			$location.url('/card');
		};

		$scope.acceptCard = function() {
			$scope.checkBehave = '';
			$location.url('/accept');	
		};

		$scope.remove = function(index) {
			$scope.shoppingCard.splice(index,1);
			$scope.checkBehave = 'delete';
			$scope.countCard();
		};

		$scope.AddToCard = function(item2) {
			item2.amount = 1;
			$scope.shoppingCard.push(item2);
			$scope.countCard();
		};

		$http({
			method: "GET",
			url: 'http://localhost:2403/products/'
		}).
		 then(function(success) {
          $scope.checkdata(success);
        }, function(failure) {
          $scope.checkdata(failure);
      	});

		$scope.sendOrder = function(formData) {
			var order = angular.copy($scope.shoppingCard);
			var tempData = formData;
			tempData.products = order;
			tempData.gift = false;
			/*
			var tempData2 = JSON.stringify(formData);
			try {
        		JSON.parse(tempData);
    		} catch (e) {
        		console.log("to nie JSON");
        		console.log(e);
    		} 
    		tempData = formData;
    		console.log(tempData);
			tempData = JSON.stringify(formData);
			console.log(tempData);
			try {
        		JSON.parse(tempData);
    		} catch (e) {
        		console.log("to nie JSON");
        		console.log(e);
    		} 
    		console.log("to JSON");*/
    		console.log(tempData);
    		$http({
			method: "POST",
			url: 'http://localhost:2403/orders/',
			data: tempData
			}).then(function(success) {
				console.log("OK");
				console.log(success);
			}, function(failure) {
          		console.log("Problem");
				console.log(failure);
      	});




		};

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