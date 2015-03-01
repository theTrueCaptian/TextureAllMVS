/**
 * Created by mh4047 on 2/28/15.
 * pdfOpenController controls individual pdf buttons and pdf canvas
 */


//Load in data into the pdf lists
//Controls pdfContainer.html
app.controller('pdfOpenController', [ '$scope', '$http', function($scope, $http) {


    console.log('Open pdf: '+ $scope.filename);

    $scope.this_filename = $scope.filename;

    //Url of the pdf
    $scope.pdfURL = "/pdf/"+$scope.this_filename;

    //Canvas stuff
    $scope.canvas_id = 'canvas'+$scope.$index;
    $('.scrollable').width($scope.canvas_width);
    console.log("Rendering: "+$scope.filename+" into "+$scope.canvas_id);


    $scope.showprogress = true;

    //When the request for display occurs, set up the canvas and drawing tools
    $scope.displaypdf = function(){

        var req = '/convertpdf/'+$scope.this_filename;
        console.log('Requesting server for pdf conversion:'+req);

        //Conversion of pdf to images
        //Once the confirmation of the images is received, load it into the canvas
        //and set up the canvas's drawing tools.
        $http.get(req).success(function(arrFiles){ //The return is an array of links to the images ['maeda.jpg'...]
            //Load all images first and then display them
            console.log(arrFiles);

            loadAllImages($scope.canvas_id, arrFiles.resultfilepath, function(arrLoadedFiles){
                //Initialize the Drawing tools
                initCanvas($scope.canvas_id);

            });

            $scope.showprogress = false;

        }).error(function(err){
            console.log("Error in conversion:");
            console.log(err);

            $('#'+$scope.canvas_id).drawText({
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

}]);

//CANVAS
function initCanvas(canvas_id){
    var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;
    var strokeStyle = "black", lineWidth = 14;

    //set the drawing functionalities
    var canvas = $('#'+canvas_id).get(0);
    var ctx = $('#'+canvas_id).get(0).getContext('2d');


    $('#'+canvas_id).mousemove(function(e){
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw(ctx, prevX, prevY, currX, currY, strokeStyle, lineWidth);
        }
    });

    $('#'+canvas_id).mousedown(function(e){
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = strokeStyle;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    });

    $('#'+canvas_id).mouseup(function(){
        flag = false;
    });

    $('#'+canvas_id).mouseout(function(){
        flag = false;
    });


}
function draw(ctx, prevX, prevY, currX, currY, strokeStyle, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
}