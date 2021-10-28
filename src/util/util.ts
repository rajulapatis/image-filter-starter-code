import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        
        //const buf = Buffer.from(inputURL, 'base64');

        const photo = await Jimp.read(inputURL)
        //.then(image => image.getBuffer(MIME_JPEG, (err, res) => console.log(res)));

        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg'
        console.log('The outpath is, ' +outpath);
        photo
            
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
        
            //.getBase64(Jimp.MIME_JPEG, function (err, src) {
            //    console.log("rb is \n")
            //    console.log(src);
            //  })
            .write(__dirname + outpath, (image) => {
                resolve(__dirname + outpath);
                  console.log('The Input URL is, ' +inputURL);
                       
            });
    });
}
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}