/**
 * Created by Maeda on 2/15/2015.
 */

//Return a boolean as to whether an @item exists in @array
function isExists(array, item){
    return _.indexOf(array, item) == -1;
}


//Used by pdf controllers
function loadAllImages(canvas_name, arrImgSrc, callback){
    var loadedArr=[]; //Array of promise objects
    var imgArr = [];    //Array of image objects that are loaded
    for(var i=0; i<arrImgSrc.length; i++) {
        var src = arrImgSrc[i];
        var sprite = new Image();

        imgArr.push(sprite);
        loadedArr.push(loadAnImage(canvas_name, sprite, src));
    }
    //When all the promises are met, draw the images onto canvas
    $.when.apply(null, loadedArr).done(function() {
        console.log("A resolve has been made!")
        var canvas = document.getElementById(canvas_name);
        var context = canvas.getContext("2d");

        var totHeight = 0;
        var maxWidth = 0;
        for(var i=0; i<imgArr.length; i++){
            totHeight = totHeight + imgArr[i].height;
            if(imgArr[i].width > maxWidth){
                maxWidth = imgArr[i].width;
            }
        }

        context.canvas.height = totHeight;
        context.canvas.width = maxWidth;

        //@currentHeight keeps track of the y coordinate of where the next picture should be displayed e.g. currheight = currheight + prev image height
        var currentHeight = 10;

        for(var i=0; i<imgArr.length; i++){
            context.drawImage(imgArr[i], 0, currentHeight);
            //Set the y coordinate for the next image
            currentHeight = currentHeight + imgArr[i].height +10;
        }

        // callback when everything was loaded
        callback(loadedArr);
    });
}



function loadAnImage(canvas_name, sprite, src){
    //Defer it
    var deferred = $.Deferred();

    sprite.onload = function() {
        deferred.resolve();

    };
    sprite.src = src;
    return deferred.promise();
}
/*
//Util
function getImgHeight(imgSrc){
    var newImg = new Image();
    newImg.src = imgSrc;
    return newImg.height;
};*/
