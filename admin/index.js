require('./style-admin.scss');
require('angular');
require('./assets/angularfire.min.js');
require('./assets/angular-route.min.js');

var appadm = angular.module('appadm', ['ngRoute', 'firebase','adminCtrl', 'ordersController']);

require('./controllers/adminControllers.js');
require('./controllers/ordersControllers.js');
require('./directives/products-list.js')(appadm);

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
			controller: 'ordersCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		});
	}]);

	appadm.controller('mainadm', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) { 
		$scope.auth = false;

	}]);