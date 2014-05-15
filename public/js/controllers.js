'use strict';

/* Controllers */

function ImageCtrl($scope, $http, $routeParams){
    $scope.search = function(){
        $http.get('/api/randomPick/' + $scope.form.keyword).
            success(function(data){
                $scope.form.url =data.url;
                console.log(data);
            });
    };

}
