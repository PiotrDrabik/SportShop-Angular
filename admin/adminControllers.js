
appadm.controller('authCtrl', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) { 
		$scope.authenticate = function(user,pass) {
			$log.info('start auth');
			$http({
				method: "POST",
				url: "http://localhost:2403/users/login",
				config: {withCredentials: true},
				data: {'username': user,
				 'password': pass}
			}).
			 then(function(success) {
			 	$log.info(success);
			 	$scope.$parent.auth = true;
			 	$log.info($scope.$parent.auth);
			 	$location.path('/main');
	          //$scope.checkdata(success);
	        }, function(failure) {
	        	$log.info(failure);
	        	$scope.errormsg = 'Status: ' + failure.status + '; Komunikat: ' + failure.statusText; 
	          //$scope.checkdata(failure);
	      	});
		};
}]);

appadm.controller('ordersCtrl', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) { 
	//if ($scope.$parent.auth == true) {
			$scope.orders = [];
			$scope.choosedItem = [];
			$scope.details = function(index) {
				$scope.choosedItem = $scope.orders[index].products;
			};
			$scope.changeTab = function(idOn, idOff) {
				$('#'+idOn).addClass('active');
				$('#'+idOff).removeClass('active');
				$('#'+idOn+'1').addClass('active');
				$('#'+idOff+'1').removeClass('active');
				$scope.choosedItem = [];
			};

			$http({
				method: "GET",
				url: "http://localhost:2403/orders",
				config: {withCredentials: true}
			}).
			 then(function(success) {
			 	$log.info(success);
			 	$scope.orders = success.data;
			 	$log.info($scope.orders);
	        }, function(failure) {
	        	$log.info(failure);
	        	//$scope.errormsg = 'Status: ' + failure.status + '; Komunikat: ' + failure.statusText; 
	          //$scope.checkdata(failure);
	      	});	
	//}
}]);