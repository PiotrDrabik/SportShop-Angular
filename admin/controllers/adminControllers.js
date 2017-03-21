angular.module('adminCtrl',[])
	.controller('authCtrl', ['$scope', '$http', '$log', '$location', '$firebaseObject', '$firebaseAuth', '$interval', function($scope, $http, $log, $location, $firebaseObject, $firebaseAuth, $interval) { 

		  var config = {
		    apiKey: "AIzaSyDmEHqllPgQqTIMjLa8HW3L1tZEzuhoS9o",
		    authDomain: "phonestore-70aad.firebaseapp.com",
		    databaseURL: "https://phonestore-70aad.firebaseio.com",
		    storageBucket: "phonestore-70aad.appspot.com",
		    messagingSenderId: "405964616517"
		  };
		  firebase.initializeApp(config);
		  const auth = firebase.auth();
		  $scope.localauth = false;				  

		$scope.authenticate = function(user,pass) {
		  (function() {
		  
		  var promise = auth.signInWithEmailAndPassword(user, pass);
		  promise.catch(e => {
		  	$scope.$apply(function () {
		  		$scope.errormsg = e.message; });	
		    }).then(e => {
		  	$scope.localauth = true;
		  });
		  Promise.race([promise]).then(function(value) {
		  		$scope.$apply(function () {
		  			$scope.$parent.auth = true;
		  			$location.path('/main');
		  		 });
		  		
		  });
		})();
		};
		firebase.auth().onAuthStateChanged(function(user) {
			if ((user)&&($scope.localauth == true)) {
				$scope.$parent.auth = true;
				$location.path('/main');
			} else {}
			});
}]);

