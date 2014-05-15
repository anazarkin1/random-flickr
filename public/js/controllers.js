'use strict';

/* Controllers */

function MainCtrl($scope, $http, $routeParams){
    // $scope.form.hideImage=true;
    $scope.search = function(){
        $http.get('/api/randomPick/' + $scope.form.keyword).
            success(function(data){

                data.keyword = $scope.form.keyword;
                if (data.stat==="ok"){
                    $scope.form =data;
                    $scope.form.hideImage=false;
                }else{
                    $scope.form.hideImage=true;
                }
            });
    };

}
