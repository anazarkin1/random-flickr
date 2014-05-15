'use strict';

/* Controllers */

function ImageCtrl($scope, $http, $routeParams){
    $scope.search = function(){
        $http.get('/api/randomPick/' + $scope.form.keyword).
            success(function(data){

                data.keyword = $scope.form.keyword;
                if (data.stat==="ok")
                    $scope.form =data;

            });
    };

}
