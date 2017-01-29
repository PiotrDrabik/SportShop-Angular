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
			templateUrl: 'views/shoppingcard.html'
		})
		.when('/item',
		{
			templateUrl: 'views/item.html'
		})
		.when('/favorite',
		{
			templateUrl: 'views/favorite.html'
		})
		.when('/accept',
		{
			templateUrl: 'views/acceptcard.html',
			resolve: {
				function() {
					console.log("Changing routing to /accept");
				}
			}
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
	        $scope.loadFavorite();
		};
		
		$scope.shoppingCard = [];
		$scope.favorite = [];
		$scope.categSelected = "";
		$scope.checkBehave = "";
		$scope.categHeader = "Wszystkie artykuły";		
		$scope.cardAmount = 0;
		$scope.selectedItem = "";
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

		$scope.saveLocalStorage = function(user) {
			if (typeof(Storage) != "undefined") {
				if (user) {
					localStorage.setItem("user.firstname", user.firstname);
					localStorage.setItem("user.lastname", user.lastname);
					localStorage.setItem("user.email", user.email);
					localStorage.setItem("user.zipandcity", user.zipandcity);
					localStorage.setItem("user.street", user.street);
				}
				$scope.showCard();
			}
		};

		$scope.loadFavorite = function() {
			if (typeof(Storage) != "undefined") {
				var temp = "";
				if (localStorage["favorite"]) {
						temp = localStorage["favorite"];
						var final = temp.split(";");
						for (var value3 in $scope.data) {
							$scope.data[value3].favorite = false;
							for (var value4 in final) {
								if (($scope.data[value3].id == final[value4])&&($scope.data[value3].favorite != true)) {
									$scope.data[value3].favorite = true;
									$scope.favorite.push($scope.data[value3]);	
								}
							}	
						}
				} else {
					for (var value3 in $scope.data) {
							$scope.data[value3].favorite = false;
				}
			}
			}
		};

		$scope.deleteFavorite = function(id) {
			var temp = "";
			if (localStorage["favorite"]) {
				temp = localStorage["favorite"];
				var final = temp.split(";");
				temp = "";
				for (var value4 in final) {
					if(id != final[value4]) {
						temp += final[value4]+';';
					}
				}
				localStorage.setItem("favorite",temp);
				for (var value4 in $scope.favorite) {
					if($scope.favorite[value4].id == id) {
						$scope.favorite.splice(value4,1);
					}
			}
			if ($scope.favorite.length == 0) {
				localStorage.setItem("favorite",'');
			}
		}
		};

		$scope.changeFavorite = function(item, action) {
			if (action == 'list') {
				$scope.checkBehave = '';
				$location.url('/favorite');
			} else {
				for (var value4 in $scope.data) {
					if ($scope.data[value4].id == item.id) {
						var index = value4;
					}
				}		
			}
			if ((action == 'add')&&(item.favorite == false)) {
				$scope.favorite.push(item);	
				if (typeof(Storage) != "undefined") {
					var temp = "";
					if (localStorage["favorite"]) {
						temp = localStorage["favorite"];
					}
					temp += item.id+';';
					localStorage.setItem("favorite",temp);
					$scope.data[index].favorite = true;
				}
			} else {
			if ((action == 'add')&&(item.favorite == true)) {
				$scope.data[index].favorite = false;
				$scope.deleteFavorite(item.id);
				}
			}
		};

		$scope.showItem = function(item) {
			$scope.selectedItem = item;
			$location.url('/item');
		};

		$scope.readLocalStorage = function(read) {
			if (typeof(Storage) != "undefined") {
				if (localStorage[read]) {
					return localStorage[read];	
				}
			}
		};

		$scope.showCard = function() {
			$scope.countCard();
			$scope.checkBehave = '';
			$location.url('/card');
		};

		$scope.hintCart = function(order) {
			if ((order=='add' )&& ($scope.shoppingCard.length > 0)) {
				var hintCard = "<div id='hintItems'><ul>";
				var limit = false;
				for (var value4 in $scope.shoppingCard) {
					hintCard += '<p><li>'+$scope.shoppingCard[value4].name+' ('+$scope.shoppingCard[value4].amount+')</li></p>';
					/*
					if (value4>=3) {
						if (limit!=true) {
							hintCard += '<p><li>'+$scope.shoppingCard[value4].name+' ('+$scope.shoppingCard[value4].amount+') ....</li></p>';
							limit = true;
						}
					} else {
						
					}*/
			}
				hintCard += '</ul></div';
				$("#hintCart").append(hintCard); // "#hintCart" 
			}
			if (order=='delete') {
				$( "#hintItems" ).remove();
			}
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
			var newProduct = true;
			for (var value3 in $scope.shoppingCard) {
				if ($scope.shoppingCard[value3].id == item2.id) {
					$scope.shoppingCard[value3].amount += 1;
					newProduct = false;
				}
			};
			if (newProduct == true) {
				item2.amount = 1;
				$scope.shoppingCard.push(item2);
			}
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