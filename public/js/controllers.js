'use strict';

/* Controllers */

function MainCtrl($scope, $http, $routeParams){
    $scope.search = function(){
        //hides img with potential pic, shows a loader gif
        $scope.form.hideImage=true;

        //call api to get a new pic
        $http.get('/api/randomPick/' + $scope.form.keyword).
            success(function(data){
                data.keyword = $scope.form.keyword;
                //Check status of json

                if (data.stat==="ok"){
                    $scope.form =data;
                    $scope.form.hideImage= false;
                }
           });
    };

}
