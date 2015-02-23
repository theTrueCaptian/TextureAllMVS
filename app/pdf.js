/**
 * Created by mh4047 on 2/22/15.
 */

var path_to_pdf_dir = 'public/pdf/';
var path_to_pdf_img_dir = 'public/pdf/img/';

var im = require('imagemagick');



//pdftohtml module used to convert pdf into html
//@filename is the pdf file to convert e.g. maeda.pdf
//@callback's parameters passed intp the callback function is the resulting path files of the images e.g. ['image1.jpg',...]
exports.pdf2html = function (filename, callback){
    /* preferred options for best quality see http://stackoverflow.com/questions/6605006/convert-pdf-to-image-with-high-resolution
     convert
     -verbose
     -density
     -trim
     test.pdf
     -qualitiy 100
     -sharpen 0x1.0
     ajfds.jpg

     */
    im.convert(['-verbose',
                '-density',
                '-trim',
                path_to_pdf_dir+filename,
                '-qualitiy',
                '100',
                '-sharpen',
                '0x1.0',
                path_to_pdf_img_dir+filename+'.jpg'],
        function(err, stdout){
            if (err){
                console.log(err);
                callback(err);
            }else {
                console.log('stdout:', stdout);
                callback(path_to_pdf_img_dir + filename + '.jpg');
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
