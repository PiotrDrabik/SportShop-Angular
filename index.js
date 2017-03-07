
require('./style.scss');
require('angular');
require('./additional/angular-route.min.js');
require('./additional/angular-locale_pl-pl.js');
require('./additional/angular-animate.min.js');
require('./filters/customFilters.js');
require('./directives/appconfig.js');
require('./services/storage.js');

var app = angular.module('app', ['customFilter','ngRoute', 'ngAnimate', 'appConfig', 'moduleStorage']);

require('./directives/nav-menu.js')(app);

	app.controller('main', ['$scope', '$http', '$log', '$location', 'browStorage', '$interval', function($scope, $http, $log, $location, browStorage, $interval) { 
		$scope.checkdata = function(somedata) {
			$scope.status = somedata.status;
	        $scope.data = somedata.data;
	        $log.info($scope.data);
	        $scope.loadFavorite();
		};

		$scope.carousel1 = function() {
          var carousl = [];
          $scope.promise = $interval(function() {
          	if (carousl.length == 0) {
	          	carousl[0] = $('.carousel-item:first');
	          	carousl[1] = $('.carousel-item:nth-child(2)');
	          	carousl[2] = $('.carousel-item:nth-child(3)');
	          }
            if (carousl[0].hasClass('active')) {
            	carousl[0].removeClass('active');
            	carousl[1].addClass('active');
            } else if (carousl[1].hasClass('active')) {
            	carousl[1].removeClass('active');
            	carousl[2].addClass('active');
            } else if (carousl[2].hasClass('active')) {
            	carousl[2].removeClass('active');
            	carousl[0].addClass('active');
            }
              
          }, 5000);
        };
        $scope.stopCarousel = function() {
        	$interval.cancel($scope.promise);
        	$scope.closeCarousel = true;
        }
        $scope.promise;
        $scope.carousel1();
		$scope.shoppingCard = [];
		$scope.favorite = [];
		$scope.categSelected = "";
		$scope.checkBehave = "";
		$scope.categHeader = "Wszystkie artykuły";		
		$scope.cardAmount = 0;
		$scope.selectedItem = "";
		$scope.localData = false;
		$scope.graphicClose = false;
		$scope.back = function() {
			$scope.checkBehave = '';
			$scope.carousel1();
			$scope.closeCarousel = false;
			$location.url('/');
		};
		$scope.saveLocalStorage = function(user) {
			browStorage.saveLocalStorage(user);
			$scope.localData = false;
			$scope.showCard();
		};
		$scope.readLocalStorage = function(read) {
			if ((localStorage[read]!='')&&(localStorage[read]!=undefined)&&(localStorage[read]!=null)) {
						$scope.localData = true; 
					}
			return browStorage.readLocalStorage(read);
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
		
		$scope.data = [{'name' : 'Trwa pobieranie danych', 'description' : 'Poczekaj na załadowanie danych z serwera', 'category' : 'Ładowanie danych', 'price' : ''}];

		var newdata = new Firebase('https://phonestore-70aad.firebaseio.com/Products');
		console.log('new data from firebase');
		newdata.on("value", function(snapshot) {
			//var datanew = snapshot.val();
			$scope.data = snapshot.val();
			$scope.loadFavorite();
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
/*
		$http({
			method: "GET",
			url: 'http://localhost:2403/products/'
		}).
		 then(function(success) {
            $scope.checkdata(success);
        }, function(failure) {
            $scope.checkdata(failure);
      	});*/

		$scope.sendOrder = function(formData) {
			var newdata = new Firebase('https://phonestore-70aad.firebaseio.com/Orders');
			var order = angular.copy($scope.shoppingCard);
			var newOrder = formData;
			newOrder.products = order;
			newOrder.gift = false;
			$scope.localData = false;

    		console.log(newOrder);

    		var newPostRef = newdata.push();
    		newPostRef.set({newOrder});
    		/*$http({
				method: "POST",
				url: 'http://localhost:2403/orders/',
				data: tempData
				}).then(function(success) {
					console.log("OK");
					console.log(success);
				}, function(failure) {
	          		console.log("Problem");
					console.log(failure);
      			});*/

			$scope.shoppingCard = [];
			$scope.checkBehave = '';
			$scope.countCard();
			$location.url('/thankyou');

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