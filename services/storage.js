angular.module('moduleStorage', [])	
	.factory('browStorage', function() {
		return {
			saveLocalStorage: function(user) {
			if (typeof(Storage) != "undefined") {
					if (user) {
						localStorage.setItem("user.firstname", user.firstname || '');
						localStorage.setItem("user.lastname", user.lastname || '');
						localStorage.setItem("user.email", user.email || '');
						localStorage.setItem("user.zipandcity", user.zipandcity || '');
						localStorage.setItem("user.street", user.street || '');
					}
				}
			},
			readLocalStorage: function(read) {
			if (typeof(Storage) != "undefined") {
				if (localStorage[read]) {
					if (localStorage[read]!='') {
					}
					return localStorage[read]+'*';	
				} 
			}
		}

}

});