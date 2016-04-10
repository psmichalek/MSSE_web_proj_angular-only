
var app = angular.module('loginControllerModule',[]);

app.controller('loginController',function($scope,$state,$timeout,authService){
    
    _init(1);

    function _init(ms) { 
        var timer = (angular.isUndefined(ms))?5000:ms;
        $timeout(function(){ _resetalert(); _resetunandpw(); },timer);
    }
    function _resetalert(){ $scope.alert={active:false,mesg:''}; }
    function _resetunandpw(){ $scope.un=''; $scope.pw=''; }
    function _isValid(){ return ($scope.un!='' && $scope.pw!='')?true:false; }

    $scope.resetall = function(ms){ _init(ms) }
    $scope.login = function(){ if( _isValid($scope.un) && _isValid($scope.pw) ) authService.authenticate($scope); }

});