/**
 * Created by Maeda on 2/9/2015.
 *
 * Provide routes to for the pdf documents.
 */

module.exports = function(app, database){
    //api for document uploads -----------------------------
    var pdfModel = require('./models/pdf')(database);

    //List all pdfs
    /*app.get('/pdf/', function(req,res){
        //pdfModel.getDocuments();

        //res.sendfile('./public/index.html');
    });*/

    //Get a specific PDF
    app.get('/convertpdf/:pdfFile', function(req, res){
        var filename = req.query.pdfFile;
        console.log("Request for "+filename);
        /*var callback = function (err, readResult) {
            console.log('err', err, 'pg readResult', readResult);
            fs.writeFile('/tmp/'+filename, readResult.rows[0].file);
            res.json(200, {success: true});
        }
        //Call the database to get the pdf
        pdfModel.getDocument()*/

        getDocument(filename, function (resultfilepath) {
            //After conversion send the newly converted filepath to the client
            //res.send({'resultfilepath':resultfilepath});
            //Send back an image
            console.log(resultfilepath)


        });

     });
}

//pdftohtml module used to convert pdf into html
function getDocument(filename, callback){
    /*var newfilepath = '../public/pdf/'+filename+'.html';
    var pdftohtml = require('pdftohtmljs'),
        converter = new pdftohtml('../public/pdf/'+filename, '../public/pdf/'+filename+'.html');

    converter.preset('default');

    converter.success(function() {
        console.log("convertion done");
        callback(newfilepath);

    });

    converter.error(function(error) {
        console.log("conversion error: " + error);
        callback(error);

    });

    converter.progress(function(ret) {
        console.log ((ret.current*100.0)/ret.total + " %");
    });

    converter.convert();*/
    //Or with this ghostscript
    var gs = require('gs');
    gs()
        .batch()
        .output()
        .input(input)
        .exec(function(err, data) {
            console.log(data.toString());
        });
}
