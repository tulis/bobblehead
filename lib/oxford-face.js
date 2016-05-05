(function(module){
    module.exports.oxford = module.exports.oxford || {};
    module.exports.oxford.Face = (function exportsOxfordFace(){
        return function Face(client){

            function detectFace(imageSource, options){
                return new Promise(function detectFacePromise(resolve, reject){
                    var fileSystem = require("fs");
                    var Request = require("request");
                    var Buffer = require("buffer").Buffer;
                    var apiKey = client.getApiKey();
                    var imageSourceLocation = null;

                    if(imageSource && imageSource.path && imageSource.path !== ""){
                        imageSourceLocation = imageSource.path;
                    }else if(imageSource && imageSource.url && imageSource.url !== ""){
                        imageSourceLocation = imageSource.url;
                    }else {
                        throw {
                            message: "imageSource cannot be undefined or null"
                        }
                    }

                    fileSystem.readFile(imageSourceLocation, function(exception, image){
                        if(exception){
                            console.error("read image exception happened: ", exception);
                            throw exception;
                        }

                        var contentLength = Buffer.byteLength(image);
                        var request = Request({
                                body: image
                                , headers: {
                                    "Content-Length": contentLength
                                    , "Content-Type": "application/octet-stream"
                                    , "Ocp-Apim-Subscription-Key": apiKey
                                }
                                , method: "POST"
                                , uri: "https://api.projectoxford.ai/face/v1.0/detect"
                            }, function onPostImageDone(exception, response, body){
                                if(exception){
                                    console.error("onPostImageException: " + exception);
                                    throw exception;
                                }
                                resolve(response);
                            });
                    });
                });

            }

            return {
                "detect": detectFace
            };
        };
    })();
})(module);
