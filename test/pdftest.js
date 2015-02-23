/**
 * Created by mh4047 on 2/22/15.
 */

//Testing the functions within Texture/app/pdfroutes.js

//A test on converting pdfs into images via http://codetheory.in/convert-split-pdf-files-into-images-with-imagemagick-and-ghostscript/
var im = require('imagemagick');
im.convert(['public/pdf/resume1.pdf', '-resize', '25x120', 'public/pdf/img/resume1.jpg'],
    function(err, stdout){
        if (err) throw err;
        console.log('stdout:', stdout);
    });


var pdfmodule = require('../app/pdf.js');

pdfmodule.image2meta('image');
