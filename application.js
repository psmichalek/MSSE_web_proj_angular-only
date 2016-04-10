// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= encoding UTF-8
//= require jquery-2.2.0.js
//= require ../bower/bootstrap/bootstrap.js
//= require ../bower/angular/angular.js
//= require ../bower/angular-ui-router/release/angular-ui-router.js
//= require ../bower/lodash/lodash.js
//= require_self
//= require_tree app

var dependancies = [
	'ui.router',
	'ui.bootstrap',
	'authServiceModule',
	'messageServiceModule',
	'accountServiceModule',
    'loginControllerModule',
    'accountControllerModule'
];


var app = angular.module('tweedeldeeApp',dependancies);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$provide){
    
    $provide.factory('tokenInjector',function($rootScope){
        var _token;
        $rootScope.$on('authChange',function(event,creds){
            if( !_.isUndefined(creds.token) ) _token=creds.token;
            else _token=undefined;
        });
        return {
            request : function(config){
                if( !_.isUndefined(_token) ) config.headers['X-Auth-Token']=_token;
                return config;
            }
        }
    });

    $httpProvider.interceptors.push('tokenInjector');

    $stateProvider.state({
        name: 'login',
        templateUrl: 'templates/login.tpl.html',
        controller: 'loginController'
    });

    $stateProvider.state({
        name: 'account',
        templateUrl: 'templates/account.tpl.html',
        controller: 'accountController'
    });
    
});

app.run(function($state){

    $state.go('login');

});
