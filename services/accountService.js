
var app = angular.module('accountServiceModule',[]);

app.factory('accountService',function($http,$q,$log){
    
    var service=this;
    
    var _account ={
    	handle : '',
		name : '',
		email : '',
		password : '',
		dateCreated : '',
		enabled : '',
		accountExpired : '',
		accountLocked : '',
		passwordExpired : ''
    }

    function _getAccount(){
        return _account;
    }

    function _setAccount(o){
        if( !angular.isUndefined(o) ){
            _account.handle=( angular.isUndefined(o.handle) ) ? _account.handle : o.handle;
            _account.name=( angular.isUndefined(o.name) ) ? _account.name : o.name;
            _account.email=( angular.isUndefined(o.email) ) ? _account.email : o.email;
            _account.password=( angular.isUndefined(o.password) ) ? _account.password : o.password;
            _account.created=( angular.isUndefined(o.dateCreated) ) ? _account.created : o.created;
            _account.enabled=( angular.isUndefined(o.accountExpired) ) ? _account.enabled : o.enabled;
            _account.locked=( angular.isUndefined(o.accountLocked) ) ? _account.locked : o.locked;
            _account.pwexpired=( angular.isUndefined(o.passwordExpired) ) ? _account.pwexpired : o.pwexpired;
        }
        return _getAccount();
    }

    function _fetchAccount(handle){
    	
    	var qq=$q.defer();

    	function _handleFailure(fail){
    		if( !angular.isUndefined(fail) ) $log(fail);
    		qq.resolve(undefined);
    	}

    	if( !angular.isUndefined(handle) )
    		$http.get(restBasePath+'account/'+handle)
    		.then(function(resp){
    			if(resp.status==200) qq.resolve( _setAccount(resp.data) );
    			else _handleFailure(resp);
    		}, _handleFailure(resp));

    	return qq.promise;
    }

    service.getAccountByHandle=_fetchAccount;
    service.getAccount=_getAccount;
    service.setAccount=_setAccount;
    return service;

});
