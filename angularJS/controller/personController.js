var app = angular.module('myapp',[]);
app.controller('myctrl',function($scope){
	$scope.persons = [
			{name:'zhaNgSan',city:"beijing",age:50},
			{name:'liSi',city:"changchun",age:30},
			{name:'wANgwU',city:"hebei",age:40}
		];
})