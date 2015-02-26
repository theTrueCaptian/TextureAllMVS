/**
 * Created by Maeda on 2/9/2015.
 *
 * Controllers for index.html
 */

var app = angular.module('pdfApp', ['ngRoute',  'ui.bootstrap', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.edit']);

app.config(['$routeProvider', function ($routeProvider) {

}]);

//load in data into the pdf lists
app.controller('pdfController', function($scope, $http){
    $scope.pdf_list = [];
    $http.get('/index/filenames').success(function(filename) {  //List of strings
        //$scope.pdf_list = filename
        //pdf_list is a list of objects containng information on that filename
        filename.forEach(function(stringname){
            $scope.pdf_list.push({filename:stringname})
        })
    })
    console.log('Show list of pdfs');

    //This function sets the filename for the specific intance controller, pdfOpenController
    $scope.loadpdf = function(filename){
        $scope.filename = filename;
        //$scope.displaypdf(filename);

    }


});


//Load in data into the pdf lists
//Controls pdfContainer.html
app.controller('pdfOpenController', [ '$scope', '$http', function($scope, $http) {
    console.log('Open pdf: '+ $scope.filename);

    $scope.this_filename = $scope.filename;
    //pdf-viewer's id
    $scope.canvas_name = 'canvas'+$scope.$index;//'\\\''+$scope.$index+'\\\'';//"viewer"+$scope.$index;
    $scope.pdfURL = "/pdf/"+$scope.this_filename;

    //Canvas stuff
    console.log("Rendering: "+$scope.filename+" into "+$scope.canvas_name);
    //$('#'+$scope.canvas_name).width(document.getElementById("par").offsetWidth);


    $scope.showprogress = true;

    $scope.displaypdf = function(){

        var req = '/convertpdf/'+$scope.this_filename;
        console.log('Requesting server for pdf conversion:'+req);

        $http.get(req).success(function(arrFiles){ //The return is an array of links to the images ['maeda.jpg'...]
            //Load all images first and then display them
            console.log(arrFiles);

             loadAllImages($scope.canvas_name, arrFiles.resultfilepath, function(arrLoadedFiles){
                console.log(arrLoadedFiles);
                 //var context = $('#'+$scope.canvas_name).getContext("2d");
                /*var canvas = document.getElementById($scope.canvas_name);
                 var context = canvas.getContext("2d");
                 context.drawImage(arrLoadedFiles[0], 0, 0);
                //@currentHeight keeps track of the y coordinate of where the next picture should be displayed e.g. currheight = currheight + prev image height
                /*var currentHeight = 10;
                //For each filename in arrFiles[], display it to the canvas
                for(var i=0; i<arrLoadedFiles.length; i++){
                    var imgpath = arrLoadedFiles[i];
                    $('#'+$scope.canvas_name).drawImage({
                        source: imgpath,
                        x: 10, y: currentHeight
                    });
                    console.log(currentHeight);
                    //Set the y coordinate for the next image
                    currentHeight = currentHeight + getImgHeight(imgpath) +10;

                }*/
            });
            /*console.log(loadedImgArr);
            //@currentHeight keeps track of the y coordinate of where the next picture should be displayed e.g. currheight = currheight + prev image height
            var currentHeight = 10;
            //For each filename in arrFiles[], display it to the canvas
            for(var i=0; i<loadedImgArr.length; i++){
                var imgpath = loadedImgArr[i];
                $('#'+$scope.canvas_name).drawImage({
                    source: imgpath,
                    x: 10, y: currentHeight
                });
                console.log(currentHeight);
                //Set the y coordinate for the next image
                currentHeight = currentHeight + getImgHeight(imgpath) +10;

            }*/

            $scope.showprogress = false;

        }).error(function(err){
            console.log("Error in conversion:");
            console.log(err);

            $('#'+$scope.canvas_name).drawText({
                fillStyle: '#9cf',
                strokeStyle: '#25a',
                strokeWidth: 2,
                x: 5, y: 5,
                fontSize: 48,
                fontFamily: 'Verdana, sans-serif',
                text: 'Error rendering.' + err
            });

            $scope.showprogress = false;
        });
    }
    //Display the pdf
    $scope.displaypdf();


    /*$scope.loadProgress = function(loaded, total, state) {
        //console.log('loaded =', loaded, 'total =', total, 'state =', state);
        //Calculate percentage of loaded
        $scope.percentage = parseInt(loaded/total * 100);
        if($scope.percentage>=90){
            $scope.$apply(function(){
                $scope.showprogress = false;
            });
        }
    };
*/

}]);

function loadAllImages(canvas_name, arrImgSrc, callback){
    var loadedArr=[]; //Array of Image objects that are loaded
    for(var i=0; i<arrImgSrc.length; i++) {//arrImgSrc.forEach(function(src){
        var src = arrImgSrc[i];
        //loadAnImage(src).done(function(imgObj){
        //    loadedArr.push(imgObj);
        //});
        loadedArr.push(loadAnImage(canvas_name, src));
        //var page = new Image();
        //page.onload = //callback;
        //page.src = src;
    }//});
    //return loadedArr;
    $.when.apply(null, loadedArr).done(function() {
        // callback when everything was loaded
        callback(loadedArr);
    });
}

function loadAnImage(canvas_name, src){
    //Defer it
    var deferred = $.Deferred();
    var sprite = new Image();
    sprite.onload = function() {
        deferred.resolve();
        var canvas = document.getElementById(canvas_name);
        var context = canvas.getContext("2d");
        context.drawImage(sprite, 0, 0);
    };
    sprite.src = src;
    return deferred.promise();
}

//Util
function getImgHeight(imgSrc){
    var newImg = new Image();
    newImg.src = imgSrc;
    return newImg.height;
};

//Controls resultsContainer.html
//Load in data into the results table
app.controller('resultController', function($scope, $http){
    //This contains a list of unique keywords e.g. Name, Address, etc
    $scope.keyword_list = [{ field: 'name', enableCellEdit: true }, { field: 'gender', enableCellEdit: true  }];
    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: $scope.keyword_list,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.addData = function() {
        var n = $scope.gridOptions.data.length + 1;
        $scope.gridOptions.data.push({

        });
    };

    $scope.removeRow = function(index) {
        //if($scope.gridOpts.data.length > 0){
        $scope.gridOptions.data.splice(index,1);
        //}
    };

    //Adds a unique keyword, $scope.search_box, to the list of keywords
    $scope.submit_keyword = function(){
        if(isExists($scope.keyword_list, $scope.search_box)){   //Check for uniqueness of $scope.search_box within $scope.keyword_list
            $scope.keyword_list.push({field:$scope.search_box, enableSorting: false, enableCellEdit: true });
        }else{
            //Alert user of already existing keyword
            $scope.addAlert("Keyword "+$scope.search_box+" already exists!");
        }
        //Clear textbox
        $scope.search_box = "";

    };

    $scope.alerts = [ ];

    $scope.addAlert = function(msg) {
        $scope.alerts.push({ type: 'danger', msg: msg});
        var ind = $scope.alerts.length-1;
        setTimeout(function(){ $scope.closeAlert(ind); console.log("close alert at "+ind);  }, 5000);
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

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

app.controller('toolboxController', function($scope){
    //Indicates the mode in which the user is in.
    $scope.selectOn = false;
    $scope.annotate = false;

    $scope.setAllButtonsOff = function (){
        $scope.selectOn = false;
        $scope.annotate = false;
    };

    $scope.toggleSelectOn = function (){
        $scope.selectOn = !$scope.selectOn;
        $scope.drawRectangle();
        console.log("Select on; the rectable should draw")

    };

    $scope.toggleAnnotate = function (){
        $scope.annotate = !$scope.annotate;
    };

    $scope.drawRectangle = function (){
        // Draw a circle
        /*$("canvas").drawArc({
            draggable: true,
            fillStyle: "green",
            x: 100, y: 100,
            radius: 50
        });*/
    }

    $scope.crop = function (){
        console.log('Crop!');
    };


})


