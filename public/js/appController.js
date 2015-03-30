/**
 * Created by Maeda on 2/9/2015.
 *
 * Controllers for index.html
 */

var app = angular.module('pdfApp', ['ngRoute',  'ui.bootstrap', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.edit']);

app.config(['$routeProvider', function ($routeProvider) {

}]);



app.controller('toolboxController', function($scope){
    //Indicates the mode in which the user is in.
    $scope.selectOn         = false;
    $scope.annotate         = false;

    $scope.setAllButtonsOff = function (){
        $scope.selectOn     = false;
        $scope.annotate     = false;
    };

    $scope.toggleSelectOn   = function (){
        $scope.selectOn     = !$scope.selectOn;
        $scope.drawRectangle();
        console.log( "Select on; the rectable should draw" );

    };

    $scope.toggleAnnotate   = function (){
        $scope.annotate     = !$scope.annotate;
    };

    $scope.drawRectangle    = function (){
        // Draw a circle
        /*$("canvas").drawArc({
            draggable: true,
            fillStyle: "green",
            x: 100, y: 100,
            radius: 50
        });*/
    }

    $scope.crop             = function (){
        console.log('Crop!');
    };


})


