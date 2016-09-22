(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.msg = "";
        $scope.CheckNumberOfDishes = function() {
            if($scope.dishes == "") {
                $scope.msg = "Please enter data first";
                $scope.msgColor = "alert alert-danger";
            }
            else{
                var  size = $scope.dishes.split(",").length;
                if(size < 4){
                    $scope.msg = "Enjoy!";
                    $scope.msgColor = "alert alert-success";
                }
                else{
                    $scope.msg = "Too much!";
                    $scope.msgColor = "alert alert-success";

                }
            }
        }
    };
})();
