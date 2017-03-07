angular.module('moduleCard', [])	
	.factory('shopCard', function() {
		return countCard = function() {
			$scope.count = 0;
			$scope.cardAmount = 0;
			for (var value3 in $scope.shoppingCard) {
				$scope.count += $scope.shoppingCard[value3].price * $scope.shoppingCard[value3].amount;
				$scope.cardAmount += $scope.shoppingCard[value3].amount;
			}
		};
});


