(function(module){
    module.exports.multerExtension = module.exports.multerExtension || {};
    module.exports.multerExtension.upload = (function upload(){
        // Use multer middleware to upload a photo to static/images
        var mime = require("mime");
        var crypto = require("crypto");
        var multer = require("multer");
        var storage = multer.diskStorage({
            destination: function (request, file, callBack) {
                console.log("destination");
                callBack(null, "./public/images");
            },
            filename: function (req, file, callBack) {
                crypto.pseudoRandomBytes(16, function (err, raw) {
                    console.log("crypto");
                    var newFileName = raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype);
                    console.log(newFileName);
                    callBack(null, newFileName);
                });
            }
        });

        return multer({ storage: storage });
    })();
})(module);
