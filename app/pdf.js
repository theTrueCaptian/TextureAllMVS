/**
 * Created by mh4047 on 2/22/15.
 */

var path_to_pdf_dir = 'public/pdf/';
var path_to_pdf_img_dir = 'public/pdf/img/';
var img_ext = 'jpg';
var im = require('imagemagick');
var fs = require('fs');



//pdftohtml module used to convert pdf into html
//@filename is the pdf file to convert e.g. maeda.pdf
//@callback's parameters passed intp the callback function is the resulting path files of the images e.g. ['image1.jpg',...]
exports.pdf2html = function (filename, callback){
    /* preferred options for best quality see http://stackoverflow.com/questions/6605006/convert-pdf-to-image-with-high-resolution
     */
    im.convert(['-verbose',
                '-density',
                '150',
                '-trim',
                path_to_pdf_dir+filename,
                '-quality',
                '100',
                '-sharpen',
                '0x1.0',
                path_to_pdf_img_dir+filename+'.'+img_ext],
        function(err, stdout){
            if (err){
                console.log(err);
                callback(err);
            }else {
                console.log('stdout:', stdout);

                //Get all filenames from the pdf's image results:
                var allFiles = getAllFileNamesFromDir(path_to_pdf_img_dir);
                console.log(allFiles);

                //Filter out for the file names that have the same prefix names followed by a dash and number
                //and add them to pdfImgFiles[]
                var pdfImgFiles = [];
                allFiles.forEach(function(elem){
                    var regex = new RegExp("\\b("+filename+")\\b-\\d+\\."+img_ext);
                    console.log(regex)
                    console.log(elem)
                    console.log(regex.test(elem))
                    //Check for a match
                    if(regex.test(elem)){
                       pdfImgFiles.push(path_to_pdf_img_dir +elem);
                    }
                });

                callback(pdfImgFiles);
            }
        }
    );
}

//The conversion from pdf's image into meta-data
//@filename of the image to process into meta-data via image processing
exports.image2meta = function(filename){
    //Begin processing image

    //Identify areas of text and replace each letter with a black box.
    //Generally, bigger areas of text refer to a "Title" and lots of clumped up areas of text refer to a "title"
}

function getAllFileNamesFromDir(dir){

    var files = fs.readdirSync(dir);
    //console.log(files)
    return files;

}