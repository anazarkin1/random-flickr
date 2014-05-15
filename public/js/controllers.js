'use strict';

/* Controllers */

function MainCtrl($scope, $http, $routeParams){
    $scope.search = function(){
        $scope.form.hideImage=true;
        $http.get('/api/randomPick/' + $scope.form.keyword).
            success(function(data){

                console.log(data);
                data.keyword = $scope.form.keyword;
                if (data.stat==="ok"){
                    $scope.form =data;
                    $scope.form.hideImage= false;
                }
           });
    };

}
