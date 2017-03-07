angular.module('appConfig', [])	
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
		//$locationProvider.hashPrefix('');
		$routeProvider
		.when('/',
		{
			templateUrl: 'views/productList.html'
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
		.when('/thankyou',
		{
			templateUrl: 'views/thankyoupage.html'
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
		 $locationProvider.html5Mode(true);
	}]);