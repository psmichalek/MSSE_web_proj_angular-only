
var app = angular.module('accountControllerModule',[]);

app.controller('accountController',function($scope,authService,accountService){
    $scope.account=accountService.getAccountByHandle();

});
