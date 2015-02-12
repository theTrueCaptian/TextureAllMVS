/**
 * Created by Maeda on 2/9/2015.
 *
 * Controllers for index.html
 */

var app = angular.module('pdfApp', ['ngRoute', 'ngPDFViewer', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    /*$routeProvider.when('/', {
     controller: 'pdfController',
     templateURL:'pdfButton.html'
     });
     $routeProvider.when('/pdfopen', {
     controller:'pdfOpenController',
     templateURL:'app/partials/pdfContainer.html'
     }).otherwise({ redirectTo: '/'});*/
}]);
//load in data into the pdf lists
app.controller('pdfController', function($scope, $http){
    $scope.showPDF = false;

    /*$scope.pdf_list=[
        {'file':'maeda.pdf'},
        {'file':'adam.pdf'},
        {'file':'idris.pdf'},
        {'file':'aysha.pdf'},
        {'file':'sakinah.pdf'},
        {'file':'luqman.pdf'}
    ];*/
    $http.get('/index/filenames').success(function(filename) {
        $scope.pdf_list = filename
    })
    console.log('Show list of pdfs');

    $scope.loadpdf = function(filename){
        $scope.filename = filename;
        console.log('Requesting server for pdf conversion.')
        /*$http.get('pdf/'+filename).success(function(newfilenamepath){
            console.log(newfilenamepath);
        }).error(function(err){
            console.log(err);
        })*/
    }
    //Toggle the pdf
    $scope.toggleShow = function(){
        $scope.showPDF = !$scope.showPDF;
    }



});

//load in data into the pdf lists
//controls pdfContainer.html
app.controller('pdfOpenController', [ '$scope', 'PDFViewerService', function($scope, pdf) {
    //$scope.pdftext="lel esh meh resume";
    console.log('Open pdf');

    $scope.pdfURL = "/pdf/"+$scope.filename;//"test.pdf";

    $scope.instance = pdf.Instance("viewer");

    $scope.nextPage = function() {
        $scope.instance.nextPage();
    };

    $scope.prevPage = function() {
        $scope.instance.prevPage();
    };

    $scope.gotoPage = function(page) {
        $scope.instance.gotoPage(page);
    };

    $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.loadProgress = function(loaded, total, state) {
        console.log('loaded =', loaded, 'total =', total, 'state =', state);
    };
}]);

//load in data into the results table
app.controller('resultController', function($scope){
    $scope.result=[
        {'file':'maeda.pdf', 'school':'scsu'},
        {'file':'adam.pdf', 'school':'scsu'},
        {'file':'idris.pdf', 'school':'ccsu'},
        {'file':'aysha.pdf', 'school':'homeschool'},
        {'file':'sakinah.pdf', 'school':'west high'},
        {'file':'luqman.pdf', 'school':'uitm'}
    ];
});
