var gm = require('graphicsmagick-stream')
var fs = require('fs')

var convert = gm({
    pool: 5,             // how many graphicsmagick processes to use
    format: 'png',       // format to convert to
    scale: {
        width: 200,        // scale input to this width
        height: 200,       // scale input this height
        type: 'contain'    // scale type (either contain/cover/fixed)
    },
    crop: {
        width: 200,        // crop input to this width
        height: 200,       // crop input this height
        x: 0,              // crop using this x offset
        y: 0               // crop using this y offset
    },
    page: [1,5],         // only render page 1 to 5 (for pdfs)
                         // set to a single number if you only want to render one page
                         // or omit if you want all pages
    rotate: 'auto',      // auto rotate image based on exif data
                         // or use rotate:degrees
    density: 300         // set the image density. useful when converting pdf to images
})


fs.createReadStream('public/pdf/kevin_resume.pdf')
    .pipe(convert({
        // override any of the above options here
    }))
    .pipe(fs.createWriteStream('output.jpg'))