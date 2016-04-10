
const restBasePath = 'http://localhost:8080/api/';
const GENERIC_ERROR_MESG='An error has occured while trying to authenticate you. Please try again.';
const STATUS_404_ERROR_MESG='Resource was not found (404).';
const STATUS_500_ERROR_MESG='An error has occured while trying to authenticate you. Please try again. (500).';
const AUTHORIZED_ROLE='ROLE_READ';

function isAvailable(v) { return _.isUndefined(v) || _.isNull(v) || _.isNaN(v) || v==="" ? false : true; }

var app = angular.module('authServiceModule',[]);

app.factory('authService',function($http,$rootScope,accountService){
    
    var service=this;
    
    var _creds={username:'',token:'',roles:[]}

    function _getCreds(){
        return _creds;
    }

    function _setCreds(o){
        if( !angular.isUndefined(o) ){
            _creds.token=( angular.isUndefined(o.token) ) ? _creds.token : o.token;
            _creds.roles=( angular.isUndefined(o.roles) ) ? _creds.roles : o.roles;
            $rootScope.$emit('authChanged',_creds);
        }
        return _creds;
    }

    function _authUser(scope){
        var url = restBasePath+'login';
        var payload ={username:scope.un,password:scope.pw};
        $http.post(url,payload)
        .then(function(resp){ 
                console.log('Request succeeded.',resp);
                if(resp.status==200) service.setCreds({username:resp.data.username,token:resp.data.access_token,roles:resp.data.roles});
                else {
                    scope.alert.active=true;
                    scope.alert.mesg=GENERIC_ERROR_MESG+' ('+resp.status+').';
                    scope.resetall(5000);
                }
            },
            function(fail){ 
                // request failed
                console.log('Request failed.',fail);
                scope.alert.active=true;
                if(fail.status==404) scope.alert.mesg=STATUS_404_ERROR_MESG;
                if(fail.status==500) scope.alert.mesg=STATUS_500_ERROR_MESG;
                else scope.alert.mesg=GENERIC_ERROR_MESG+' ('+fail.status+').';
                scope.resetall(5000);
            });
    }

    function _isAuthed(){
        var authed=false;
        var check=service.getCreds();
        if( isAvailable(check.token) && isAvailable(check.username) && isAvailable(check.roles) ){
            var acct=accountService.getAccountByHandle(check.username);
            if( isAvailable(acct) && _.find(check.roles,AUTHORIZED_ROLE) ) authed=true;
        }
        return authed;
    }

    service.isAuthenticated=_isAuthed;
    service.getCreds=_getCreds;
    service.setCreds=_setCreds;
    service.authenticate=_authUser;
    return service;

});

