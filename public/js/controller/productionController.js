/**
 * Created by mh4047 on 2/28/15.
 * productionController controls the production div in the main page index.html
 */


app.controller('productionController', function($scope, $http){
    $scope.rules = [
        [
            { text: 'School' },
            { text: 'DEFINED_BY' },
            { text: 'Organization' }
        ], [
            { text: 'JobTitle' },
            { text: 'SYNONYM_OF' },
            { text: 'Job' }
        ]


    ];
    /*$scope.remove = function(){

     }
     /*$scope.tags = [
     { text: 'School' },
     { text: 'contains' },
     { text: 'Name' }
     ];*/
});