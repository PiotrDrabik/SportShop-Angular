angular.module('ordersController',[])	
	.controller('ordersCtrl', ['$scope', '$http', '$log', '$location','$firebaseObject', '$firebaseAuth', '$firebaseArray', function($scope, $http, $log, $location, $firebaseObject, $firebaseAuth, $firebaseArray) { 

			$scope.choosedItem = [];
			$scope.editItem = {};
			$scope.editItem.check = false;
			$scope.details = function(index) {
				$scope.choosedItem = $scope.items[index].products;
			};
			$scope.changeTab = function(idOn, idOff) {
				$('#'+idOn).addClass('active');
				$('#'+idOff).removeClass('active');
				$('#'+idOn+'1').addClass('active');
				$('#'+idOff+'1').removeClass('active');
				$scope.choosedItem = [];
			};
			$scope.edit = function(index) {
				$scope.editItem.check = true;
				$scope.editItem.name = $scope.data[index].name;
				$scope.editItem.description = $scope.data[index].description;
				$scope.editItem.price = $scope.data[index].price;
				$scope.editItem.id = $scope.data[index].id;
				$scope.editItem.index = index;
				console.log($scope.data[index].id);
			}
			$scope.saveChanges = function(id) {
				console.log('function was disabled to secure data');
				/* function disabled to secure data
				
				var hopperRef = newdata.child($scope.editItem.index);
				hopperRef.update({
					name : $scope.editItem.name,
					description : $scope.editItem.description,
					price : $scope.editItem.price
				});*/
			};
			
			$scope.items = [];

			var proddata = new Firebase('https://phonestore-70aad.firebaseio.com/Orders');
			proddata.on("child_added", function(snapshot) {
				 var tempobj = {};
				 tempobj.id = snapshot.key();
				 tempobj.firstname = snapshot.val().newOrder.firstname;
				 tempobj.lastname = snapshot.val().newOrder.lastname;
				 tempobj.email = snapshot.val().newOrder.email;
				 tempobj.zipandcity = snapshot.val().newOrder.zipandcity;
				 tempobj.street = snapshot.val().newOrder.street;
				 tempobj.products = snapshot.val().newOrder.products;
				 $scope.$apply(function () {
					 $scope.items.push(tempobj);
				 });
			});
var newdata = new Firebase('https://phonestore-70aad.firebaseio.com/Products');
		newdata.on("value", function(snapshot) {
			$scope.$apply(function () {
				$scope.data = snapshot.val();
			});
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

}]);