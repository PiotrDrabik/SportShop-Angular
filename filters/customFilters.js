angular.module('customFilter', [])	
	.filter('single', function() {
		return function(category) {
			var newArray = [];
			var check;
			for (var value in category) {
				check = true;
				for (var value2 in newArray) {
					if(category[value].category == newArray[value2].category) {
						check = false;
					}
				}
				if (check != false) {
					newArray.push(category[value]);
				}
			}
			return newArray;
		} 
		
	});