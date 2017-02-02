var appadm = angular.module('appadm', ['ngRoute', 'ngAnimate']);

	appadm.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
		$locationProvider.hashPrefix('');
		$routeProvider
		.when('/login',
		{
			templateUrl: 'adminlogin.html',
			controller: 'authCtrl'
		})
		.when('/main',
		{
			templateUrl: 'adminmain.html',
			controller: 'authCtrl'
			/*scope: {
				authorization: "=",
			}*/
		})
		.otherwise({
			redirectTo: '/login'
		});
	}]);

	appadm.controller('mainadm', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) { 
		$scope.auth = false;

	}]);