var app = angular.module('appRouter', ['ui.router','app2']);
app.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('','/aaa');
    $stateProvider
        .state('aaa', {
            url: '/aaa',
            templateUrl: '1.html'
        })
        .state('bbb', {
            url: '/bbb',
            templateUrl: '2.html',
            controller:'ctrl2'
        })
})